import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  TrendingUp,
  Plus,
  BarChart3,
  Receipt
} from "lucide-react"

export default async function ClientDashboard() {
  const session = await auth()
  
  if (!session) {
    redirect("/auth/signin")
  }

  // Mock data - replace with real data from database
  const stats = {
    activeOrders: 5,
    completedThisMonth: 47,
    pendingScanbacks: 2,
    avgCompletionTime: "4.2 hrs",
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Welcome back
          </h1>
          <p className="text-slate-600 mt-1">
            Manage your signing orders and track progress
          </p>
        </div>
        <Button asChild className="bg-violet-600 hover:bg-violet-700">
          <Link href="/orders/new">
            <Plus className="mr-2 h-4 w-4" />
            New Order
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Active Orders
            </CardTitle>
            <Clock className="h-4 w-4 text-violet-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeOrders}</div>
            <p className="text-xs text-slate-500">In progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Completed
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedThisMonth}</div>
            <p className="text-xs text-slate-500">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Pending Scanbacks
            </CardTitle>
            <FileText className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingScanbacks}</div>
            <p className="text-xs text-slate-500">Awaiting documents</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Avg. Completion
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-cyan-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgCompletionTime}</div>
            <p className="text-xs text-slate-500">Order to funded</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Track your latest signing requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Order items */}
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-violet-100 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-violet-600" />
                  </div>
                  <div>
                    <p className="font-medium">NR2412001234</p>
                    <p className="text-sm text-slate-500">John Smith - Purchase</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-100 text-cyan-800">
                    Assigned
                  </span>
                  <p className="text-sm text-slate-500 mt-1">Dec 18, 3:00 PM</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-medium">NR2412001233</p>
                    <p className="text-sm text-slate-500">Jane Doe - Refinance</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                    Funded
                  </span>
                  <p className="text-sm text-slate-500 mt-1">Dec 17, 11:00 AM</p>
                </div>
              </div>
            </div>

            <Button asChild className="w-full mt-4" variant="outline">
              <Link href="/orders">View All Orders</Link>
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full justify-start" variant="outline">
                <Link href="/orders/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Submit New Order
                </Link>
              </Button>
              <Button asChild className="w-full justify-start" variant="outline">
                <Link href="/reports">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  View Reports
                </Link>
              </Button>
              <Button asChild className="w-full justify-start" variant="outline">
                <Link href="/invoices">
                  <Receipt className="mr-2 h-4 w-4" />
                  View Invoices
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SLA Performance</CardTitle>
              <CardDescription>Your account metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Confirmation Rate</span>
                <span className="font-medium text-emerald-600">100%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">First-Pass Funding</span>
                <span className="font-medium text-emerald-600">98.2%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Pilot Signings Left</span>
                <span className="font-medium text-violet-600">7/10</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


