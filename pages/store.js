import React from "react"
import commerce from "../lib/commerce"
import ProductList from "./components/productlist"

export async function getStaticProps() {
  const { data: products } = await commerce.products.list();

  return {
    props: {
      products,
    },
  };
}


export default function StorePage({merchant, products}) {
  return (
    <React.Fragment>
      <h1>Products</h1>
      <ProductList products={products} />
    </React.Fragment>
  )
}