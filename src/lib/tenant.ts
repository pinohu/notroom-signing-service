import { headers } from "next/headers"
import type { Tenant } from "@/middleware"

// Get current tenant from request headers (set by middleware)
export async function getCurrentTenant(): Promise<Tenant> {
  const headersList = await headers()
  return (headersList.get("x-tenant") as Tenant) || "app"
}

// Tenant configuration
export const tenantConfig = {
  app: {
    name: "Vendor Portal",
    title: "Notroom | Vendor Portal",
    description: "Manage your signing assignments and grow your notary business",
    theme: "vendor",
    primaryColor: "#0ea5e9", // cyan-500
    logo: "/logos/notroom-vendor.svg",
  },
  client: {
    name: "Client Portal",
    title: "Notroom | Client Portal",
    description: "Submit and track signing orders with real-time updates",
    theme: "client",
    primaryColor: "#8b5cf6", // violet-500
    logo: "/logos/notroom-client.svg",
  },
  admin: {
    name: "Admin Dashboard",
    title: "Notroom | Admin",
    description: "Manage vendors, clients, and signing operations",
    theme: "admin",
    primaryColor: "#f59e0b", // amber-500
    logo: "/logos/notroom-admin.svg",
  },
  www: {
    name: "Notroom",
    title: "Notroom | National Signing Service",
    description: "50-state signing service for title companies and lenders",
    theme: "default",
    primaryColor: "#0ea5e9", // cyan-500
    logo: "/logos/notroom.svg",
  },
} as const

export type TenantConfig = (typeof tenantConfig)[Tenant]

export function getTenantConfig(tenant: Tenant): TenantConfig {
  return tenantConfig[tenant]
}

// Role-based access control per tenant
export const tenantRoles = {
  app: ["VENDOR"],
  client: ["TITLE_CLIENT"],
  admin: ["ADMIN", "SUPER_ADMIN"],
  www: ["USER", "VENDOR", "TITLE_CLIENT", "ADMIN", "SUPER_ADMIN"],
} as const

export function canAccessTenant(userRole: string, tenant: Tenant): boolean {
  const allowedRoles = tenantRoles[tenant]
  return allowedRoles.includes(userRole as (typeof allowedRoles)[number])
}

