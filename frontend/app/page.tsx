'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center px-4">
      <motion.section
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl text-center border border-green-900 rounded-2xl p-10 shadow-xl"
      >
        <h1 className="text-6xl md:text-6xl font-extrabold mb-5">
          Unlock Startup Growth
        </h1>

        <p className="text-gray-400 mb-7 leading-relaxed">
          A curated platform that helps early-stage founders access
          premium tools, cloud credits, and productivity software
          within.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          {/* Deals Button */}
          <Link href="/deals">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black px-6 py-3 rounded-lg font-semibold"
            >
              Explore Deals
            </motion.button>
          </Link>

          {/* Dashboard Button */}
          <Link href="/dashboard">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="border border-gray-600 px-6 py-3 rounded-lg font-semibold text-gray-200"
            >
              View Dashboard
            </motion.button>
          </Link>

          {/* Login Button */}
          <Link href="/login">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="border border-green-600 px-6 py-3 rounded-lg font-semibold text-green-400"
            >
              Login
            </motion.button>
          </Link>
          <Link href="/signup">
  <motion.button
    whileHover={{ scale: 1.08 }}
    whileTap={{ scale: 0.95 }}
    className="border border-green-600 px-6 py-3 rounded-lg font-semibold text-blue-400"
  >
    Sign Up
  </motion.button>
</Link>

        </div>
      </motion.section>
    </main>
  );
}
