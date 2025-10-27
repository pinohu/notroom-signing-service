import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Phone, Bot, Activity, Settings, CheckCircle, AlertCircle } from 'lucide-react';

interface AgentConfig {
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

interface AgentBooking {
  id: string;
  name: string;
  phone: string;
  service: string;
  ai_confidence: number;
  agent_provider: string;
  created_at: string;
  status: string;
}

export default function VoiceAgent() {
  const [config, setConfig] = useState<AgentConfig | null>(null);
  const [bookings, setBookings] = useState<AgentBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadConfig();
    loadBookings();
  }, []);

  const loadConfig = async () => {
    try {
      const { data, error } = await supabase
        .from('agent_configs')
        .select('*')
        .eq('is_active', true)
        .single();

      if (error) throw error;
      setConfig(data as any);
    } catch (error) {
      console.error('Error loading config:', error);
      toast({
        title: 'Error',
        description: 'Failed to load agent configuration',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const loadBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('id, name, phone, service, ai_confidence, agent_provider, created_at, status')
        .eq('ai_booked', true)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setBookings(data as any || []);
    } catch (error) {
      console.error('Error loading bookings:', error);
    }
  };

  const saveConfig = async () => {
    if (!config) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('agent_configs')
        .update({
          config: config.config,
          intents: config.intents,
          updated_at: new Date().toISOString()
        })
        .eq('id', config.id);

      if (error) throw error;

      toast({
        title: 'Saved',
        description: 'Agent configuration updated successfully'
      });
    } catch (error) {
      console.error('Error saving config:', error);
      toast({
        title: 'Error',
        description: 'Failed to save configuration',
        variant: 'destructive'
      });
    } finally {
      setSaving(false);
    }
  };

  const testAgent = async () => {
    toast({
      title: 'Test Call',
      description: 'In production, this would initiate a test call to the agent'
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  const avgConfidence = bookings.length > 0
    ? (bookings.reduce((sum, b) => sum + (b.ai_confidence || 0), 0) / bookings.length).toFixed(2)
    : '0.00';

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Bot className="h-8 w-8" />
            Voice AI Agent
          </h1>
          <p className="text-muted-foreground">24/7 automated booking agent powered by {config?.provider || 'AI'}</p>
        </div>
        <Button onClick={() => window.location.href = '/admin/bookings'} variant="outline">
          View All Bookings
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">AI Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bookings.length}</div>
            <p className="text-xs text-muted-foreground">Last 20 calls</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg Confidence</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(parseFloat(avgConfidence) * 100).toFixed(0)}%</div>
            <p className="text-xs text-muted-foreground">Booking accuracy</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Provider</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">{config?.provider || 'None'}</div>
            <p className="text-xs text-muted-foreground">Active agent</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              {config?.is_active ? (
                <>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium">Active</span>
                </>
              ) : (
                <>
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                  <span className="text-sm font-medium">Inactive</span>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="config" className="space-y-4">
        <TabsList>
          <TabsTrigger value="config">Configuration</TabsTrigger>
          <TabsTrigger value="intents">Intents</TabsTrigger>
          <TabsTrigger value="bookings">Recent Bookings</TabsTrigger>
        </TabsList>

        <TabsContent value="config" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Agent Settings</CardTitle>
              <CardDescription>Configure voice AI behavior and routing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Provider</Label>
                  <Select
                    value={config?.provider}
                    onValueChange={(value) => setConfig(prev => prev ? { ...prev, provider: value as any } : null)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="insighto">Insighto</SelectItem>
                      <SelectItem value="thoughtly">Thoughtly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Voice</Label>
                  <Input
                    value={config?.config.voice || ''}
                    onChange={(e) => setConfig(prev => prev ? {
                      ...prev,
                      config: { ...prev.config, voice: e.target.value }
                    } : null)}
                    placeholder="professional"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Language</Label>
                  <Input
                    value={config?.config.language || ''}
                    onChange={(e) => setConfig(prev => prev ? {
                      ...prev,
                      config: { ...prev.config, language: e.target.value }
                    } : null)}
                    placeholder="en-US"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Transfer Number (Low Confidence)</Label>
                  <Input
                    value={config?.config.transferNumber || ''}
                    onChange={(e) => setConfig(prev => prev ? {
                      ...prev,
                      config: { ...prev.config, transferNumber: e.target.value }
                    } : null)}
                    placeholder="+18145550100"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Confidence Threshold</Label>
                  <Input
                    type="number"
                    step="0.1"
                    min="0"
                    max="1"
                    value={config?.config.confidenceThreshold || 0.6}
                    onChange={(e) => setConfig(prev => prev ? {
                      ...prev,
                      config: { ...prev.config, confidenceThreshold: parseFloat(e.target.value) }
                    } : null)}
                  />
                  <p className="text-xs text-muted-foreground">Below this, calls transfer to human</p>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={saveConfig} disabled={saving}>
                  {saving ? 'Saving...' : 'Save Configuration'}
                </Button>
                <Button onClick={testAgent} variant="outline">
                  <Phone className="h-4 w-4 mr-2" />
                  Test Agent
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Webhook URL</CardTitle>
              <CardDescription>Configure this in your {config?.provider} dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  readOnly
                  value={`${window.location.origin}/functions/v1/agent-booking-handler`}
                  className="font-mono text-sm"
                />
                <Button
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText(`${window.location.origin}/functions/v1/agent-booking-handler`);
                    toast({ title: 'Copied', description: 'Webhook URL copied to clipboard' });
                  }}
                >
                  Copy
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="intents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Conversation Intents</CardTitle>
              <CardDescription>Define what the agent can understand and handle</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {config?.intents.map((intent, idx) => (
                <div key={idx} className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{intent.name}</h4>
                    <Badge variant="outline">{intent.fields.length} fields</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{intent.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {intent.fields.map((field, fieldIdx) => (
                      <Badge key={fieldIdx} variant="secondary">{field}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bookings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent AI Bookings</CardTitle>
              <CardDescription>Last 20 bookings created by voice agent</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {bookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">{booking.name}</p>
                      <p className="text-sm text-muted-foreground">{booking.phone} • {booking.service}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={booking.ai_confidence > 0.7 ? 'default' : 'secondary'}>
                        {(booking.ai_confidence * 100).toFixed(0)}% confident
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(booking.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
