'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-foreground/80 backdrop-blur-sm border-b border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-white hover:text-electric-blue transition-colors">
            404 <span className="text-electric-blue">TECH</span> NO FOUND
          </Link>
          <div className="flex items-center space-x-6">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors">Inicio</Link>
            <Link href="/products" className="text-gray-300 hover:text-white transition-colors">Catálogo</Link>
            <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Soporte</Link>
            
            {isAuthenticated ? (
              <button onClick={logout} className="text-gray-300 hover:text-white transition-colors">Logout</button>
            ) : (
              <Link href="/login" className="text-gray-300 hover:text-white transition-colors">Login</Link>
            )}

            <Link href="/cart" className="relative text-gray-300 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {/* Carrito count - se implementará luego */}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
