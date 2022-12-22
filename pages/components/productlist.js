import Link from "next/link"
import Product from "./product"

export default function ProductList({products}) {
  if (!products) return null

  return (
    <ul>
      {products.map((product) => (
        <li key={product.permalink}>
          <Link href={`/products/${product.permalink}`}>
              <Product {...product} />
          </Link>
        </li>
      ))}
    </ul>
  )
}