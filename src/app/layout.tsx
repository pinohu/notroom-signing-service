import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: {
    default: "Notroom | National Signing Service",
    template: "%s | Notroom",
  },
  description: "50-state signing service for title companies and lenders. 3-minute confirmation. 98%+ first-pass funding rate.",
  keywords: ["signing service", "notary", "title company", "loan signing", "RON", "remote online notarization"],
  authors: [{ name: "Notroom" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://notroom.com",
    siteName: "Notroom",
    title: "Notroom | National Signing Service",
    description: "50-state signing service for title companies and lenders",
  },
  twitter: {
    card: "summary_large_image",
    title: "Notroom | National Signing Service",
    description: "50-state signing service for title companies and lenders",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
