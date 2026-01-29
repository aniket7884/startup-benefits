'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const [emailId, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loadingNow, setLoading] = useState(false);

  const routerData = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const re = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
    body: JSON.stringify({ email: emailId, password }),

      });

      const details = await re.json();

      if (!re.ok) {
        alert(details.message || 'Login failed sorry');
        return;
      }

      login(details.token);
      routerData.push('/deals');
    } catch {
      alert('Server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-xl w-96 border border-gray-700"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 bg-black border border-gray-700 rounded"
          value={emailId}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 bg-black border border-gray-700 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loadingNow}
          className="w-full bg-white text-black py-3 rounded font-semibold hover:bg-gray-200"
        >
          {loadingNow ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </main>
  );
}
