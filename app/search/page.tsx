"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"
import { getProducts } from "@/lib/data"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const query = searchParams.get("q") || ""
  const [searchQuery, setSearchQuery] = useState(query)
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    const allProducts = getProducts()
    const filtered = allProducts.filter((product) => product.name.toLowerCase().includes(query.toLowerCase()))
    setProducts(filtered)
    setSearchQuery(query)
  }, [query])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Výsledky vyhledávání: &quot;{query}&quot;</h1>

        <form onSubmit={handleSearch} className="relative max-w-md">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Hledat produkty..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 pr-4"
          />
          <Button type="submit" className="absolute right-1 top-1 h-8" size="sm">
            Hledat
          </Button>
        </form>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <h2 className="text-xl font-semibold mb-2">Žádné produkty nebyly nalezeny</h2>
          <p className="text-muted-foreground mb-6">
            Zkuste vyhledat něco jiného nebo se podívejte na naše populární produkty.
          </p>
          <Button onClick={() => router.push("/")}>Zobrazit všechny produkty</Button>
        </div>
      )}
    </div>
  )
}

