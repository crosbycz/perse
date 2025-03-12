"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Minus, Plus } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function ProductQuantity({
  quantity,
  setQuantity,
  max = 10,
  small = false,
}: {
  quantity: number
  setQuantity: (quantity: number) => void
  max?: number
  small?: boolean
}) {
  const { t } = useLanguage()

  const increment = () => {
    if (quantity < max) {
      setQuantity(quantity + 1)
    }
  }

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const handleManualInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (!isNaN(value) && value >= 1 && value <= max) {
      setQuantity(value)
    }
  }

  return (
    <div className="flex items-center">
      <Button
        variant="outline"
        size={small ? "icon-sm" : "icon"}
        onClick={decrement}
        disabled={quantity <= 1}
        className={small ? "h-8 w-8" : ""}
      >
        <Minus className={small ? "h-3 w-3" : "h-4 w-4"} />
        <span className="sr-only">{t("decrease_quantity")}</span>
      </Button>

      <Input
        type="number"
        min="1"
        max={max}
        value={quantity}
        onChange={handleManualInput}
        className={`w-14 mx-2 text-center ${small ? "h-8" : ""}`}
      />

      <Button
        variant="outline"
        size={small ? "icon-sm" : "icon"}
        onClick={increment}
        disabled={quantity >= max}
        className={small ? "h-8 w-8" : ""}
      >
        <Plus className={small ? "h-3 w-3" : "h-4 w-4"} />
        <span className="sr-only">{t("increase_quantity")}</span>
      </Button>
    </div>
  )
}

