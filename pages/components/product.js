export default function Product ({name, price}) {
  return (
    <p>
      {name}: {price.formatted_with_symbol}
    </p>
  )
}