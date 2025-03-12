"use client"

import { useCart } from "@/lib/cart-context"
import { useLanguage } from "@/lib/language-context"
import Image from "next/image"
import Link from "next/link"

export default function CheckoutSummary() {
  const { cart, getTotalPrice } = useCart()
  const { t } = useLanguage()

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-lg shadow-md p-6 h-fit">
      <h2 className="font-medium text-lg mb-4">{t("order_summary")}</h2>

      <div className="space-y-4 mb-4">
        {cart.map((item) => (
          <div key={item.id} className="flex gap-3">
            <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm line-clamp-1">{item.name}</p>
              <div className="flex justify-between mt-1">
                <span className="text-sm text-muted-foreground">
                  {item.quantity} × ${item.price}
                </span>
                <span className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between mb-1">
          <span className="text-sm">{t("subtotal")}</span>
          <span className="font-medium">${getTotalPrice().toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{t("shipping")}</span>
          <span>{t("free")}</span>
        </div>
      </div>

      <div className="border-t mt-4 pt-4">
        <div className="flex justify-between font-semibold">
          <span>{t("total")}</span>
          <span>${getTotalPrice().toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-4 pt-2 text-xs text-muted-foreground">
        <Link href="/cart" className="text-primary underline">
          {t("edit_cart")}
        </Link>
      </div>
    </div>
  )
}

