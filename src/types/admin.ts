/**
 * Type definitions for admin components
 */

export interface StatusUpdate {
  status: string;
  updated_at: string;
  started_at?: string;
  completed_at?: string;
  cancelled_at?: string;
  approved_at?: string;
  activated_at?: string;
}

export interface TcClientStatusUpdate extends StatusUpdate {
  status: 'pending' | 'active' | 'completed' | 'cancelled' | 'on_hold';
}

export interface CropApplicationStatusUpdate extends StatusUpdate {
  status: 'pending' | 'approved' | 'active' | 'rejected';
}
