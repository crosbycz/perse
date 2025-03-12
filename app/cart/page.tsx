"use client"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Trash2, AlertCircle, ShoppingCart } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import ProductQuantity from "@/components/product-quantity"
import { useLanguage } from "@/lib/language-context"

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart, getTotalPrice } = useCart()
  const router = useRouter()
  const { t } = useLanguage()

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto text-center p-10 bg-white/70 backdrop-blur-sm rounded-xl shadow-md">
        <div className="py-10 flex flex-col items-center">
          <ShoppingCart className="w-16 h-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">{t("your_cart_is_empty")}</h2>
          <p className="text-muted-foreground mb-6">{t("add_some_products")}</p>
          <Button onClick={() => router.push("/")}>{t("back_to_shopping")}</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{t("shopping_cart")}</h1>

      <div className="grid gap-6 mb-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="grid md:grid-cols-[1fr_3fr_auto] gap-4 p-4 bg-white/70 backdrop-blur-sm rounded-lg shadow-sm"
          >
            <div className="w-full aspect-square max-w-[120px]">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                width={120}
                height={120}
                className="w-full h-full object-cover rounded-md"
              />
            </div>

            <div className="flex flex-col justify-between py-1">
              <div>
                <h3 className="font-medium text-lg">{item.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">${item.price}</p>
              </div>

              <div className="max-w-[140px]">
                <ProductQuantity
                  quantity={item.quantity}
                  setQuantity={(newQuantity) => updateQuantity(item.id, newQuantity)}
                  max={10}
                  small
                />
              </div>
            </div>

            <div className="flex flex-col justify-between items-end">
              <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                <Trash2 className="w-5 h-5 text-red-500" />
              </Button>
              <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white/70 backdrop-blur-sm rounded-lg shadow-md p-6">
        <div className="flex justify-between mb-4">
          <span>{t("subtotal")}</span>
          <span className="font-medium">${getTotalPrice().toFixed(2)}</span>
        </div>

        <Alert variant="default" className="mb-4 bg-yellow-50 text-yellow-800 border-yellow-200">
          <AlertCircle className="h-4 w-4 mr-2" />
          <AlertTitle>{t("important_notice")}</AlertTitle>
          <AlertDescription>{t("disclaimer")}</AlertDescription>
        </Alert>

        <div className="flex gap-4 mt-6">
          <Button variant="outline" onClick={() => router.push("/")} className="flex-1">
            {t("continue_shopping")}
          </Button>
          <Button onClick={() => router.push("/checkout")} className="flex-1">
            {t("proceed_to_checkout")}
          </Button>
        </div>
      </div>
    </div>
  )
}

