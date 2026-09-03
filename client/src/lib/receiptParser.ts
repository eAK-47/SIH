export interface ParsedReceipt {
  price?: number;
  detectedItem?: string;
  rawText: string;
}

/**
 * Preprocess raw image data URL via an offscreen HTML5 canvas:
 * Downscales overly large captures to 1600px max dimension, applies luminance-based
 * grayscale conversion, and applies a contrast factor of 1.25 to make faint/thermal receipt ink legible.
 */
export async function preprocessReceiptImage(dataUrl: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.decoding = 'async';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(dataUrl);
        return;
      }

      const maxDim = 1600;
      let width = img.width;
      let height = img.height;
      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;

      // Grayscale luminance + contrast enhancement algorithm
      const contrast = 1.25;
      const factor = (259 * (contrast * 255 + 255)) / (255 * (259 - contrast * 255));

      for (let i = 0; i < data.length; i += 4) {
        const luminance = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
        const enhanced = factor * (luminance - 128) + 128;
        const clamped = Math.max(0, Math.min(255, enhanced));

        data[i] = clamped;
        data[i + 1] = clamped;
        data[i + 2] = clamped;
      }

      ctx.putImageData(imageData, 0, 0);
      const out = canvas.toDataURL('image/jpeg', 0.9);

      // Offscreen canvas lifecycle cleanup — release the bitmap buffer immediately
      canvas.width = 0;
      canvas.height = 0;
      img.onload = null;
      img.onerror = null;
      img.src = '';

      resolve(out);
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}

/**
 * Parses raw OCR text using reverse-scanning heuristics to extract the bill total
 * and match known menu items or services for the active place.
 */
export function parseReceiptText(text: string, knownItems: string[] = []): ParsedReceipt {
  const lines = text
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

  let detectedPrice: number | undefined;
  let detectedItem: string | undefined;

  // 1. Match explicit Total / Net / Bill summary keywords
  const totalKeywordsRegex = /(?:total|grand\s*total|net\s*amt|amount|net|subtotal|balance|payable|inr|rs\.?|₹)[\s:]*([0-9]+(?:\.[0-9]{1,2})?)/i;
  const currencySymbolRegex = /(?:rs\.?|₹)\s*([0-9]+(?:\.[0-9]{1,2})?)/i;

  // Reverse scan from the bottom line where receipt totals are traditionally printed
  for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i];
    const match = line.match(totalKeywordsRegex) || line.match(currencySymbolRegex);
    if (match && match[1]) {
      const val = parseFloat(match[1]);
      if (val > 10 && val < 50000) {
        detectedPrice = Math.round(val);
        break;
      }
    }
  }

  // 2. Fallback heuristic: Extract standalone numbers if explicit labels were missed
  if (!detectedPrice) {
    const candidateNumbers: number[] = [];
    const numRegex = /\b([0-9]{2,5}(?:\.[0-9]{2})?)\b/g;

    for (const line of lines) {
      let match;
      while ((match = numRegex.exec(line)) !== null) {
        const val = parseFloat(match[1]);
        // Discard year fragments (2024-2026) and minute/hour patterns
        if (val > 20 && val < 25000 && val !== 2024 && val !== 2025 && val !== 2026) {
          candidateNumbers.push(Math.round(val));
        }
      }
    }
    if (candidateNumbers.length > 0) {
      detectedPrice = Math.max(...candidateNumbers);
    }
  }

  // 3. Match against known place menu items or services
  const normalizedText = text.toLowerCase();
  for (const item of knownItems) {
    if (normalizedText.includes(item.toLowerCase())) {
      detectedItem = item;
      break;
    }
  }

  return {
    price: detectedPrice,
    detectedItem,
    rawText: text,
  };
}