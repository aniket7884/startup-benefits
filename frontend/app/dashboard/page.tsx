'use client';

import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Claim = {
  _id: string;
  dealId: string;
};

export default function DashboardPage() {
  const { token, logout } = useAuth();
  const router = useRouter();

  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);

  // Protect page
  useEffect(() => {
    if (!token) {
      router.push('/login');
      return;
    }

    fetchClaims();
  }, [token]);

  // Load claims
  const fetchClaims = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/claims/my', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      setClaims(data);
    } catch (err) {
      alert('Failed to load claims');
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <main className="min-h-screen bg-black text-white p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        <button
          onClick={handleLogout}
          className="border border-red-600 px-4 py-2 rounded text-red-400 hover:bg-red-600 hover:text-white"
        >
          Logout
        </button>
      </div>

      {/* Claims Section */}
      <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
        <h2 className="text-xl mb-4">My Claimed Deals</h2>

        {loading && <p>Loading...</p>}

        {!loading && claims.length === 0 && (
          <p className="text-gray-400">No deals claimed yet.</p>
        )}

        {!loading && claims.length > 0 && (
          <ul className="space-y-2">
            {claims.map((claim) => (
              <li
                key={claim._id}
                className="p-3 bg-black border border-gray-700 rounded"
              >
                Deal ID: <span className="text-green-400">{claim.dealId}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

    </main>
  );
}
