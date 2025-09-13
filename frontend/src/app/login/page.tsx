'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('user@example.com'); // Default for testing
  const [password, setPassword] = useState('password123'); // Default for testing
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error('Credenciales incorrectas. Inténtalo de nuevo.');
      }

      const { accessToken } = await res.json();
      login(accessToken); // Guardar token en el contexto
      router.push('/'); // Redirigir al inicio

    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Iniciar Sesión</h1>
        <form onSubmit={handleSubmit} className="bg-foreground p-8 rounded-lg shadow-lg">
          {error && <p className="bg-red-500/20 text-red-400 p-3 rounded-md mb-4">{error}</p>}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-electric-blue"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-electric-blue"
            />
          </div>
          <button type="submit" className="w-full bg-electric-blue text-black font-bold py-3 rounded-lg hover:bg-white transition-colors">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
