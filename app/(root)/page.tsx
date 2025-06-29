import ProductList from "@/components/shared/product/product-list";
import { getLatestProducts } from "@/lib/actions/product.actions";

const Homepage = async () => {
  
  const latestProducts = await getLatestProducts();

  // Convert price and rating from Decimal to string for each product
  const formattedProducts = latestProducts.map(product => ({
    ...product,
    price: product.price.toString(),
    rating: product.rating.toString(),
  }));

  return (
  <>
        <ProductList 
        data={formattedProducts} 
        title="Featured Products" 
        limit={4}
      />
    </>
  );
  
}
 
export default Homepage;