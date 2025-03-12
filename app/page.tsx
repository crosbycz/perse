import ProductGrid from "@/components/product-grid"
import SiteStats from "@/components/site-stats"
import { getProducts } from "@/lib/data"
import { Analytics } from "@vercel/analytics/react"

export default function Home() {
  const products = getProducts()

  return (
    <div className="space-y-10">
      <SiteStats />
      <ProductGrid products={products} />
      <Analytics/>

      <div className="mt-12 aspect-video w-full max-w-4xl mx-auto">
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/fDjDH_WAvYI?si=htpTI1eEA5p0fjKD"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="rounded-xl shadow-lg"
        />
      </div>
    </div>
  )
}

