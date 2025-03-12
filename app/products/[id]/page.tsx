"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getProductById } from "@/lib/data"
import { useCart } from "@/lib/cart-context"
import { Sparkles, Zap, Globe } from "lucide-react"
import ProductQuantity from "@/components/product-quantity"
import BackButton from "@/components/back-button"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/lib/language-context"

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const { addToCart } = useCart()
  const { toast } = useToast()
  const { t } = useLanguage()
  const [quantity, setQuantity] = useState(1)
  const [product, setProduct] = useState<any>(null)

  useEffect(() => {
    setProduct(getProductById(params.id))
  }, [params.id])

  if (!product) {
    return <div className="text-center py-20">{t("loading")}</div>
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
    toast({
      title: t("added_to_cart"),
      description: `${product.name} (${quantity}x)`,
    })
  }

  return (
    <div className="max-w-6xl mx-auto">
      <BackButton />

      <div className="grid md:grid-cols-2 gap-10 mt-6 p-6 bg-white/70 backdrop-blur-sm rounded-xl shadow-lg">
        <div className="rounded-lg overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={600}
            height={600}
            className="w-full h-auto object-cover"
            priority
          />
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="px-3 py-1 bg-amber-100 text-amber-800 border-amber-200">
                {product.available ? t("available") : t("sold_out")}
              </Badge>
              <div className="text-2xl font-bold text-primary">${product.price}</div>
            </div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center text-sm text-muted-foreground">
              <Sparkles className="w-4 h-4 mr-1" />
              <span>{t("most_popular")}</span>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-gray-200">
            <p className="text-lg">{product.description}</p>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500" />
                <span>{t("quick_money")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-500" />
                <span>
                  {t("you_can_use")} <strong>{t("brand_new")}</strong> {t("or_main_account")}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <ProductQuantity quantity={quantity} setQuantity={setQuantity} max={10} />

            <div className="flex gap-4 mt-6">
              <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                {t("add_to_cart")}
              </Button>
            </div>

            <div className="mt-4 text-sm text-muted-foreground">
              {t("total")}: <span className="font-semibold">${product.price * quantity}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

