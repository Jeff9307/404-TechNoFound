import ProductCard from "@/components/ProductCard";

// Definir el tipo para un producto
interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
}

async function getFeaturedProducts(): Promise<Product[]> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, { next: { revalidate: 60 } }); // Revalidar cada 60s
        if (!res.ok) {
            console.error("Error fetching products:", res.statusText);
            return [];
        }
        const products = await res.json();
        // Destacar 4 productos (ej. los primeros 4)
        return products.slice(0, 4);
    } catch (error) {
        console.error("Could not fetch products:", error);
        return [];
    }
}

export default async function HomePage() {
    const featuredProducts = await getFeaturedProducts();

    return (
        <div className="container mx-auto px-4">
            {/* Banner Section */}
            <section className="relative text-center my-16 bg-foreground p-12 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-electric-blue/10 z-0"></div>
                <div className="relative z-10">
                    <h1 className="text-5xl font-bold text-white">Bienvenido a 404 TECH NO FOUND</h1>
                    <p className="text-xl text-gray-300 mt-4">Donde la tecnología que buscas, te encuentra a ti.</p>
                    <a href="/products" className="mt-8 inline-block bg-electric-blue text-black font-bold py-3 px-8 rounded-lg hover:bg-white transition-colors">
                        Explorar Catálogo
                    </a>
                </div>
            </section>

            {/* Featured Products Section */}
            <section>
                <h2 className="text-3xl font-bold text-center mb-8">Productos Destacados</h2>
                {featuredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No se pudieron cargar los productos destacados. Asegúrate de que el backend esté funcionando.</p>
                )}
            </section>
        </div>
    );
}
