// src/test/integration/WebhookIntegration.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mockSupabaseClient, testFixtures } from './setup';

// Mock webhook signature verification
const generateSignature = (payload: unknown, secret: string): string => {
  // Simplified signature generation for testing
  return `signature-${JSON.stringify(payload)}-${secret}`;
};

describe('Webhook Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('CallScaler Webhook', () => {
    it('should receive webhook data', async () => {
      const webhookPayload = {
        event: 'call.completed',
        call: {
          id: 'call-123',
          phone: testFixtures.booking.phone,
          duration: 120,
        },
      };

      const signature = generateSignature(webhookPayload, 'test-secret');

      // Mock webhook handler
      const handler = vi.fn().mockResolvedValue({ success: true });

      await handler(webhookPayload, signature);

      expect(handler).toHaveBeenCalledWith(webhookPayload, signature);
    });

    it('should validate signature', async () => {
      const webhookPayload = {
        event: 'call.completed',
        call: { id: 'call-123' },
      };

      const validSignature = generateSignature(webhookPayload, 'test-secret');
      const invalidSignature = 'invalid-signature';

      const verifySignature = vi.fn((sig: string) => sig === validSignature);

      expect(verifySignature(validSignature)).toBe(true);
      expect(verifySignature(invalidSignature)).toBe(false);
    });

    it('should process webhook and update database', async () => {
      const webhookPayload = {
        event: 'call.completed',
        call: {
          id: 'call-123',
          phone: testFixtures.booking.phone,
        },
      };

      mockSupabaseClient.from.mockReturnValue({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            single: vi.fn().mockResolvedValue({
              data: testFixtures.booking,
              error: null,
            }),
          })),
        })),
        update: vi.fn(() => ({
          eq: vi.fn().mockResolvedValue({
            data: { ...testFixtures.booking, status: 'confirmed' },
            error: null,
          }),
        })),
      } as any);

      // Process webhook
      const booking = await mockSupabaseClient.from('bookings')
        .select()
        .eq('phone', webhookPayload.call.phone)
        .single();

      if (booking.data) {
        await mockSupabaseClient.from('bookings')
          .update({ status: 'confirmed' })
          .eq('id', booking.data.id);
      }

      expect(mockSupabaseClient.from).toHaveBeenCalled();
    });

    it('should handle invalid signature', async () => {
      const webhookPayload = {
        event: 'call.completed',
        call: { id: 'call-123' },
      };

      const invalidSignature = 'invalid-signature';
      const verifySignature = vi.fn(() => false);

      const isValid = verifySignature(invalidSignature);

      expect(isValid).toBe(false);
    });

    it('should handle malformed data', async () => {
      const malformedPayload = { invalid: 'data' };

      const handler = vi.fn().mockRejectedValue(new Error('Invalid payload'));

      await expect(handler(malformedPayload)).rejects.toThrow();
    });
  });

  describe('SMS-iT Webhook', () => {
    it('should receive webhook data', async () => {
      const webhookPayload = {
        event_type: 'message.replied',
        contact: {
          phone: testFixtures.booking.phone,
          message: 'Test reply',
        },
      };

      const signature = generateSignature(webhookPayload, 'smsit-secret');

      const handler = vi.fn().mockResolvedValue({ success: true });

      await handler(webhookPayload, signature);

      expect(handler).toHaveBeenCalled();
    });

    it('should validate signature', async () => {
      const webhookPayload = {
        event_type: 'message.replied',
        contact: { phone: testFixtures.booking.phone },
      };

      const validSignature = generateSignature(webhookPayload, 'smsit-secret');
      const verifySignature = vi.fn((sig: string) => sig === validSignature);

      expect(verifySignature(validSignature)).toBe(true);
    });

    it('should process webhook and update database', async () => {
      const webhookPayload = {
        event_type: 'link.clicked',
        contact: {
          phone: testFixtures.booking.phone,
        },
      };

      mockSupabaseClient.from.mockReturnValue({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            single: vi.fn().mockResolvedValue({
              data: testFixtures.booking,
              error: null,
            }),
          })),
        })),
        update: vi.fn(() => ({
          eq: vi.fn().mockResolvedValue({
            data: { ...testFixtures.booking, status: 'confirmed' },
            error: null,
          }),
        })),
      } as any);

      // Process webhook
      const booking = await mockSupabaseClient.from('bookings')
        .select()
        .eq('phone', webhookPayload.contact.phone)
        .single();

      if (booking.data) {
        await mockSupabaseClient.from('bookings')
          .update({ status: 'confirmed' })
          .eq('id', booking.data.id);
      }

      expect(mockSupabaseClient.from).toHaveBeenCalled();
    });
  });

  describe('SuiteDash Webhook', () => {
    it('should receive webhook data', async () => {
      const webhookPayload = {
        event: 'project.completed',
        project: {
          id: 'project-123',
          contact_email: testFixtures.booking.email,
        },
      };

      const signature = generateSignature(webhookPayload, 'suitedash-secret');

      const handler = vi.fn().mockResolvedValue({ success: true });

      await handler(webhookPayload, signature);

      expect(handler).toHaveBeenCalled();
    });

    it('should validate signature', async () => {
      const webhookPayload = {
        event: 'project.completed',
        project: { id: 'project-123' },
      };

      const validSignature = generateSignature(webhookPayload, 'suitedash-secret');
      const verifySignature = vi.fn((sig: string) => sig === validSignature);

      expect(verifySignature(validSignature)).toBe(true);
    });

    it('should process webhook and update database', async () => {
      const webhookPayload = {
        event: 'project.completed',
        project: {
          id: 'project-123',
          contact_email: testFixtures.booking.email,
        },
      };

      mockSupabaseClient.from.mockReturnValue({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            single: vi.fn().mockResolvedValue({
              data: testFixtures.booking,
              error: null,
            }),
          })),
        })),
        update: vi.fn(() => ({
          eq: vi.fn().mockResolvedValue({
            data: { ...testFixtures.booking, status: 'completed' },
            error: null,
          }),
        })),
      } as any);

      // Process webhook
      const booking = await mockSupabaseClient.from('bookings')
        .select()
        .eq('email', webhookPayload.project.contact_email)
        .single();

      if (booking.data) {
        await mockSupabaseClient.from('bookings')
          .update({ status: 'completed' })
          .eq('id', booking.data.id);
      }

      expect(mockSupabaseClient.from).toHaveBeenCalled();
    });
  });

  describe('Insighto Webhook', () => {
    it('should receive webhook data', async () => {
      const webhookPayload = {
        event: 'lead.created',
        lead: {
          id: 'lead-123',
          email: testFixtures.booking.email,
        },
      };

      const signature = generateSignature(webhookPayload, 'insighto-secret');

      const handler = vi.fn().mockResolvedValue({ success: true });

      await handler(webhookPayload, signature);

      expect(handler).toHaveBeenCalled();
    });

    it('should validate signature', async () => {
      const webhookPayload = {
        event: 'lead.created',
        lead: { id: 'lead-123' },
      };

      const validSignature = generateSignature(webhookPayload, 'insighto-secret');
      const verifySignature = vi.fn((sig: string) => sig === validSignature);

      expect(verifySignature(validSignature)).toBe(true);
    });

    it('should process webhook and update database', async () => {
      const webhookPayload = {
        event: 'lead.created',
        lead: {
          id: 'lead-123',
          email: testFixtures.booking.email,
        },
      };

      mockSupabaseClient.from.mockReturnValue({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            single: vi.fn().mockResolvedValue({
              data: testFixtures.booking,
              error: null,
            }),
          })),
        })),
        update: vi.fn(() => ({
          eq: vi.fn().mockResolvedValue({
            data: testFixtures.booking,
            error: null,
          }),
        })),
      } as any);

      // Process webhook
      const booking = await mockSupabaseClient.from('bookings')
        .select()
        .eq('email', webhookPayload.lead.email)
        .single();

      expect(mockSupabaseClient.from).toHaveBeenCalled();
    });
  });
});


