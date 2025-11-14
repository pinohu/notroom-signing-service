import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useAdminAuth } from './useAdminAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

// Mock dependencies
vi.mock('@/integrations/supabase/client');
vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
  },
}));
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));
vi.mock('@/utils/logger', () => ({
  logger: {
    error: vi.fn(),
  },
}));

describe('useAdminAuth', () => {
  const mockNavigate = vi.fn();
  const mockSupabase = vi.mocked(supabase);

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });

  it('should redirect to login when user is not authenticated', async () => {
    mockSupabase.auth.getUser.mockResolvedValue({
      data: { user: null },
      error: null,
    });

    renderHook(() => useAdminAuth());

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/admin/login');
    });
  });

  it('should redirect to login when getUser returns an error', async () => {
    mockSupabase.auth.getUser.mockResolvedValue({
      data: { user: null },
      error: { message: 'Auth error' },
    });

    renderHook(() => useAdminAuth());

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/admin/login');
    });
  });

  it('should allow access when user is authenticated and is admin', async () => {
    const mockUser = { id: 'user-123', email: 'admin@example.com' };
    
    mockSupabase.auth.getUser.mockResolvedValue({
      data: { user: mockUser },
      error: null,
    });

    mockSupabase.from.mockReturnValue({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      maybeSingle: vi.fn().mockResolvedValue({
        data: { role: 'admin' },
        error: null,
      }),
    } as any);

    renderHook(() => useAdminAuth());

    await waitFor(() => {
      expect(mockSupabase.from).toHaveBeenCalledWith('user_roles');
    });

    // Should not navigate away
    expect(mockNavigate).not.toHaveBeenCalledWith('/admin/login');
  });

  it('should redirect when user is authenticated but not admin', async () => {
    const mockUser = { id: 'user-123', email: 'user@example.com' };
    
    mockSupabase.auth.getUser.mockResolvedValue({
      data: { user: mockUser },
      error: null,
    });

    mockSupabase.from.mockReturnValue({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      maybeSingle: vi.fn().mockResolvedValue({
        data: null,
        error: null,
      }),
    } as any);

    renderHook(() => useAdminAuth());

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Unauthorized access');
      expect(mockNavigate).toHaveBeenCalledWith('/admin/login');
    });
  });

  it('should redirect when role check returns an error', async () => {
    const mockUser = { id: 'user-123', email: 'user@example.com' };
    
    mockSupabase.auth.getUser.mockResolvedValue({
      data: { user: mockUser },
      error: null,
    });

    mockSupabase.from.mockReturnValue({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      maybeSingle: vi.fn().mockResolvedValue({
        data: null,
        error: { message: 'Database error' },
      }),
    } as any);

    renderHook(() => useAdminAuth());

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/admin/login');
    });
  });

  it('should handle exceptions and redirect to login', async () => {
    mockSupabase.auth.getUser.mockRejectedValue(new Error('Unexpected error'));

    renderHook(() => useAdminAuth());

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/admin/login');
    });
  });
});

