import React, { useEffect, useMemo, useState } from 'react';
import Hero3D from './components/Hero3D';
import About from './components/About';
import Projects from './components/Projects';
import SkillsEducationContact from './components/SkillsEducationContact';
import EditorToolbar from './components/EditorToolbar';

const STORAGE_KEY = 'portfolio_v1';

const demoData = {
  profileName: 'Alex Rivera',
  introBlurb: 'Creative Developer • 3D & Frontend • Building playful web experiences',
  aboutText: `<p>Hello! I’m Alex, a developer focused on delightful interfaces, 3D on the web, and thoughtful design systems. I love crafting immersive, performant experiences.</p>`,
  projectsList: [
    { title: 'Nebula Explorer', description: 'A WebGL galaxy playground with shader-based starfields.', link: 'https://example.com/nebula', thumbnail: '' },
    { title: 'Motion Kit', description: 'Micro-interactions library for React + GSAP.', link: 'https://example.com/motion', thumbnail: '' },
    { title: 'Artfolio', description: 'Artist portfolio template with 3D hero.', link: 'https://example.com/artfolio', thumbnail: '' },
  ],
  skillsList: [
    { name: 'JavaScript', level: 90, category: 'Frontend' },
    { name: 'Three.js', level: 80, category: '3D' },
    { name: 'React', level: 85, category: 'Frontend' },
    { name: 'GSAP', level: 75, category: 'Animation' },
    { name: 'UX', level: 70, category: 'Design' },
    { name: 'Shaders', level: 55, category: '3D' },
  ],
  educationList: [
    { degree: 'B.Sc. Computer Science', school: 'Tech University', years: '2015–2019', description: 'Focus on graphics and HCI.' },
    { degree: 'M.Sc. Interactive Media', school: 'Design Institute', years: '2019–2021', description: 'Interactive installations & web.' },
  ],
  contactEmail: 'hello@alex.dev',
  contactPhone: '+1 (555) 010-2025',
  contactCTA: 'Let’s build something together',
  themeColor: '#6d28d9',
  lowQuality: false,
};

function App() {
  const [data, setData] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return { ...demoData, ...JSON.parse(raw) };
    } catch {}
    return demoData;
  });
  const [editMode, setEditMode] = useState(false);
  const [savedAt, setSavedAt] = useState(null);

  // Autosave
  useEffect(() => {
    const id = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        setSavedAt(new Date());
      } catch {}
    }, 300);
    return () => clearTimeout(id);
  }, [data]);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e) => {
      if (e.key.toLowerCase() === 'e') setEditMode((v) => !v);
      if (e.key.toLowerCase() === 'r' && e.metaKey === false && e.ctrlKey === false) {
        e.preventDefault();
        if (confirm('Reset to demo content?')) setData(demoData);
      }
      if (e.key.toLowerCase() === 's' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        triggerSave();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const onChange = (partial) => setData((d) => ({ ...d, ...partial }));

  const triggerSave = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setSavedAt(new Date());
    } catch {}
  };

  const onExport = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const onImport = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    try {
      const json = JSON.parse(text);
      setData((d) => ({ ...d, ...json }));
    } catch {
      alert('Invalid JSON file');
    }
    e.target.value = '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <EditorToolbar
        editMode={editMode}
        onToggle={() => setEditMode((v) => !v)}
        onSave={triggerSave}
        onReset={() => setData(demoData)}
        onExport={onExport}
        onImport={onImport}
        onLowQualityToggle={() => onChange({ lowQuality: !data.lowQuality })}
        lowQuality={data.lowQuality}
        themeColor={data.themeColor}
        onThemeChange={(v) => onChange({ themeColor: v })}
      />

      <Hero3D data={data} editMode={editMode} onChange={onChange} />
      <About data={data} editMode={editMode} onChange={onChange} />
      <Projects data={data} editMode={editMode} onChange={onChange} />
      <SkillsEducationContact data={data} editMode={editMode} onChange={onChange} />

      <footer className="py-8 text-center text-sm text-slate-500">
        <div>
          {savedAt ? (
            <span aria-live="polite">Saved {savedAt.toLocaleTimeString()}</span>
          ) : (
            <span aria-live="polite">Unsaved</span>
          )}
        </div>
      </footer>

      <style>{`:root { --theme: ${data.themeColor}; } a { color: var(--theme) } .btn-primary { background: var(--theme); color: #fff }`}</style>
    </div>
  );
}

export default App;
