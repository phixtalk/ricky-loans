"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Leads = {
  name: string;
  title: string;
  company: string;
  location: string;
  url: string;
};

const leads = [
  {
    name: "Alice Johnson",
    title: "Senior Product Manager",
    company: "TechNova Inc.",
    location: "San Francisco, CA",
    url: "https://www.linkedin.com/in/alicejohnson",
  },
  {
    name: "Brian Chen",
    title: "Head of Engineering",
    company: "CodeWave Labs",
    location: "New York, NY",
    url: "https://www.linkedin.com/in/brianc",
  },
  {
    name: "Clara Martinez",
    title: "Marketing Director",
    company: "BrightSpark Media",
    location: "Austin, TX",
    url: "https://www.linkedin.com/in/claramartinez",
  },
  {
    name: "David Kim",
    title: "UX Designer",
    company: "PixelWorks Studio",
    location: "Seattle, WA",
    url: "https://www.linkedin.com/in/davidkimux",
  },
  {
    name: "Eva Thompson",
    title: "Sales Manager",
    company: "GrowthEdge Solutions",
    location: "Chicago, IL",
    url: "https://www.linkedin.com/in/evathompson",
  },
];

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Leads[]>(leads);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);

    const res = await fetch("/api/search", {
      method: "POST",
      body: JSON.stringify({ query }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setResults(data.leads || []);
    setLoading(false);
  };

  const downloadCSV = () => {
    const csv = [
      ["Name", "Title", "Company", "Location", "LinkedIn URL"],
      ...results.map((r) => [r.name, r.title, r.company, r.location, r.url]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "linkedin-leads.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <main className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
        <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl p-8 w-full max-w-xl text-center">
          <h1 className="text-2xl font-bold text-white mb-2">
            Free LinkedIn Lead Generator
          </h1>
          <p className="text-gray-300 mb-6">
            Use keywords to describe your search
          </p>

          <label className="block text-left text-sm font-medium text-gray-300 mb-1">
            Enter search parameters <span className="text-red-400">*</span>
          </label>
          <textarea
            className="w-full border border-gray-600 bg-gray-700 rounded-md p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
            placeholder="e.g. ceo fintech germany OR marketing director canada"
            rows={2}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <div className="text-left mt-2 text-xs text-gray-400">
            💡 Try combining job titles, industries, and countries
            <br />
            Examples: <code className="text-blue-300">founder saas france</code>
            , <code className="text-blue-300">recruiter healthcare dubai</code>
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.03 }}
            onClick={handleSearch}
            disabled={loading}
            className="mt-6 bg-red-500 cursor-pointer hover:bg-red-600 text-white font-semibold py-2.5 px-6 rounded-md w-full transition-all"
          >
            {loading ? "Searching..." : "Submit"}
          </motion.button>

          <AnimatePresence>
            {results.length > 0 && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                className="mt-8 text-left"
              >
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-semibold">Results</h2>
                  <button
                    onClick={downloadCSV}
                    className="bg-green-600 cursor-pointer hover:bg-green-700 text-white text-sm font-medium py-1.5 px-4 rounded-md"
                  >
                    Download CSV
                  </button>
                </div>

                {loading && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mt-8 space-y-4"
                  >
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="animate-pulse bg-gray-700 rounded-md h-14 w-full"
                      />
                    ))}
                  </motion.div>
                )}
                <ul className="text-sm max-h-64 overflow-y-auto border border-gray-700 rounded p-3 bg-gray-700">
                  {results.map((r, idx) => (
                    <li
                      key={idx}
                      className="mb-2 border-b border-gray-600 pb-2"
                    >
                      <strong className="text-white">{r.name}</strong> –{" "}
                      {r.title} at {r.company} ({r.location})<br />
                      <a
                        href={r.url}
                        className="text-blue-400 hover:underline"
                        target="_blank"
                      >
                        View Profile
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <footer className="text-center py-6 bg-gray-800 text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Ricky Loans and Finance. All rights
        reserved.
      </footer>
    </div>
  );
}
