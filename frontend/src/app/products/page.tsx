'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';

// Tipos
interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
}
interface Category {
    id: string;
    name: string;
}

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                // Fetch products
                const productsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products${selectedCategory !== 'all' ? '?category=' + selectedCategory : ''}`);
                const productsData = await productsRes.json();
                setProducts(productsData);

                // Fetch categories
                const categoriesRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`);
                const categoriesData = await categoriesRes.json();
                setCategories(categoriesData);

            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [selectedCategory]);

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-center mb-4">Catálogo de Productos</h1>
            <p className="text-center text-gray-400 mb-10">Filtra por categoría para encontrar exactamente lo que necesitas.</p>

            {/* Category Filters */}
            <div className="flex justify-center space-x-4 mb-12">
                <button 
                    onClick={() => setSelectedCategory('all')} 
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${selectedCategory === 'all' ? 'bg-electric-blue text-black' : 'bg-foreground hover:bg-gray-700'}`}>
                    Todos
                </button>
                {categories.map(cat => (
                    <button 
                        key={cat.id} 
                        onClick={() => setSelectedCategory(cat.id)} 
                        className={`px-4 py-2 rounded-lg font-semibold transition-colors ${selectedCategory === cat.id ? 'bg-electric-blue text-black' : 'bg-foreground hover:bg-gray-700'}`}>
                        {cat.name}
                    </button>
                ))}
            </div>

            {/* Products Grid */}
            {loading ? (
                <div className="text-center">Cargando productos...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
             { !loading && products.length === 0 && (
                <p className="text-center text-gray-500 col-span-full">No se encontraron productos en esta categoría.</p>
            )}
        </div>
    );
}
