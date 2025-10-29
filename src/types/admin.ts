// Shared types for admin components

export interface Booking {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  preferred_date?: string;
  preferred_time?: string;
  document_type?: string;
  number_of_signers: number;
  location_address?: string;
  urgency: string;
  message?: string;
  status: string;
  sms_opt_in?: boolean;
  whatsapp_opt_in?: boolean;
  ai_booked?: boolean;
  ai_confidence?: number;
  agent_provider?: string;
  call_duration?: number;
  call_recording_url?: string;
}

export interface CallEvent {
  id: string;
  event_type: string;
  tool: string;
  caller_number?: string;
  tracking_number?: string;
  transcript?: string;
  recording_url?: string;
  duration?: number;
  metadata?: Record<string, any>;
  created_at: string;
  booking_id?: string;
  bookings?: {
    id: string;
    name: string;
    phone: string;
    service: string;
  };
}

export interface AgentConfig {
  id: string;
  provider: 'insighto' | 'thoughtly';
  config: {
    voice?: string;
    language?: string;
    transferNumber?: string;
    confidenceThreshold?: number;
  };
  intents: Array<{
    name: string;
    description: string;
    fields: string[];
  }>;
  is_active: boolean;
}

export interface LeadScoreData {
  score: number;
  priority: 'critical' | 'high' | 'medium' | 'low';
  churnRisk: number;
}

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';
export type EventType = 'call_started' | 'call_answered' | 'call_missed' | 'ai_booked' | 'message_in' | 'message_out';
