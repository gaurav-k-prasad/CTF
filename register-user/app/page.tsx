"use client";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [regNo, setRegNo] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // State to hold the returned schema data
  const [credentials, setCredentials] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const regRegex = /^(21|22|23|24|25)[A-Z]{3}[0-9]{4}$/;

    if (!regRegex.test(regNo.toUpperCase())) {
      setError("Invalid Registration Number format (e.g., 23BCE0449)");
      setIsLoading(false);
      return;
    }

    try {
      // Call your Next.js API route (e.g., /api/register)
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ regNo: regNo.toUpperCase() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch credentials");
      }

      // Save the returned schema { cwId, password, regNo } to state
      console.log(data._doc);
      setCredentials(data._doc);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to make copying easy for the newbies
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-950 p-4 font-mono">
      <div className="w-full max-w-md border border-green-500/30 bg-gray-900 p-8 shadow-2xl rounded-lg">
        {/* CONDITIONAL RENDERING: Show form OR show credentials */}
        {!credentials ? (
          <>
            <h1 className="mb-6 text-2xl font-bold text-green-500 uppercase tracking-widest text-center">
              CTF Participant Login
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Registration Number
                </label>
                <input
                  type="text"
                  value={regNo}
                  onChange={(e) => setRegNo(e.target.value)}
                  placeholder="e.g. 23BCE0449"
                  disabled={isLoading}
                  className={`w-full bg-black border p-3 text-white focus:outline-none transition-colors ${
                    error
                      ? "border-red-500"
                      : "border-gray-700 focus:border-green-500"
                  } disabled:opacity-50`}
                />
                {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-600 py-3 font-bold text-white hover:bg-green-500 transition-all uppercase tracking-tighter disabled:bg-green-800 disabled:cursor-not-allowed"
              >
                {isLoading ? "Authenticating..." : "Get Credentials"}
              </button>
            </form>
          </>
        ) : (
          /* THE CREDENTIALS DISPLAY UI */
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-green-400 mb-2">
                Access Granted
              </h2>
              <p className="text-sm text-gray-400">
                Save these credentials immediately. They will not be shown
                again.
              </p>
            </div>

            <div className="bg-black border border-gray-700 p-4 rounded space-y-4">
              <div>
                <span className="text-xs text-gray-500 uppercase tracking-widest">
                  ID
                </span>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-lg text-white">{credentials.cwId}</span>
                  <button
                    onClick={() => copyToClipboard(credentials.cwId)}
                    className="text-green-500 hover:text-green-400 text-sm"
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-800 pt-4">
                <span className="text-xs text-gray-500 uppercase tracking-widest">
                  Password
                </span>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-lg text-yellow-400">
                    {credentials.password}
                  </span>
                  <button
                    onClick={() => copyToClipboard(credentials.password)}
                    className="text-green-500 hover:text-green-400 text-sm"
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-800 pt-4">
                <span className="text-xs text-gray-500 uppercase tracking-widest">
                  Linked Reg No
                </span>
                <div className="mt-1">
                  <span className="text-md text-gray-300">
                    {credentials.regNo}
                  </span>
                </div>
              </div>
            </div>

            <Link href="https://flagwars.vercel.app/">
              <button className="w-full border border-green-600 py-3 font-bold text-green-500 hover:bg-green-600/10 transition-all uppercase tracking-tighter">
                Start Challenges
              </button>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
