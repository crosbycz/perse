"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShoppingCart, Search } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useLanguage } from "@/lib/language-context"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import LanguageSwitcher from "@/components/language-switcher"

export default function Header() {
  const { cart, getTotalPrice } = useCart()
  const { t } = useLanguage()
  const pathname = usePathname()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [searchOpen, setSearchOpen] = useState(false)

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
    }
  }

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-white/70 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl text-blue-500">Perse®</span>
          </Link>

          <nav className="hidden md:flex gap-6">
            <Link
              href="/"
              className={`text-sm font-medium ${pathname === "/" ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
            >
              {t("products")}
            </Link>
            <Link
              href="/faq"
              className={`text-sm font-medium ${pathname === "/faq" ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
            >
              {t("faq")}
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex relative">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={t("search")}
                className="w-64 pl-8 pr-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>

          <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)} className="md:hidden">
            <Search className="h-5 w-5" />
            <span className="sr-only">{t("search")}</span>
          </Button>

          <LanguageSwitcher />

          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                  {cartCount}
                </span>
              )}
              <span className="sr-only">{t("cart")}</span>
            </Button>
          </Link>
        </div>
      </div>

      <Sheet open={searchOpen} onOpenChange={setSearchOpen}>
        <SheetContent side="top" className="w-full h-auto pt-12 pb-6">
          <SheetHeader className="mb-4">
            <SheetTitle>{t("search")}</SheetTitle>
          </SheetHeader>
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              autoFocus
              placeholder={t("search")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">{t("search")}</Button>
          </form>
        </SheetContent>
      </Sheet>
    </header>
  )
}

