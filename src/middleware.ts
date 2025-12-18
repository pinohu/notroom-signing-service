import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Tenant types for the multi-tenant architecture
export type Tenant = "app" | "client" | "admin" | "www"

// Subdomain to tenant mapping
const SUBDOMAIN_MAP: Record<string, Tenant> = {
  app: "app",       // Vendors/Notaries portal
  client: "client", // Title companies portal
  admin: "admin",   // Internal admin portal
  www: "www",       // Marketing/public site
}

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const hostname = request.headers.get("host") || ""
  
  // Get tenant from subdomain
  const tenant = getTenantFromHostname(hostname)
  
  // Set tenant in headers for downstream use
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-tenant", tenant)
  requestHeaders.set("x-hostname", hostname)
  
  // For localhost/development, don't rewrite - just pass through with headers
  if (hostname.includes("localhost") || hostname.includes("127.0.0.1")) {
    return NextResponse.next({
      request: { headers: requestHeaders },
    })
  }
  
  // In production with subdomains, rewrite to tenant-specific routes
  if (tenant !== "www" && !url.pathname.startsWith(`/_${tenant}`) && !url.pathname.startsWith("/api") && !url.pathname.startsWith("/auth")) {
    const rewriteUrl = url.clone()
    rewriteUrl.pathname = `/_${tenant}${url.pathname}`
    
    return NextResponse.rewrite(rewriteUrl, {
      request: { headers: requestHeaders },
    })
  }
  
  return NextResponse.next({
    request: { headers: requestHeaders },
  })
}

function getTenantFromHostname(hostname: string): Tenant {
  // Development: localhost - don't route by subdomain
  if (hostname.includes("localhost") || hostname.includes("127.0.0.1")) {
    return "www"
  }
  
  // Production: subdomain-based routing
  const subdomain = hostname.split(".")[0]
  
  if (subdomain in SUBDOMAIN_MAP) {
    return SUBDOMAIN_MAP[subdomain]
  }
  
  // Default to www for unknown subdomains
  return "www"
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
