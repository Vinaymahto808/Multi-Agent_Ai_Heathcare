const tasks = [
  { id: 'summarize', label: 'Summarize Medical Text', icon: '📝' },
  { id: 'write', label: 'Write & Refine Article', icon: '✍️' },
  { id: 'sanitize', label: 'Sanitize Medical Data', icon: '🔒' },
];

export default function Sidebar({ active, onSelect }) {
  return (
    <aside className="w-72 min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white p-6 flex flex-col shadow-2xl">
      <div className="mb-10">
        <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Multi-Agent AI
        </h1>
        <p className="text-slate-400 text-sm mt-1">Powered by Grok</p>
      </div>
      <nav className="flex-1 space-y-2">
        {tasks.map((t) => (
          <button
            key={t.id}
            onClick={() => onSelect(t.id)}
            className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all duration-200 ${
              active === t.id
                ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-white border border-cyan-500/30 shadow-lg shadow-cyan-500/10'
                : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
            }`}
          >
            <span className="text-lg">{t.icon}</span>
            <span className="text-sm font-medium">{t.label}</span>
          </button>
        ))}
      </nav>
      <div className="pt-6 border-t border-slate-700 text-xs text-slate-500">
        Grok API • React + Tailwind
      </div>
    </aside>
  );
}
