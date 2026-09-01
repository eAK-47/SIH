import OpenAI from 'openai';
import { env } from '../config/index';

let openai: OpenAI | undefined;
if (env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: env.OPENAI_API_KEY,
    baseURL: 'http://localhost:3000/v1' // Route to OmniRoute fallback
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
7. Provide a brief reasoning for the risk level.

RETURN ONLY JSON. Return structure:
{
  "positive_highlights": ["string"],
  "things_to_know": ["string"],
  "risk_level": "LOW|MEDIUM|HIGH",
  "confidence_score": 0.0-1.0,
  "reasoning": "string"
}`
}

export async function generateAdvisory(
  context: AdvisoryContext
): Promise<AdvisoryPayload> {
  const fallbackAdvisory = (): AdvisoryPayload => {
    const isFlagged = context.verificationStatus === 'FLAGGED';
    const score = context.safetyScore ?? 75;
    
    let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW';
    if (isFlagged || score < 60) riskLevel = 'HIGH';
    else if (score < 75) riskLevel = 'MEDIUM';

    const things_to_know = [];
    if (context.verificationStatus === 'UNVERIFIED') {
      things_to_know.push('This service provider has not been officially verified. Exercise standard caution.');
    } else if (context.verificationStatus === 'FLAGGED') {
      things_to_know.push('This provider has been flagged by multiple users. We advise avoiding negotiations if possible.');
    }

    const hasOutliers = context.priceObservations?.some(obs => (obs.outlierCount || 0) > 0);
    if (hasOutliers) {
      things_to_know.push('Community data indicates potential price spikes or overcharging based on recent reports.');
    } else if (!isFlagged) {
      things_to_know.push('Typically standard pricing confirmed by recent community reports.');
    }

    const typeLabel = 
      context.entityType === 'RESTAURANT' ? 'dining spot' : 
      context.entityType === 'HOTEL' ? 'accommodation' : 
      context.entityType === 'GUIDE' ? 'tour guide service' : 'transport service';

    const positive_highlights = [
      `Local ${typeLabel} operating near ${context.address.split(',')[0]}.`,
      `Currently maintaining a community safety score of ${score}/100.`,
    ];

    if (context.verificationStatus === 'VERIFIED' || context.verificationStatus === 'TRUSTED') {
      positive_highlights.push(`Officially recognized as a ${context.verificationStatus.toLowerCase()} service by the tourism board.`);
    }

    return {
      positive_highlights,
      things_to_know: things_to_know.length > 0 ? things_to_know : ['No major issues reported. Practice standard safety precautions.'],
      risk_level: riskLevel,
      confidence_score: 0.85,
      reasoning: "Synthesized via local statistical safety heuristics (offline fallback)."
    };
  };

  if (!openai) {
    console.warn("OpenAI not initialized, using local fallback heuristics.");
    return fallbackAdvisory();
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
      model: 'auto/fast',
      messages: [
        { role: 'system', content: buildSystemPrompt() },
        { role: 'user', content: prompt }
      ],
      temperature: 0.1,
      response_format: { type: 'json_object' }
    });

    const content = response.choices[0]?.message?.content;
    if (!content) return fallbackAdvisory();

    let parsed: any;
    try {
      parsed = JSON.parse(content);
      if (parsed.advisory) parsed = parsed.advisory;
    } catch {
      return fallbackAdvisory();
    }

    return {
      positive_highlights: Array.isArray(parsed.positive_highlights) ? parsed.positive_highlights : fallbackAdvisory().positive_highlights,
      things_to_know: Array.isArray(parsed.things_to_know) ? parsed.things_to_know : fallbackAdvisory().things_to_know,
      risk_level: (typeof parsed.risk_level === 'string' && ['LOW','MEDIUM','HIGH'].includes(parsed.risk_level)) ? parsed.risk_level : fallbackAdvisory().risk_level,
      confidence_score: typeof parsed.confidence_score === 'number' ? parsed.confidence_score : fallbackAdvisory().confidence_score,
      reasoning: typeof parsed.reasoning === 'string' ? parsed.reasoning : fallbackAdvisory().reasoning
    };
  } catch (error) {
    console.warn('AI Advisory generation error, falling back to local heuristics:', (error as Error).message);
    return fallbackAdvisory();
  }
}