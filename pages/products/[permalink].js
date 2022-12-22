import commerce from "../../lib/commerce";

export async function getStaticProps({ params }) {
  const { permalink } = params;

  const product = await commerce.products.retrieve(permalink, {
    type: 'permalink',
  });

  return {
    props: {
      product,
    },
  };
}

export async function getStaticPaths() {
  const { data: products } = await commerce.products.list();

  return {
    paths: products.map((product) => ({
      params: {
        permalink: product.permalink,
      },
    })),
    fallback: false,
  };
}

export default function ProductPage({ product }) {
  console.log(product)
  console.log(product.image.url)
  return (
    <>
      <h1>{product.name}</h1>
      <p>{product.price.formatted_with_symbol}</p>
      {/* <div style={backgroundImage:`url("${product.media.source}")`}></div> */}
      <img src={`${product.image.url}`} style = {{height: "150px"}}></img>
    </>
  );
}