import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { LogOut, RefreshCw } from "lucide-react";
import { format } from "date-fns";

interface Booking {
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
}

interface LeadScoreData {
  score: number;
  priority: 'critical' | 'high' | 'medium' | 'low';
  churnRisk: number;
}

// Extract lead score from booking message field
const extractLeadScore = (message?: string): LeadScoreData | null => {
  if (!message) return null;
  
  const scoreMatch = message.match(/\[LEAD SCORE: (\d+)\/100 \| Priority: (\w+) \| Churn Risk: (\d+)%\]/);
  if (scoreMatch) {
    return {
      score: parseInt(scoreMatch[1]),
      priority: scoreMatch[2].toLowerCase() as 'critical' | 'high' | 'medium' | 'low',
      churnRisk: parseInt(scoreMatch[3])
    };
  }
  return null;
};

const AdminBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error: any) {
      toast.error("Failed to fetch bookings");
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from("bookings")
        .update({ status })
        .eq("id", id);

      if (error) throw error;
      
      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === id ? { ...booking, status } : booking
        )
      );
      
      toast.success("Status updated");

      // Trigger master automation for status change
      if (status === 'confirmed' || status === 'completed') {
        try {
          await supabase.functions.invoke('smsit-master-automation', {
            body: {
              eventType: status === 'completed' ? 'service_completed' : 'booking_updated',
              bookingId: id
            }
          });
          console.log('Master automation triggered for status change:', status);
        } catch (automationError) {
          console.error('Master automation error:', automationError);
          // Don't fail status update if automation fails
        }
      }
    } catch (error: any) {
      toast.error("Failed to update status");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  useEffect(() => {
    // Check if user is authenticated and has admin role
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/admin/login");
        return;
      }

      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .single();

      if (!roleData) {
        toast.error("Unauthorized access");
        navigate("/admin/login");
        return;
      }

      fetchBookings();
    };

    checkAuth();
  }, [navigate]);

  const getServiceLabel = (service: string) => {
    const labels: Record<string, string> = {
      ron: "Remote Online Notary",
      mobile: "Mobile Notary",
      loan: "Loan Signing Agent",
    };
    return labels[service] || service;
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-amber text-amber-foreground",
      confirmed: "bg-primary text-primary-foreground",
      completed: "bg-success text-success-foreground",
      cancelled: "bg-destructive text-destructive-foreground",
    };
    return colors[status] || "bg-muted";
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-3xl">Booking Management</CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={fetchBookings}
                  disabled={isLoading}
                >
                  <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
                </Button>
                <Button variant="outline" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">Loading bookings...</div>
            ) : bookings.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No bookings found
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Lead Score</TableHead>
                      <TableHead>Preferred Date</TableHead>
                      <TableHead>Urgency</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => {
                      const leadScore = extractLeadScore(booking.message);
                      const getPriorityColor = (priority?: string) => {
                        const colors = {
                          critical: "bg-destructive text-destructive-foreground",
                          high: "bg-amber text-amber-foreground",
                          medium: "bg-primary text-primary-foreground",
                          low: "bg-muted text-muted-foreground"
                        };
                        return colors[priority as keyof typeof colors] || "bg-muted";
                      };

                      return (
                        <TableRow key={booking.id}>
                          <TableCell className="whitespace-nowrap">
                            {format(new Date(booking.created_at), "MMM dd, yyyy")}
                          </TableCell>
                          <TableCell className="font-medium">
                            {booking.name}
                            {booking.sms_opt_in && (
                              <Badge variant="outline" className="ml-2 text-xs">
                                SMS ✓
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div>{booking.email}</div>
                              <div className="text-muted-foreground">
                                {booking.phone}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="whitespace-nowrap">
                            {getServiceLabel(booking.service)}
                          </TableCell>
                          <TableCell>
                            {leadScore ? (
                              <div className="space-y-1">
                                <Badge className={getPriorityColor(leadScore.priority)}>
                                  {leadScore.score}/100
                                </Badge>
                                <div className="text-xs text-muted-foreground">
                                  {leadScore.priority.toUpperCase()}
                                </div>
                                {leadScore.churnRisk >= 70 && (
                                  <Badge variant="destructive" className="text-xs">
                                    ⚠️ {leadScore.churnRisk}% churn
                                  </Badge>
                                )}
                              </div>
                            ) : (
                              <span className="text-xs text-muted-foreground">N/A</span>
                            )}
                          </TableCell>
                          <TableCell className="whitespace-nowrap">
                            {booking.preferred_date
                              ? format(new Date(booking.preferred_date), "MMM dd, yyyy")
                              : "Flexible"}
                            {booking.preferred_time && (
                              <div className="text-xs text-muted-foreground capitalize">
                                {booking.preferred_time}
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="whitespace-nowrap">
                              {booking.urgency.replace("_", " ")}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(booking.status)}>
                              {booking.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Select
                              value={booking.status}
                              onValueChange={(value) => updateStatus(booking.id, value)}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-popover">
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="confirmed">Confirmed</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminBookings;
