import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/lib/cart-context"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/lib/language-context"
import Header from "@/components/header"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Perse - Stack bands, not scams!",
  description:
    "Persa is an online store where you can find over several bank accounts that contain several thousand deals thanks to the methods we can afford to sell. We have extremely low market prices and quality workmanship.",
  generator: "persa",
  keywords: [
    "persa",
    "stack bands",
    "stack",
    "bands",
    "online store",
    "bank accounts",
    "deals",
    "methods",
    "market prices",
    "quality workmanship",
  ],
  openGraph: {
    title: "Perse - Stack bands, not scams!",
    description:
      "Persa is an online store where you can find over several bank accounts that contain several thousand deals thanks to the methods we can afford to sell. We have extremely low market prices and quality workmanship.",
    images: [
      {
        url: "/Shop.png",
        width: 1200,
        height: 630,
        alt: "Shop banner",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Perse - Stack bands, not scams!",
    description:
      "Persa is an online store where you can find over several bank accounts that contain several thousand deals thanks to the methods we can afford to sell. We have extremely low market prices and quality workmanship.",
    images: ["/Shop.png"],
  },
  icons: {
    icon: "/Shop.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <LanguageProvider>
            <CartProvider>
              <div className="min-h-screen flex flex-col bg-gradient-to-b from-pink-100 via-amber-50 to-pink-100">
                <Header />
                <main className="flex-1 container mx-auto px-4 py-6">{children}</main>
                <Footer />
              </div>
            </CartProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'