import { Metadata } from "next"
import { getTenantConfig } from "@/lib/tenant"
import { ClientNav } from "@/components/nav/client-nav"

const config = getTenantConfig("client")

export const metadata: Metadata = {
  title: {
    default: config.title,
    template: `%s | ${config.name}`,
  },
  description: config.description,
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <ClientNav />
      <main className="pt-16">{children}</main>
    </div>
  )
}


