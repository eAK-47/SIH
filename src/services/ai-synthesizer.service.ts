import OpenAI from 'openai';
import { env } from '../config/index';

let openai: OpenAI | undefined;
if (env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: env.OPENAI_API_KEY,
  });
}

export interface AdvisoryPayload {
  positive_highlights: string[];
  things_to_know: string[];
  risk_level: 'LOW' | 'MEDIUM' | 'HIGH';
  confidence_score: number; // 0-1
  reasoning: string;
}

export interface AdvisoryContext {
  placeName: string;
  entityType: 'RESTAURANT' | 'HOTEL' | 'GUIDE' | 'TRANSPORT';
  address: string;
  verificationStatus: 'VERIFIED' | 'TRUSTED' | 'UNVERIFIED' | 'FLAGGED';
  safetyScore?: number;
  priceObservations?: {
    itemName: string;
    category: string;
    prices: number[];
    outlierCount?: number;
  }[];
  positiveReviews?: string[];
  negativeReviews?: string[];
  recentTouristComments?: string[];
}

function buildSystemPrompt(): string {
  return `You are a tourism advisor synthesizing factual, evidence-based travel recommendations for tourists in India. 

STRICT CONSTRAINTS:
1. Only reference provided data - do NOT fabricate information
2. Be specific: cite observation counts, price ranges, verification status
3. Risk assessment must correlate with objective metrics:
   - LOW: High safety score (75+), verified status, consistent pricing
   - MEDIUM: Moderate safety score (50-74), mixed verification, some pricing variance
   - HIGH: Low safety score (<50), unverified, significant outliers, recent complaints
4. Positive highlights (2-3): Recent positive feedback, known strengths, verification status
5. Things to know (2-3): Actionable warnings, payment methods, busy times, common issues
6. Confidence score (0-1): Based on data recency and volume
7. Provide a brief reasoning for the risk level.`
}

export async function generateAdvisory(
  context: AdvisoryContext
): Promise<AdvisoryPayload | null> {
  if (!openai) {
    return null;
  }

  try {
    const prompt = `Place: ${context.placeName} (${context.entityType})
Location: ${context.address}
Status: ${context.verificationStatus}
Safety Score: ${context.safetyScore || 'N/A'}/100

Pricing Data:
${JSON.stringify(context.priceObservations || [], null, 2)}

Reviews & Comments:
Positive: ${JSON.stringify(context.positiveReviews || [])}
Negative: ${JSON.stringify(context.negativeReviews || [])}
Recent: ${JSON.stringify(context.recentTouristComments || [])}`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: buildSystemPrompt() },
        { role: 'user', content: prompt }
      ],
      temperature: 0.1,
      response_format: { type: 'json_object' }
    });

    const content = response.choices[0]?.message?.content;
    if (!content) return null;

    let parsed: any;
    try {
      parsed = JSON.parse(content);
      // Try to extract if format wrapped in object
      if (parsed.advisory) parsed = parsed.advisory;
    } catch (e) {
      return null;
    }
    
    // Provide defaults if the AI missed something
    return {
      positive_highlights: Array.isArray(parsed.positive_highlights) ? parsed.positive_highlights : [],
      things_to_know: Array.isArray(parsed.things_to_know) ? parsed.things_to_know : [],
      risk_level: typeof parsed.risk_level === 'string' && ['LOW','MEDIUM','HIGH'].includes(parsed.risk_level) ? parsed.risk_level : 'MEDIUM',
      confidence_score: typeof parsed.confidence_score === 'number' ? parsed.confidence_score : 0.5,
      reasoning: typeof parsed.reasoning === 'string' ? parsed.reasoning : ''
    };
  } catch (error) {
    console.error('AI Advisory generation error:', error);
    return null;
  }
}
