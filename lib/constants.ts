export const APP_CONFIG = {
  name: 'EchoScribe',
  tagline: 'Never miss a meeting detail',
  version: '1.0.0',
  supportEmail: 'support@echoscribe.app',
} as const;

export const SUBSCRIPTION_TIERS = {
  free: {
    name: 'Free',
    monthlyMinutes: 30,
    storageLimit: 100, // MB
    features: ['Basic transcription', 'Action item detection'],
  },
  premium: {
    name: 'Premium',
    monthlyPrice: 500, // $5.00 in cents
    monthlyMinutes: -1, // unlimited
    storageLimit: 5000, // 5GB
    features: [
      'Unlimited transcription',
      'Advanced AI summaries',
      'Calendar integration',
      'Priority processing',
      'Export options',
    ],
  },
} as const;

export const RECORDING_LIMITS = {
  maxDuration: 7200, // 2 hours in seconds
  maxFileSize: 100 * 1024 * 1024, // 100MB
  supportedFormats: ['audio/wav', 'audio/mp3', 'audio/m4a', 'audio/webm'],
} as const;

export const API_ENDPOINTS = {
  transcription: '/api/transcribe',
  summarization: '/api/summarize',
  actionItems: '/api/extract-actions',
  recordings: '/api/recordings',
  payment: '/api/payment',
  calendar: '/api/calendar',
} as const;

export const STORAGE_KEYS = {
  user: 'echoscribe_user',
  recordings: 'echoscribe_recordings',
  settings: 'echoscribe_settings',
} as const;

export const ANIMATION_DURATIONS = {
  fast: 100,
  base: 200,
  slow: 400,
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;
