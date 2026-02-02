'use client';

import { useState, useEffect, useCallback } from 'react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query, orderBy, type Timestamp } from 'firebase/firestore';

interface RSVP {
  id: string;
  name: string;
  email: string;
  numberOfGuests: string;
  additionalNames: string | null;
  invitationType: 'day' | 'evening';
  attending: 'yes' | 'no';
  dietary: string | null;
  toastDrink: string | null;
  message: string;
  submittedAt: Timestamp | null;
}

type SortField = 'name' | 'submittedAt' | 'attending' | 'invitationType' | 'numberOfGuests';
type SortDir = 'asc' | 'desc';

const STORAGE_KEY = 'wedding-admin-auth';

function formatDate(timestamp: Timestamp | null): string {
  if (!timestamp) return '--';
  const d = timestamp.toDate();
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function escapeCsv(value: string): string {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

// ─── Login Screen ────────────────────────────────────────────────

function LoginScreen({ onAuth }: { onAuth: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      localStorage.setItem(STORAGE_KEY, 'true');
      onAuth();
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="card max-w-sm w-full space-y-6">
        <div className="text-center">
          <div className="font-script text-4xl text-sage-500 mb-2">P & R</div>
          <h1 className="font-serif text-2xl text-stone-700">Admin Dashboard</h1>
        </div>
        <div>
          <label htmlFor="password" className="input-label">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(false); }}
            className={`input-field ${error ? 'border-rust-400 focus:ring-rust-400' : ''}`}
            placeholder="Enter admin password"
            autoFocus
          />
          {error && <p className="mt-2 text-sm text-rust-600">Incorrect password.</p>}
        </div>
        <button type="submit" className="w-full btn-primary">Sign In</button>
      </form>
    </div>
  );
}

// ─── Dashboard ───────────────────────────────────────────────────

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>('submittedAt');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [filterAttending, setFilterAttending] = useState<'' | 'yes' | 'no'>('');
  const [filterType, setFilterType] = useState<'' | 'day' | 'evening'>('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'rsvps'), orderBy('submittedAt', 'desc'));
    const unsub = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as RSVP));
        setRsvps(data);
        setLoading(false);
      },
      (err) => {
        console.error('Firestore listener error:', err);
        setError('Failed to load RSVPs. Check your Firebase configuration.');
        setLoading(false);
      },
    );
    return unsub;
  }, []);

  const toggleSort = useCallback((field: SortField) => {
    setSortDir((prev) => (sortField === field ? (prev === 'asc' ? 'desc' : 'asc') : 'desc'));
    setSortField(field);
  }, [sortField]);

  // Filter + sort
  const filtered = rsvps
    .filter((r) => {
      if (filterAttending && r.attending !== filterAttending) return false;
      if (filterType && r.invitationType !== filterType) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          r.name.toLowerCase().includes(q) ||
          r.email.toLowerCase().includes(q) ||
          (r.additionalNames?.toLowerCase().includes(q) ?? false)
        );
      }
      return true;
    })
    .sort((a, b) => {
      const dir = sortDir === 'asc' ? 1 : -1;
      switch (sortField) {
        case 'name':
          return dir * a.name.localeCompare(b.name);
        case 'attending':
          return dir * a.attending.localeCompare(b.attending);
        case 'invitationType':
          return dir * a.invitationType.localeCompare(b.invitationType);
        case 'numberOfGuests':
          return dir * (Number(a.numberOfGuests) - Number(b.numberOfGuests));
        case 'submittedAt': {
          const aTime = a.submittedAt?.seconds ?? 0;
          const bTime = b.submittedAt?.seconds ?? 0;
          return dir * (aTime - bTime);
        }
        default:
          return 0;
      }
    });

  // Stats
  const totalRsvps = rsvps.length;
  const attending = rsvps.filter((r) => r.attending === 'yes');
  const notAttending = rsvps.filter((r) => r.attending === 'no');
  const dayGuests = rsvps.filter((r) => r.invitationType === 'day');
  const eveningGuests = rsvps.filter((r) => r.invitationType === 'evening');
  const totalHeadcount = attending.reduce((sum, r) => sum + Number(r.numberOfGuests || 1), 0);

  // CSV export
  const exportCsv = () => {
    const headers = [
      'Name', 'Email', 'Number of Guests', 'Additional Names',
      'Invitation Type', 'Attending', 'Dietary Requirements',
      'Toast Drink', 'Message', 'Submitted At',
    ];
    const rows = rsvps.map((r) => [
      escapeCsv(r.name),
      escapeCsv(r.email),
      r.numberOfGuests,
      escapeCsv(r.additionalNames || ''),
      r.invitationType,
      r.attending,
      escapeCsv(r.dietary || ''),
      r.toastDrink || '',
      escapeCsv(r.message || ''),
      r.submittedAt ? formatDate(r.submittedAt) : '',
    ]);

    const csv = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const date = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `wedding-rsvps-${date}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <span className="text-stone-300 ml-1">&#8597;</span>;
    return <span className="text-sage-600 ml-1">{sortDir === 'asc' ? '&#9650;' : '&#9660;'}</span>;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-sage-300 border-t-sage-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-stone-500 text-sm">Loading RSVPs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center px-4">
        <div className="card max-w-md w-full text-center">
          <p className="text-rust-600 mb-4">{error}</p>
          <button onClick={() => window.location.reload()} className="btn-primary">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="font-script text-3xl text-sage-500">P & R</div>
            <div className="hidden sm:block h-6 w-px bg-stone-200" />
            <h1 className="hidden sm:block font-serif text-xl text-stone-700">RSVP Dashboard</h1>
          </div>
          <button
            onClick={onLogout}
            className="text-sm text-stone-500 hover:text-stone-700 transition-colors flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { label: 'Total RSVPs', value: totalRsvps, color: 'bg-stone-100 text-stone-700' },
            { label: 'Attending', value: attending.length, color: 'bg-sage-100 text-sage-700' },
            { label: 'Not Attending', value: notAttending.length, color: 'bg-rust-100 text-rust-700' },
            { label: 'Total Headcount', value: totalHeadcount, color: 'bg-heather-100 text-heather-700' },
            { label: 'Day Guests', value: dayGuests.length, color: 'bg-cream-200 text-stone-700' },
            { label: 'Evening Guests', value: eveningGuests.length, color: 'bg-cream-200 text-stone-700' },
          ].map((stat) => (
            <div key={stat.label} className={`rounded-xl p-4 ${stat.color}`}>
              <p className="text-2xl font-serif font-semibold">{stat.value}</p>
              <p className="text-xs uppercase tracking-wide mt-1 opacity-70">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field !py-2 text-sm sm:w-64"
            />
            <select
              value={filterAttending}
              onChange={(e) => setFilterAttending(e.target.value as '' | 'yes' | 'no')}
              className="input-field !py-2 text-sm sm:w-40"
            >
              <option value="">All responses</option>
              <option value="yes">Attending</option>
              <option value="no">Not attending</option>
            </select>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as '' | 'day' | 'evening')}
              className="input-field !py-2 text-sm sm:w-40"
            >
              <option value="">All types</option>
              <option value="day">Day guests</option>
              <option value="evening">Evening guests</option>
            </select>
          </div>
          <button
            onClick={exportCsv}
            className="btn-primary !py-2 !px-5 !text-xs flex items-center gap-2 shrink-0"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export CSV
          </button>
        </div>

        {/* Table */}
        {filtered.length === 0 ? (
          <div className="card text-center py-16">
            <p className="text-stone-400 font-serif text-xl">
              {rsvps.length === 0 ? 'No RSVPs yet.' : 'No results match your filters.'}
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg border border-stone-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-200">
                    {([
                      ['name', 'Name'],
                      ['submittedAt', 'Submitted'],
                      ['numberOfGuests', 'Guests'],
                      ['invitationType', 'Type'],
                      ['attending', 'Attending'],
                    ] as [SortField, string][]).map(([field, label]) => (
                      <th
                        key={field}
                        onClick={() => toggleSort(field)}
                        className="px-4 py-3 font-sans text-xs uppercase tracking-wider text-stone-500 cursor-pointer hover:text-stone-700 select-none whitespace-nowrap"
                      >
                        {label}<SortIcon field={field} />
                      </th>
                    ))}
                    <th className="px-4 py-3 font-sans text-xs uppercase tracking-wider text-stone-500 whitespace-nowrap">Dietary</th>
                    <th className="px-4 py-3 font-sans text-xs uppercase tracking-wider text-stone-500 whitespace-nowrap">Toast</th>
                    <th className="px-4 py-3 font-sans text-xs uppercase tracking-wider text-stone-500 whitespace-nowrap">Message</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filtered.map((r) => (
                    <tr key={r.id} className="hover:bg-cream-50 transition-colors">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="font-medium text-stone-700">{r.name}</div>
                        <div className="text-xs text-stone-400">{r.email}</div>
                        {r.additionalNames && (
                          <div className="text-xs text-stone-400 mt-0.5">+ {r.additionalNames}</div>
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-xs text-stone-500">
                        {formatDate(r.submittedAt)}
                      </td>
                      <td className="px-4 py-3 text-center text-stone-600">{r.numberOfGuests}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                          r.invitationType === 'day'
                            ? 'bg-sage-100 text-sage-700'
                            : 'bg-heather-100 text-heather-700'
                        }`}>
                          {r.invitationType === 'day' ? 'Day' : 'Evening'}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                          r.attending === 'yes'
                            ? 'bg-sage-100 text-sage-700'
                            : 'bg-rust-100 text-rust-700'
                        }`}>
                          {r.attending === 'yes' ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-stone-500 max-w-[200px] truncate">
                        {r.dietary || '--'}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-xs text-stone-500">
                        {r.toastDrink ? (r.toastDrink === 'alcoholic' ? 'Alcoholic' : 'Non-alcoholic') : '--'}
                      </td>
                      <td className="px-4 py-3 text-xs text-stone-500 max-w-[200px] truncate">
                        {r.message || '--'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-stone-50 border-t border-stone-200 px-4 py-3 text-xs text-stone-400">
              Showing {filtered.length} of {rsvps.length} RSVPs
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setAuthed(localStorage.getItem(STORAGE_KEY) === 'true');
    setMounted(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setAuthed(false);
  };

  if (!mounted) return null;

  return authed ? <Dashboard onLogout={handleLogout} /> : <LoginScreen onAuth={() => setAuthed(true)} />;
}
