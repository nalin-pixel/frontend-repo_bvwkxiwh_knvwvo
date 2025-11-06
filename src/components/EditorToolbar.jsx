import React from 'react';
import { Save, RotateCcw, Import, Download, X, Plus, Minus, Settings2 } from 'lucide-react';

const EditorToolbar = ({ editMode, onToggle, onSave, onReset, onExport, onImport, onLowQualityToggle, lowQuality, themeColor, onThemeChange }) => {
  return (
    <div className="fixed top-3 right-3 z-50 flex items-center gap-2">
      <button
        aria-pressed={editMode}
        aria-label="Toggle edit mode"
        onClick={onToggle}
        className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium border shadow-sm bg-white/80 backdrop-blur ${editMode ? 'ring-2 ring-offset-2' : ''}`}
        style={editMode ? { boxShadow: `0 0 0 2px ${themeColor} inset` } : undefined}
      >
        <Settings2 size={16} /> {editMode ? 'Authoring On' : 'Authoring Off'}
      </button>

      {editMode && (
        <div className="inline-flex items-center gap-2">
          <button onClick={onSave} className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm border bg-white"><Save size={16}/>Save</button>
          <button onClick={onReset} className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm border bg-white"><RotateCcw size={16}/>Reset</button>
          <button onClick={onExport} className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm border bg-white"><Download size={16}/>Export</button>
          <label className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm border bg-white cursor-pointer">
            <Import size={16}/>Import
            <input type="file" accept="application/json" className="hidden" onChange={onImport} />
          </label>
          <label className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm border bg-white">
            Accent
            <input type="color" value={themeColor} onChange={(e) => onThemeChange(e.target.value)} aria-label="Accent color"/>
          </label>
          <label className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm border bg-white">
            Low quality
            <input type="checkbox" checked={lowQuality} onChange={onLowQualityToggle} aria-label="Low quality toggle"/>
          </label>
        </div>
      )}
    </div>
  );
};

export default EditorToolbar;
