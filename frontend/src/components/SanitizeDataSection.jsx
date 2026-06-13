import { useState } from 'react';
import { sanitizeData } from '../services/api';

export default function SanitizeDataSection() {
  const [input, setInput] = useState('');
  const [sanitized, setSanitized] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError('');
    setSanitized('');
    try {
      const data = await sanitizeData(input);
      setSanitized(data.sanitized);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800">Sanitize Medical Data (PHI)</h2>
        <p className="text-slate-500 mt-1">Remove Protected Health Information from medical datasets.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-6">
        <label className="block text-sm font-semibold text-slate-700 mb-2">Medical Data</label>
        <textarea
          className="w-full h-48 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none text-sm text-slate-700 placeholder-slate-400 transition"
          placeholder="Paste medical data with PHI..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          disabled={loading || !input.trim()}
          className="mt-4 px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold text-sm hover:from-cyan-600 hover:to-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-cyan-500/25"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/></svg>
              Sanitizing...
            </span>
          ) : 'Sanitize Data'}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-3 rounded-xl text-sm mb-6">
          {error}
        </div>
      )}

      {sanitized && (
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-3">Sanitized Data</h3>
          <div className="bg-emerald-50 rounded-xl p-4 text-sm text-emerald-800 leading-relaxed whitespace-pre-wrap font-mono">
            {sanitized}
          </div>
        </div>
      )}
    </div>
  );
}
