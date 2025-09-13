'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    category: string;
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { addToCart } = useCart();

    useEffect(() => {
        if (params.id) {
            const fetchProduct = async () => {
                try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${params.id}`);
                    if (!res.ok) {
                        throw new Error('Producto no encontrado');
                    }
                    const data = await res.json();
                    setProduct(data);
                } catch (err: any) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            }
            fetchProduct();
        }
    }, [params.id]);

    const handleAddToCart = () => {
        if (product) {
            addToCart(product.id, 1); // Añade 1 unidad del producto
        }
    };

    if (loading) return <div className="container mx-auto text-center py-20">Cargando...</div>;
    if (error) return <div className="container mx-auto text-center py-20 text-red-500">Error: {error}</div>;
    if (!product) return <div className="container mx-auto text-center py-20">Producto no disponible.</div>;

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Product Image */}
                <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-2xl shadow-electric-blue/10">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}${product.image}`}
                        alt={product.name}
                        layout="fill"
                        objectFit="cover"
                    />
                </div>

                {/* Product Details */}
                <div>
                    <span className="text-electric-blue font-semibold capitalize">{product.category}</span>
                    <h1 className="text-4xl font-bold my-2">{product.name}</h1>
                    <p className="text-gray-300 text-lg mb-6">{product.description}</p>
                    
                    <div className="flex items-center justify-between mb-8">
                        <span className="text-4xl font-bold text-electric-blue">${product.price}</span>
                    </div>

                    <button 
                        onClick={handleAddToCart}
                        className="w-full bg-electric-blue text-black font-bold py-4 rounded-lg hover:bg-white transition-colors text-lg">
                        Agregar al Carrito
                    </button>
                </div>
            </div>
        </div>
    );
}
