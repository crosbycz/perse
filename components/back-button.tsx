"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/lib/language-context"

export default function BackButton() {
  const router = useRouter()
  const { t } = useLanguage()

  return (
    <Button variant="ghost" size="sm" onClick={() => router.back()} className="pl-1">
      <ChevronLeft className="mr-1 h-4 w-4" />
      {t("back")}
    </Button>
  )
}

