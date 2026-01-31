
export enum Language {
  ENGLISH = 'English',
  HINDI = 'Hindi',
  TAMIL = 'Tamil',
  TELUGU = 'Telugu',
  MALAYALAM = 'Malayalam',
  SPANISH = 'Spanish',
  FRENCH = 'French',
  GERMAN = 'German',
  CHINESE = 'Chinese',
  ARABIC = 'Arabic',
  RUSSIAN = 'Russian',
  JAPANESE = 'Japanese',
  PORTUGUESE = 'Portuguese',
  BENGALI = 'Bengali',
  KOREAN = 'Korean'
}

export enum DetectionResult {
  AI_GENERATED = 'AI_GENERATED',
  HUMAN = 'HUMAN'
}

export interface UserProfile {
  name: string;
  language: Language;
  isAuthenticated: boolean;
  tier: 'Standard' | 'Elite' | 'Gov-Grade';
}

export interface AdvancedSignals {
  pitchVariation: number;
  breathRandomness: number;
  spectralFlatness: number;
  neuralArtifacts: number;
}

export interface VoiceDetectionResponse {
  classification: DetectionResult;
  confidence: number;
  explanation: string;
  languageDetected: string;
  status: 'success' | 'error';
  signals?: AdvancedSignals;
  anomaliesTimeline?: { time: string, event: string }[];
}

export interface Message {
  id: string;
  sender: 'scammer' | 'honeypot';
  text: string;
  timestamp: string;
  metadata?: {
    intent: string;
    emotion: string;
  };
}

export interface ExtractedIntelligence {
  bankAccounts: string[];
  upiIds: string[];
  phishingLinks: string[];
  phoneNumbers: string[];
  suspiciousKeywords: string[];
}

export interface HoneypotRequest {
  sessionId: string;
  message: Message;
  conversationHistory: Message[];
  metadata: {
    channel: 'SMS' | 'WhatsApp' | 'Email' | 'Chat';
    language: string;
    locale: string;
  };
}

export interface HoneypotResponse {
  status: 'success';
  reply: string;
  detectedIntelligence: ExtractedIntelligence;
  strategyUsed: string;
}

export interface DiagnosticTest {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'passed' | 'failed';
  message: string;
}
