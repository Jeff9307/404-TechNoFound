import Image from 'next/image';
import Link from 'next/link';

// Definir el tipo para un producto
interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
}

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link href={`/products/${product.id}`}>
        <div className="bg-foreground rounded-lg overflow-hidden group transition-transform transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-electric-blue/20">
            <div className="relative w-full h-48">
                <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}${product.image}`}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform group-hover:scale-105"
                />
            </div>
            <div className="p-4">
                <h3 className="font-bold text-lg text-white">{product.name}</h3>
                <p className="text-gray-400 text-sm capitalize">{product.category}</p>
                <div className="flex justify-between items-center mt-4">
                    <p className="text-xl font-semibold text-electric-blue">${product.price}</p>
                    <button className="bg-electric-blue/20 text-electric-blue px-3 py-1 rounded-md text-sm hover:bg-electric-blue hover:text-black transition-colors">
                        Ver más
                    </button>
                </div>
            </div>
        </div>
    </Link>
  );
};

export default ProductCard;
