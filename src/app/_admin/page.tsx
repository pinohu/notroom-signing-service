import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Users, 
  Building2, 
  FileText, 
  DollarSign,
  TrendingUp,
  Clock,
  AlertTriangle,
  CheckCircle2
} from "lucide-react"

export default async function AdminDashboard() {
  const session = await auth()
  
  if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.user?.role || "")) {
    redirect("/auth/signin")
  }

  // Mock data - replace with real data from database
  const stats = {
    activeVendors: 127,
    activeClients: 34,
    ordersToday: 23,
    revenue: 45250,
    pendingApprovals: 5,
    escalatedOrders: 2,
    avgResponseTime: "3.2 min",
    fundingRate: "98.7%",
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
        <p className="text-slate-600 mt-1">
          Overview of Notroom operations
        </p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Active Vendors
            </CardTitle>
            <Users className="h-4 w-4 text-cyan-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeVendors}</div>
            <p className="text-xs text-emerald-600">+12 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Active Clients
            </CardTitle>
            <Building2 className="h-4 w-4 text-violet-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeClients}</div>
            <p className="text-xs text-emerald-600">+3 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Orders Today
            </CardTitle>
            <FileText className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.ordersToday}</div>
            <p className="text-xs text-slate-500">18 completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Monthly Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.revenue.toLocaleString()}</div>
            <p className="text-xs text-emerald-600">+15% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-500" />
              First-Pass Funding Rate
            </CardTitle>
            <CardDescription>Primary success metric</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-emerald-600">{stats.fundingRate}</div>
            <div className="mt-4 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 rounded-full" 
                style={{ width: stats.fundingRate }}
              />
            </div>
            <p className="text-sm text-slate-500 mt-2">Target: 98%+</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-cyan-500" />
              Avg Response Time
            </CardTitle>
            <CardDescription>Vendor confirmation speed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-cyan-600">{stats.avgResponseTime}</div>
            <p className="text-sm text-slate-500 mt-4">Target: Under 3 minutes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Attention Required
            </CardTitle>
            <CardDescription>Items needing action</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Pending Approvals</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                  {stats.pendingApprovals}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Escalated Orders</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  {stats.escalatedOrders}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest system events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              <div className="flex-1">
                <p className="font-medium">Order NR2412001234 completed</p>
                <p className="text-sm text-slate-500">Vendor: Sarah Johnson | Client: ABC Title</p>
              </div>
              <span className="text-sm text-slate-500">2 min ago</span>
            </div>
            
            <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
              <Users className="h-5 w-5 text-cyan-500" />
              <div className="flex-1">
                <p className="font-medium">New vendor application received</p>
                <p className="text-sm text-slate-500">Michael Chen - Pittsburgh, PA</p>
              </div>
              <span className="text-sm text-slate-500">15 min ago</span>
            </div>
            
            <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
              <Building2 className="h-5 w-5 text-violet-500" />
              <div className="flex-1">
                <p className="font-medium">New client signed up for pilot</p>
                <p className="text-sm text-slate-500">XYZ Title Company - Philadelphia, PA</p>
              </div>
              <span className="text-sm text-slate-500">1 hour ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

