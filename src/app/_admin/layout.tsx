import { Metadata } from "next"
import { getTenantConfig } from "@/lib/tenant"
import { AdminNav } from "@/components/nav/admin-nav"
import { AdminSidebar } from "@/components/nav/admin-sidebar"

const config = getTenantConfig("admin")

export const metadata: Metadata = {
  title: {
    default: config.title,
    template: `%s | ${config.name}`,
  },
  description: config.description,
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-100">
      <AdminNav />
      <div className="flex pt-16">
        <AdminSidebar />
        <main className="flex-1 p-6 ml-64">{children}</main>
      </div>
    </div>
  )
}


