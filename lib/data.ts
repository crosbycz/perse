// Sample product data
const products = [
  {
    id: "cashapp-glitch",
    name: "CashApp Glitch",
    price: 200,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cashapp-NidOwWIYFDRBscUzFgXGA4ClltXHYm.png",
    available: true,
    shortDescription: "CashApp instant deposit. You can instantly deposit money to your CashApp account.",
    description: `💸 CashApp instant deposit MOST POPULAR

You can instantly deposit money to your CashApp account.

✅ Comes with a step-by-step guide
✅ Full customer support included
✅ Quick money guaranteed
✅ Instant process`,
  },
  {
    id: "2fa-spoofer",
    name: "2FA SPOOFER (OPSEC)",
    price: 320,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2fa%20spoofer-rNvnEEvJVFqyozsO0GQwGELjjJ9vko.png",
    available: true,
    shortDescription: "Software for Bypassing 2FA (two-factor) logging with AI deepvoice technology.",
    description: `🔐 Software for Bypassing 2FA (two-factor) logging.

Quick access to anywhere.

✅ Can Hotswap any simcard using AI deepvoice
✅ Transcript generator
✅ Can bypass 2FA logins for emails or bank logs
✅ Can create phishing pages and set full automatization`,
  },
  {
    id: "paypal-login",
    name: "PayPal Login",
    price: 80,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/paypal%20login-0uQOSyFp6qpMYMhnJNaz5cP3GqonuJ.png",
    available: true,
    shortDescription: "Fully charged credit card with high balance, compatible with multiple payment systems.",
    description: `💳 Fully charged credit card with balance between $4k and $8k.

Quick money.

✅ Card can be attached to Apple Pay, CashApp or PayPal account
✅ Balance on card about $4k and $8k`,
  },
  {
    id: "mastercard-cc",
    name: "MasterCard CC",
    price: 60,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mastercard%20cc-jmSnonHyGhEHJCGHxdk7IEjUpYSCzU.png",
    available: true,
    shortDescription: "Fully charged MasterCard with medium balance, multi-platform compatible.",
    description: `💳 Fully charged credit card with balance between $2k and $4k.

Quick money.

✅ Card can be attached to Apple Pay, CashApp or PayPal account
✅ Balance on card about $2k and $4k`,
  },
  {
    id: "visa-cc",
    name: "Visa CC",
    price: 60,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/visa%20cc-CPQzuokWDFt6l8894II5ImS8HKEHjs.png",
    available: true,
    shortDescription: "Fully charged Visa card with medium balance, multi-platform compatible.",
    description: `💳 Fully charged credit card with balance between $2k and $4k.

Quick money.

✅ Card can be attached to Apple Pay, CashApp or PayPal account
✅ Balance on card about $2k and $4k`,
  },
  {
    id: "coinbase-login",
    name: "Coinbase login",
    price: 120,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/coinbase%20login-rzDci2eoIZ3dgYAnzobVlDMBIJhixr.png",
    available: true,
    shortDescription: "Coinbase account with high balance, custom card attachment available.",
    description: `🪙 Coinbase login with balance between $8k and $15k.

Quick money.

✅ You can attach your own card and make payments
✅ You can deposit money to your cashapp instantly
✅ Balance on card about $8k and $15k`,
  },
  {
    id: "nicehash-login",
    name: "NiceHash login",
    price: 120,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nicehash-d9BWMuEeFeHaSW3DTjzEDAoEtfGf8g.png",
    available: true,
    shortDescription: "NiceHash account with medium-high balance, instant cashapp deposits.",
    description: `⛏️ NiceHash login with balance between $5k and $9k.

Quick money.

✅ You can attach your own card and make payments
✅ You can deposit money to your cashapp instantly
✅ Balance on card about $5k and $9k`,
  },
  {
    id: "exodus-login",
    name: "Exodus login",
    price: 140,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/exodus%20login-ZHGnQiLrO27upiPAhnM4bjCXgkCCRw.png",
    available: true,
    shortDescription: "Exodus wallet access with high balance, instant transfer capability.",
    description: `🌌 Exodus login with balance between $5k and $9k.

Quick money.

✅ You can attach your own card and make payments
✅ You can deposit money to your cashapp instantly
✅ Balance on card about $5k and $9k`,
  },
]

export function getProducts() {
  return products
}

export function getProductById(id: string) {
  return products.find((product) => product.id === id)
}

