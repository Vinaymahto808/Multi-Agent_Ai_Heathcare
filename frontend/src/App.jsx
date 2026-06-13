import { useState } from 'react';
import Sidebar from './components/Sidebar';
import SummarizeSection from './components/SummarizeSection';
import WriteArticleSection from './components/WriteArticleSection';
import SanitizeDataSection from './components/SanitizeDataSection';

export default function App() {
  const [active, setActive] = useState('summarize');

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar active={active} onSelect={setActive} />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {active === 'summarize' && <SummarizeSection />}
          {active === 'write' && <WriteArticleSection />}
          {active === 'sanitize' && <SanitizeDataSection />}
        </div>
      </main>
    </div>
  );
}
