"use client"

import { useLanguage } from "@/lib/language-context"

export default function SiteStats() {
  const { t } = useLanguage()

  return (
    <div className="grid grid-cols-3 gap-4 py-10">
      <div className="flex flex-col items-center text-center">
        <h3 className="text-lg sm:text-xl font-semibold">{t("average_rating")}:</h3>
        <div className="mt-2 flex items-center">
          <div className="flex">
            {[...Array(4)].map((_, i) => (
              <svg key={i} className="w-5 h-5 fill-primary" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            ))}
            <svg className="w-5 h-5 fill-primary/50" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
          </div>
          <span className="ml-2 text-lg font-medium">(4,5)</span>
        </div>
      </div>

      <div className="flex flex-col items-center text-center">
        <h3 className="text-lg sm:text-xl font-semibold">{t("satisfied_customers")}</h3>
        <p className="mt-2 text-2xl sm:text-3xl font-bold text-primary">147</p>
      </div>

      <div className="flex flex-col items-center text-center">
        <h3 className="text-lg sm:text-xl font-semibold">{t("launched_in")}</h3>
        <p className="mt-2 text-2xl sm:text-3xl font-bold">2024</p>
      </div>
    </div>
  )
}

