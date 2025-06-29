import Link from "next/link";
import Image from "next/image";
import { Card, CardHeader } from "@/components/ui/card";
import ProductPrice from "./product-price";
import { Product } from "@/types";

const ProductCard = ({ product } : {product: Product;}) => {
    return ( <Card className="w-full max-w-sm">
        <CardHeader className="p-0 items-center">
            
                <Image
                    src={product.images[0]}
                    alt={product.name}
                    width={300}
                    height={300}
                    priority={true}
                    className="w-full h-64 object-cover rounded-t-lg"
                />
                <div className="p-4 grid gap-4">
                    <h3 className="text-lg font-semibold">{product.brand}</h3>
                    <Link href={`/product/${product.slug}`} className="block">                 
                        <h2 className="text-sm font-bold">{product.name}</h2>
                    </Link>                       
                                        
                    <div className="flex-between gap-4">
                        <p>{Number(product.rating)} Stars</p>
                        {product.stock > 0 ? (
                            <ProductPrice value={Number(product.price)} className="" />
                        ) : (
                            <span className="text-red-600">Out of Stock</span>
                        )}
                    </div>
                </div>            
        </CardHeader>
    </Card>);
}
 
export default ProductCard;