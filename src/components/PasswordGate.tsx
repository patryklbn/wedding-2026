'use client';

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'wedding_access_granted';
const PASSWORD = 'patrykbecca2026';

export function useWeddingAccess() {
  return {
    logout: () => {
      localStorage.removeItem(STORAGE_KEY);
      window.location.reload();
    },
  };
}

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [granted, setGranted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    setGranted(localStorage.getItem(STORAGE_KEY) === 'true');
    setMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === PASSWORD) {
      localStorage.setItem(STORAGE_KEY, 'true');
      setGranted(true);
    } else {
      setError(true);
    }
  };

  // Prevent any flash of content while checking localStorage
  if (!mounted) return null;

  if (granted) return <>{children}</>;

  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="card max-w-sm w-full space-y-6">
        <div className="text-center">
          <div className="font-script text-4xl text-sage-500 mb-2">P & R</div>
          <h1 className="font-serif text-2xl text-stone-700">Welcome</h1>
          <p className="text-stone-400 text-sm mt-1">Please enter the password to view the wedding website.</p>
        </div>
        <div>
          <label htmlFor="site-password" className="input-label">Password</label>
          <input
            id="site-password"
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(false); }}
            className={`input-field ${error ? 'border-rust-400 focus:ring-rust-400' : ''}`}
            placeholder="Enter password"
            autoFocus
          />
          {error && <p className="mt-2 text-sm text-rust-600">Incorrect password. Please try again.</p>}
        </div>
        <button type="submit" className="w-full btn-primary">Enter</button>
      </form>
    </div>
  );
}
