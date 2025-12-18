import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  FileText, 
  Calendar, 
  DollarSign, 
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react"

export default async function VendorDashboard() {
  const session = await auth()
  
  if (!session) {
    redirect("/auth/signin")
  }

  // Mock data - replace with real data from database
  const stats = {
    pendingOrders: 3,
    completedToday: 2,
    monthlyEarnings: 4250,
    eliteScore: 87,
    responseTime: "4 min",
    fundingRate: "98.5%",
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Welcome back, {session.user?.name || "Notary"}
        </h1>
        <p className="text-slate-600 mt-1">
          Here&apos;s your signing activity overview
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Pending Orders
            </CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingOrders}</div>
            <p className="text-xs text-slate-500">Awaiting acceptance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Completed Today
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedToday}</div>
            <p className="text-xs text-slate-500">Signings finished</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Monthly Earnings
            </CardTitle>
            <DollarSign className="h-4 w-4 text-cyan-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${stats.monthlyEarnings.toLocaleString()}
            </div>
            <p className="text-xs text-slate-500">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Elite Score
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-violet-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.eliteScore}/100</div>
            <p className="text-xs text-slate-500">Top performer</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Your latest signing assignments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Placeholder for orders list */}
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-cyan-100 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-cyan-600" />
                  </div>
                  <div>
                    <p className="font-medium">Purchase Signing</p>
                    <p className="text-sm text-slate-500">123 Main St, Erie PA</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                    Pending
                  </span>
                  <p className="text-sm text-slate-500 mt-1">Dec 18, 2:00 PM</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-medium">Refinance Signing</p>
                    <p className="text-sm text-slate-500">456 Oak Ave, Pittsburgh PA</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                    Completed
                  </span>
                  <p className="text-sm text-slate-500 mt-1">Dec 17, 10:00 AM</p>
                </div>
              </div>
            </div>

            <Button asChild className="w-full mt-4" variant="outline">
              <Link href="/orders">View All Orders</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance</CardTitle>
            <CardDescription>Your key metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Response Time</span>
              <span className="font-medium text-emerald-600">{stats.responseTime}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Funding Rate</span>
              <span className="font-medium text-emerald-600">{stats.fundingRate}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Tier Status</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-violet-100 text-violet-800">
                Gold
              </span>
            </div>

            <div className="pt-4 border-t">
              <Button asChild className="w-full">
                <Link href="/profile">Update Profile</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

