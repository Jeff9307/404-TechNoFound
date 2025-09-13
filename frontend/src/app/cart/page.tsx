'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
    const { cart, loading } = useCart();

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleCheckout = () => {
        // Aquí se integraría la API de Stripe/Paypal
        alert("Procediendo al pago (simulación). ¡Gracias por tu compra!");
        // Podríamos llamar a una función `clearCart()` del contexto
    };

    if (loading) {
        return <div className="container mx-auto text-center py-16">Cargando tu carrito...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold text-center mb-10">Tu Carrito de Compras</h1>

            {cart.length === 0 ? (
                <div className="text-center">
                    <p className="text-xl text-gray-400">Tu carrito está vacío.</p>
                    <Link href="/products" className="mt-6 inline-block bg-electric-blue text-black font-bold py-3 px-6 rounded-lg hover:bg-white transition-colors">
                        Ver productos
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-6">
                        {cart.map(item => (
                            <div key={item.id} className="flex items-center bg-foreground p-4 rounded-lg">
                                <div className="relative w-24 h-24 rounded-md overflow-hidden mr-4 flex-shrink-0">
                                    <Image src={`${process.env.NEXT_PUBLIC_API_URL}${item.image}`} alt={item.name} layout="fill" objectFit="cover" />
                                </div>
                                <div className="flex-grow">
                                    <h3 className="font-bold text-lg">{item.name}</h3>
                                    <p className="text-electric-blue font-semibold">${item.price.toFixed(2)}</p>
                                </div>
                                <div className="text-right">
                                    <p>Cantidad: {item.quantity}</p>
                                    {/* TODO: Implementar botones para cambiar cantidad o eliminar */}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="bg-foreground p-8 rounded-lg shadow-lg h-fit">
                        <h2 className="text-2xl font-bold mb-6">Resumen del Pedido</h2>
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-300">Subtotal</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-4">
                            <span className="text-gray-300">Envío</span>
                            <span className="text-green-400">Gratis</span>
                        </div>
                        <div className="border-t border-gray-700 my-4"></div>
                        <div className="flex justify-between font-bold text-xl mb-8">
                            <span>Total</span>
                            <span className="text-electric-blue">${total.toFixed(2)}</span>
                        </div>
                        <button 
                            onClick={handleCheckout}
                            className="w-full bg-electric-blue text-black font-bold py-3 rounded-lg hover:bg-white transition-colors">
                            Finalizar Compra
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
