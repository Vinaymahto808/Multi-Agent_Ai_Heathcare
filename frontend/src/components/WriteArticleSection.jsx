import { useState } from 'react';
import { writeArticle } from '../services/api';

export default function WriteArticleSection() {
  const [topic, setTopic] = useState('');
  const [outline, setOutline] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const data = await writeArticle(topic, outline);
      setResult(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800">Write & Refine Research Article</h2>
        <p className="text-slate-500 mt-1">Generate a research article on any topic with AI-powered drafting and refinement.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-6">
        <label className="block text-sm font-semibold text-slate-700 mb-2">Topic</label>
        <input
          type="text"
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm text-slate-700 placeholder-slate-400 transition mb-4"
          placeholder="Enter research topic..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <label className="block text-sm font-semibold text-slate-700 mb-2">Outline (optional)</label>
        <textarea
          className="w-full h-32 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none text-sm text-slate-700 placeholder-slate-400 transition"
          placeholder="Enter an outline..."
          value={outline}
          onChange={(e) => setOutline(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          disabled={loading || !topic.trim()}
          className="mt-4 px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold text-sm hover:from-cyan-600 hover:to-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-cyan-500/25"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/></svg>
              Writing & Refining...
            </span>
          ) : 'Write & Refine Article'}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-3 rounded-xl text-sm mb-6">
          {error}
        </div>
      )}

      {result && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-400 rounded-full" />
              Draft Article
            </h3>
            <div className="prose prose-sm max-w-none text-slate-600 leading-relaxed whitespace-pre-wrap">
              {result.draft}
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-400 rounded-full" />
              Refined Article
            </h3>
            <div className="prose prose-sm max-w-none text-slate-600 leading-relaxed whitespace-pre-wrap">
              {result.refined}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
