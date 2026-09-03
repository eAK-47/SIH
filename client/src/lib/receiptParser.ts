export interface ScannedLineItem {
  name: string;
  price?: number;
}

export interface ParsedReceipt {
  grandTotal?: number;
  subTotal?: number;
  taxAmount?: number;
  detectedItems: ScannedLineItem[];
  primaryItem?: string;
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
 * Normalizes noisy OCR line text by removing trailing dots, slashes, and artifacts.
 */
function cleanLineText(line: string): string {
  return line.replace(/[^\w\s₹.,/-]/g, '').trim();
}

export function parseReceiptText(text: string, knownItems: string[] = []): ParsedReceipt {
  const lines = text
    .split('\n')
    .map(cleanLineText)
    .filter((l) => l.length > 2);

  let grandTotal: number | undefined;
  let subTotal: number | undefined;
  let cgst: number | undefined;
  let sgst: number | undefined;
  const detectedItems: ScannedLineItem[] = [];

  // 1. Regex Matchers
  // Priority 1: True post-tax bottom-line terms
  const finalPayableRegex = /(?:grand\s*total|net\s*payable|total\s*payable|net\s*amount|bill\s*amount|round\s*off\s*total|amount\s*payable)[\s:=]*[₹rs.]*[\s]*([0-9]+(?:\.[0-9]{1,2})?)/i;

  // Priority 2: Pre-tax subtotal
  const subTotalRegex = /(?:sub\s*total|subtotal|food\s*total)[\s:=]*[₹rs.]*[\s]*([0-9]+(?:\.[0-9]{1,2})?)/i;

  // Taxes: CGST / SGST / GST
  // Hardening: lazy prefix ensures the capture grabs the LAST number on the line
  // (the actual tax amount, not the percentage value like "2.5%").
  const cgstRegex = /(?:cgst|central\s*gst).*?([0-9]+(?:\.[0-9]{1,2})?)\s*$/i;
  const sgstRegex = /(?:sgst|state\s*gst).*?([0-9]+(?:\.[0-9]{1,2})?)\s*$/i;
  const genericTotalRegex = /(?:^|\s)(?:total|amt|balance)[\s:=]*[₹rs.]*[\s]*([0-9]+(?:\.[0-9]{1,2})?)/i;

  // Scan lines from bottom to top for settlement figures
  for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i];

    if (grandTotal === undefined) {
      const finalMatch = line.match(finalPayableRegex);
      if (finalMatch && finalMatch[1]) {
        grandTotal = Math.round(parseFloat(finalMatch[1]));
      }
    }

    if (subTotal === undefined) {
      const subMatch = line.match(subTotalRegex);
      if (subMatch && subMatch[1]) {
        subTotal = Math.round(parseFloat(subMatch[1]));
      }
    }

    if (cgst === undefined) {
      const cMatch = line.match(cgstRegex);
      if (cMatch && cMatch[1]) cgst = parseFloat(cMatch[1]);
    }
    if (sgst === undefined) {
      const sMatch = line.match(sgstRegex);
      if (sMatch && sMatch[1]) sgst = parseFloat(sMatch[1]);
    }
  }

  // Fallback 1: If no explicit 'Grand Total' found, check generic 'Total'
  if (grandTotal === undefined) {
    for (let i = lines.length - 1; i >= 0; i--) {
      const line = lines[i];
      // Avoid matching 'sub total' as generic total
      if (!subTotalRegex.test(line)) {
        const m = line.match(genericTotalRegex);
        if (m && m[1]) {
          const val = Math.round(parseFloat(m[1]));
          if (val > (subTotal || 0)) {
            grandTotal = val;
            break;
          }
        }
      }
    }
  }

  // Fallback 2: Calculate SubTotal + Taxes if Grand Total line was torn/faded
  if (grandTotal === undefined && subTotal !== undefined) {
    const taxes = (cgst || 0) + (sgst || 0);
    grandTotal = Math.round(subTotal + taxes);
  }

  // Fallback 3: Pick the maximum plausible number from the bill
  if (grandTotal === undefined) {
    const numbers: number[] = [];
    const numRegex = /\b([0-9]{2,5}(?:\.[0-9]{2})?)\b/g;
    for (const l of lines) {
      let m;
      while ((m = numRegex.exec(l)) !== null) {
        const v = parseFloat(m[1]);
        if (v > 20 && v < 25000 && v !== 2024 && v !== 2025 && v !== 2026) {
          numbers.push(Math.round(v));
        }
      }
    }
    if (numbers.length > 0) {
      grandTotal = Math.max(...numbers);
    }
  }

  // 2. Extract Individual Line Items (e.g. "1 CHICKEN BIRYANI 160.00" or "POROTTA 45")
  const lineItemRegex = /^(?:[0-9]{1,2}[\s*xX.-]+)?([a-zA-Z\s/&'-]{3,30}?)\s+([0-9]{2,4}(?:\.[0-9]{2})?)$/;
  const ignoreKeywords = /(subtotal|total|cgst|sgst|gst|tax|cash|upi|change|balance|round|table|bill|token|date|time|welcome|fssai|phone)/i;

  for (const line of lines) {
    if (ignoreKeywords.test(line)) continue;

    const match = line.match(lineItemRegex);
    if (match) {
      const itemName = match[1].trim();
      const itemPrice = Math.round(parseFloat(match[2]));
      if (itemName.length >= 3 && itemPrice > 10 && itemPrice < 5000) {
        detectedItems.push({ name: itemName, price: itemPrice });
      }
    } else {
      // Check if line matches known places' menu items
      for (const known of knownItems) {
        if (line.toLowerCase().includes(known.toLowerCase())) {
          detectedItems.push({ name: known });
          break;
        }
      }
    }
  }

  // Deduplicate detected items
  const uniqueItems = detectedItems.filter(
    (item, index, self) => index === self.findIndex((t) => t.name.toLowerCase() === item.name.toLowerCase())
  );

  return {
    grandTotal,
    subTotal,
    taxAmount: (cgst || 0) + (sgst || 0),
    detectedItems: uniqueItems,
    primaryItem: uniqueItems[0]?.name,
    rawText: text,
  };
}