import { Metadata } from "next"
import { getTenantConfig } from "@/lib/tenant"
import { VendorNav } from "@/components/nav/vendor-nav"

const config = getTenantConfig("app")

export const metadata: Metadata = {
  title: {
    default: config.title,
    template: `%s | ${config.name}`,
  },
  description: config.description,
}

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <VendorNav />
      <main className="pt-16">{children}</main>
    </div>
  )
}

