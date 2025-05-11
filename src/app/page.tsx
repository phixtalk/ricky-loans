"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Feedback } from "./components/Feedback";
import { useSnackbar } from "./providers/SnackbarProvider";

type Leads = {
  name: string;
  title: string;
  company: string;
  location: string;
  url: string;
};

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Leads[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { showSnackbar } = useSnackbar();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setQuery(value);
    setError("");

    if (!value.trim()) setError("Search cannot be empty.");
  };
  const handleSearch = async () => {
    if (!query.trim()) {
      setError("Search cannot be empty.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/search", {
        method: "POST",
        body: JSON.stringify({ query }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      setResults(data.results || []);
    } catch (err) {
      showSnackbar({
        mode: "error",
        message: "Something went wrong. Please try again later.",
      });
      console.error("Error fetching leads:", err);
    }
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
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-xl p-8 bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl">
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
            onChange={handleChange}
          />
          {error && <p className="text-red-400 mt-2 text-sm">{error}</p>}

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
            className={`mt-6 bg-red-500  hover:bg-red-600 text-white font-semibold py-2.5 px-6 rounded-md w-full transition-all flex items-center justify-center gap-2 ${
              loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                Searching...
              </>
            ) : (
              "Search"
            )}
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
                <ul className="text-sm max-h-72 overflow-y-auto border border-gray-700 rounded p-3 bg-gray-700">
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
          <Feedback />
        </div>
      </main>

      <footer className="text-center py-6 bg-gray-800 text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Cicero AI. All rights reserved.
      </footer>
    </div>
  );
}
