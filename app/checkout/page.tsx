"use client"

import type React from "react"

import { useState } from "react"
import { useCart } from "@/lib/cart-context"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import CheckoutSummary from "@/components/checkout-summary"
import { AlertTriangle, Check } from "lucide-react"

const steps = [
  { en: "Personal Information", cs: "Osobní údaje", de: "Persönliche Informationen", sk: "Osobné údaje" },
  { en: "Payment Information", cs: "Platební údaje", de: "Zahlungsinformationen", sk: "Platobné údaje" },
  { en: "Order Confirmation", cs: "Potvrzení objednávky", de: "Bestellbestätigung", sk: "Potvrdenie objednávky" },
]

export default function CheckoutPage() {
  const { cart, getTotalPrice, clearCart } = useCart()
  const { t, language } = useLanguage()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [email, setEmail] = useState("")
  const [formComplete, setFormComplete] = useState(false)
  const [showPaymentInfo, setShowPaymentInfo] = useState(false)
  const [paymentWaiting, setPaymentWaiting] = useState(false)
  const [copied, setCopied] = useState(false)

  if (cart.length === 0) {
    router.push("/cart")
    return null
  }

  const progress = ((currentStep + 1) / steps.length) * 100

  const handleSubmitEmail = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.includes("@") && email.includes(".")) {
      setCurrentStep(1)
      setFormComplete(true)
    }
  }

  const handlePaymentSubmit = () => {
    setCurrentStep(2)
    setShowPaymentInfo(true)
  }

  const handleFinishPayment = () => {
    setPaymentWaiting(true)
  }

  const handleCancelOrder = () => {
    router.push("/")
  }

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(bitcoinAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const bitcoinAddress = "bc1qzwmnvpcw6ja345nzlhl75fa9h93cznpsmx87pn"

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">{t("checkout")}</h1>
        <div className="space-y-2">
          <div className="flex justify-between text-sm mb-1">
            <span>{steps[currentStep][language as keyof (typeof steps)[0]]}</span>
            <span>
              {t("step")} {currentStep + 1} {t("of")} {steps.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      <div className="grid md:grid-cols-[1fr_300px] gap-8">
        <div className="bg-white/70 backdrop-blur-sm rounded-lg shadow-md p-6">
          {currentStep === 0 && (
            <form onSubmit={handleSubmitEmail} className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">{t("personal_info")}</h2>
                <p className="text-sm text-muted-foreground">{t("enter_email")}</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{t("email")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="vas@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="pt-4">
                <Button type="submit" className="w-full">
                  {t("continue")}
                </Button>
              </div>
            </form>
          )}

          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">{t("payment_info")}</h2>
                <p className="text-sm text-muted-foreground">
                  {t("send_exact_amount").replace("{{amount}}", getTotalPrice().toFixed(2))}
                </p>
              </div>

              <div className="p-4 bg-amber-50 border border-amber-200 rounded-md text-amber-800 text-sm">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold mb-1">{t("double_check_address")}</p>
                    <p>{t("payment_warning")}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="btc-address">{t("bitcoin_address")}</Label>
                <div className="relative">
                  <Input id="btc-address" value={bitcoinAddress} readOnly className="bg-gray-50 pr-20" />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1 h-8 text-xs flex items-center gap-1"
                    onClick={handleCopyAddress}
                  >
                    {copied ? (
                      <>
                        <Check className="h-3 w-3 text-green-500" />
                        <span className="text-green-500">{t("copied")}</span>
                      </>
                    ) : (
                      <span>{t("copy")}</span>
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>{t("amount_to_pay")}</Label>
                <Input value={`$${getTotalPrice().toFixed(2)}`} readOnly className="bg-gray-50" />
              </div>

              <div className="pt-4 flex gap-4">
                <Button variant="outline" onClick={() => setCurrentStep(0)}>
                  {t("back_button")}
                </Button>
                <Button onClick={handlePaymentSubmit} className="ml-auto">
                  {t("confirm_payment_sent")}
                </Button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="space-y-2 text-center">
                <h2 className="text-xl font-semibold">
                  {paymentWaiting ? t("waiting_for_payment") : t("order_confirmation")}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {paymentWaiting ? t("payment_processing") : t("check_details")}
                </p>
              </div>

              {paymentWaiting ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-2 py-6">
                    <div className="h-4 w-4 rounded-full bg-blue-400 animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="h-4 w-4 rounded-full bg-blue-400 animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="h-4 w-4 rounded-full bg-blue-400 animate-bounce"></div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-md text-sm">
                    <p>{t("contact_support")}</p>
                  </div>

                  <Button variant="outline" onClick={() => router.push("/")} className="w-full">
                    {t("back_to_home")}
                  </Button>
                </div>
              ) : (
                <>
                  <div className="p-4 bg-gray-50 rounded-md space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">{t("email")}:</span>
                      <span className="text-sm font-medium">{email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">{t("amount_to_pay")}:</span>
                      <span className="text-sm font-medium">${getTotalPrice().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">{t("payment_info")}:</span>
                      <span className="text-sm font-medium">Bitcoin</span>
                    </div>
                  </div>

                  <div className="pt-4 flex gap-4">
                    <Button variant="outline" onClick={() => setCurrentStep(1)}>
                      {t("back_button")}
                    </Button>
                    <Button onClick={handleFinishPayment} className="ml-auto">
                      {t("complete_order")}
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        <CheckoutSummary />
      </div>
    </div>
  )
}

