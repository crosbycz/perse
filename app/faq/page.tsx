"use client"
import { useLanguage } from "@/lib/language-context"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
  const { t } = useLanguage()

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">{t("frequently_asked_questions")}</h1>

      <div className="bg-white/70 backdrop-blur-sm rounded-lg shadow-md p-6">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>{t("faq_is_this_scam")}</AccordionTrigger>
            <AccordionContent>{t("faq_is_this_scam_answer")}</AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>{t("faq_what_is_sauce")}</AccordionTrigger>
            <AccordionContent>{t("faq_what_is_sauce_answer")}</AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>{t("faq_how_receive")}</AccordionTrigger>
            <AccordionContent>{t("faq_how_receive_answer")}</AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>{t("faq_how_much")}</AccordionTrigger>
            <AccordionContent>{t("faq_how_much_answer")}</AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>{t("faq_how_buy_bitcoin")}</AccordionTrigger>
            <AccordionContent>{t("faq_how_buy_bitcoin_answer")}</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}

