export interface User {
  userId: string; // Base wallet address
  displayName?: string;
  email?: string;
  calendarIntegration?: boolean;
  storageLimit: number; // in MB
  subscriptionTier: 'free' | 'premium';
}

export interface Recording {
  recordingId: string;
  userId: string;
  meetingTitle: string;
  startTime: Date;
  endTime?: Date;
  duration?: number; // in seconds
  audioFileUrl?: string;
  transcriptionText?: string;
  summary?: string;
  actionItems: ActionItem[];
  decisions: Decision[];
  status: 'recording' | 'processing' | 'completed' | 'failed';
  cost?: number; // in USD cents
}

export interface ActionItem {
  id: string;
  text: string;
  assignee?: string;
  dueDate?: Date;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

export interface Decision {
  id: string;
  text: string;
  timestamp: Date;
  participants: string[];
}

export interface TranscriptionSegment {
  id: string;
  speaker?: string;
  text: string;
  startTime: number;
  endTime: number;
  confidence: number;
}

export interface PaymentTransaction {
  id: string;
  userId: string;
  recordingId: string;
  amount: number; // in USD cents
  status: 'pending' | 'completed' | 'failed';
  timestamp: Date;
  txHash?: string; // Base chain transaction hash
}
