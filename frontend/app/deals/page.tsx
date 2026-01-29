'use client';

import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

export default function DealsPreview() {
  const { token } = useAuth();

  const dealsNow = [
    {
      id: 'aws',
      name: 'Cloud Credits AWS',
      category: 'Cloud',
      locked: false,
      description: 'Free cloud credits for startups',
    },
    {
      id: 'notion',
      name: 'Notion Pro',
      category: 'Productivity',
      locked: true,
      description: 'Premium workspace tools',
    },
    {
      id: 'stripe',
      name: 'Stripe Atlas',
      category: 'Finance',
      locked: true,
      description: 'Startup incorporation support',
    },
  ];

  // Claim API call
 const handleClaim = async (dealId: string) => {
  if (!token) {
    alert('Please login first');
    return;
  }

  try {
    const res = await fetch('http://localhost:5000/api/claims', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        dealsId: dealId,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || 'Claim failed');
    } else {
      alert('Deal claimed successfully!');
    }
  } catch {
    alert('Server error');
  }
};


  return (
    <main className="min-h-screen bg-black text-gray-100 px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-10">
        Deals Available
      </h1>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {dealsNow.map((deal) => (
          <motion.div
            key={deal.id}
            whileHover={{ scale: 1.05 }}
            className={`p-6 rounded-xl border ${
              deal.locked
                ? 'border-red-500 bg-gray-900'
                : 'border-green-500 bg-gray-800'
            }`}
          >
            <h2 className="text-xl font-semibold mb-2">
              {deal.name}
            </h2>

            <p className="text-sm text-gray-400 mb-3">
              {deal.description}
            </p>

            <span
              className={`text-sm font-medium block mb-4 ${
                deal.locked
                  ? 'text-red-400'
                  : 'text-green-400'
              }`}
            >
              {deal.locked ? 'Locked' : 'Unlocked'}
            </span>

            {/* Claim Button */}
            {!deal.locked && (
              <button
                onClick={() => handleClaim(deal.id)}
                className="w-full bg-green-600 py-2 rounded font-semibold hover:bg-green-700"
              >
                Claim Deal
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </main>
  );
}
