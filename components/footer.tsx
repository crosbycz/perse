"use client"

import Link from "next/link"
import { TextIcon as Telegram } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t bg-black/90 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center">Perse®</h2>
            <p className="text-sm text-gray-400 max-w-md">{t("disclaimer")}</p>
          </div>

          <div className="flex justify-end items-end space-x-4">
            <Link href="#" className="text-white hover:text-blue-400 transition">
              <Telegram className="w-8 h-8" />
              <span className="sr-only">Telegram</span>
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()} Perse®. {t("all_rights_reserved")}
          </p>
        </div>
      </div>
    </footer>
  )
}

