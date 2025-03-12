"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { useCart } from "@/lib/cart-context"
import { useLanguage } from "@/lib/language-context"
import { useToast } from "@/hooks/use-toast"
import ProductQuantity from "@/components/product-quantity"
import { CheckCircle, ShoppingCart } from "lucide-react"

export default function BuyDrawer({
  product,
  open,
  onOpenChange,
}: {
  product: any
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [quantity, setQuantity] = React.useState(1)
  const { addToCart } = useCart()
  const { t } = useLanguage()
  const { toast } = useToast()
  const [isAdded, setIsAdded] = React.useState(false)

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setIsAdded(true)
    toast({
      title: t("added_to_cart"),
      description: `${product.name} (${quantity}x)`,
    })

    setTimeout(() => {
      setIsAdded(false)
      onOpenChange(false)
    }, 1500)
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>{product.name}</DrawerTitle>
            <DrawerDescription>
              {t("total")}: ${product.price}
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex flex-col items-center space-y-4">
              {isAdded ? (
                <div className="flex flex-col items-center py-6 space-y-2">
                  <CheckCircle className="h-12 w-12 text-green-500" />
                  <p className="text-center font-medium">{t("added_to_cart")}</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-center w-full">
                    <ProductQuantity quantity={quantity} setQuantity={setQuantity} max={10} />
                  </div>
                  <p className="text-center text-sm text-muted-foreground py-2">
                    {t("total")}: <span className="font-semibold">${(product.price * quantity).toFixed(2)}</span>
                  </p>
                </>
              )}
            </div>
          </div>
          <DrawerFooter>
            {!isAdded && (
              <Button onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                {t("add_to_cart")}
              </Button>
            )}
            <DrawerClose asChild>
              <Button variant="outline">{t("close")}</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

