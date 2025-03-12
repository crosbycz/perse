"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import BuyDrawer from "@/components/buy-drawer"
import { useCart } from "@/lib/cart-context"
import { useLanguage } from "@/lib/language-context"
import { useToast } from "@/hooks/use-toast"
import { Info, ShoppingCart } from "lucide-react"

export default function ProductCard({ product }: { product: any }) {
  const [buyDrawerOpen, setBuyDrawerOpen] = useState(false)
  const { addToCart } = useCart()
  const { toast } = useToast()
  const { t } = useLanguage()

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    addToCart(product, 1)
    toast({
      title: t("added_to_cart"),
      description: `${product.name} (1x)`,
    })
  }

  const handleBuyClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setBuyDrawerOpen(true)
  }

  return (
    <>
      <div className="group relative overflow-hidden rounded-lg bg-white/70 backdrop-blur-md shadow-sm hover:shadow-md transition-all duration-300">
        <Link href={`/products/${product.id}`} className="block">
          <div className="aspect-square overflow-hidden">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={400}
              height={400}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <div className="absolute top-2 left-2">
            {product.available && (
              <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">
                {t("available")}
              </Badge>
            )}
          </div>

          <div className="p-4">
            <h3 className="font-medium text-lg line-clamp-1">{product.name}</h3>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.shortDescription || ""}</p>
            <div className="flex items-center justify-between mt-auto">
              <span className="font-bold">${product.price}</span>
            </div>
          </div>
        </Link>

        <div className="absolute bottom-0 left-0 right-0 p-3 flex gap-2 bg-gradient-to-t from-white/90 to-white/0 pt-8 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <Button variant="outline" size="sm" className="flex-1 bg-white/80" onClick={handleBuyClick}>
            <ShoppingCart className="mr-1 h-4 w-4" />
            {t("buy")}
          </Button>
          <Link href={`/products/${product.id}`} className="flex-1">
            <Button variant="secondary" size="sm" className="w-full">
              <Info className="mr-1 h-4 w-4" />
              {t("details")}
            </Button>
          </Link>
        </div>
      </div>

      <BuyDrawer product={product} open={buyDrawerOpen} onOpenChange={setBuyDrawerOpen} />
    </>
  )
}

