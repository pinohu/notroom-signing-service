"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  FileText, 
  BarChart3, 
  Settings,
  Map,
  DollarSign,
  AlertTriangle,
  UserPlus
} from "lucide-react"

const sidebarItems = [
  { 
    label: "Overview",
    items: [
      { href: "/", label: "Dashboard", icon: LayoutDashboard },
      { href: "/orders", label: "All Orders", icon: FileText },
    ]
  },
  {
    label: "Network",
    items: [
      { href: "/vendors", label: "Vendors", icon: Users },
      { href: "/vendors/pending", label: "Pending Approvals", icon: UserPlus },
      { href: "/clients", label: "Title Clients", icon: Building2 },
    ]
  },
  {
    label: "Operations",
    items: [
      { href: "/routing", label: "Routing Rules", icon: Map },
      { href: "/escalations", label: "Escalations", icon: AlertTriangle },
      { href: "/billing", label: "Billing", icon: DollarSign },
    ]
  },
  {
    label: "Analytics",
    items: [
      { href: "/reports", label: "Reports", icon: BarChart3 },
      { href: "/kpis", label: "KPI Dashboard", icon: BarChart3 },
    ]
  },
  {
    label: "System",
    items: [
      { href: "/settings", label: "Settings", icon: Settings },
    ]
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-slate-200 overflow-y-auto">
      <nav className="p-4 space-y-6">
        {sidebarItems.map((section) => (
          <div key={section.label}>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-3">
              {section.label}
            </h3>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        isActive
                          ? "bg-amber-50 text-amber-700"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  )
}

