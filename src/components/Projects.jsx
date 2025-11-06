import React from 'react';

const Projects = ({ data, editMode, onChange }) => {
  const handleAdd = () => {
    const next = [...data.projectsList, { title: 'New Project', description: 'Describe it...', link: '#', thumbnail: '' }];
    onChange({ projectsList: next });
  };

  const handleRemove = (idx) => {
    const next = data.projectsList.filter((_, i) => i !== idx);
    onChange({ projectsList: next });
  };

  const handleField = (idx, key, value) => {
    const next = data.projectsList.map((p, i) => i === idx ? { ...p, [key]: value } : p);
    onChange({ projectsList: next });
  };

  return (
    <section id="projects" className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Projects</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.projectsList.map((p, idx) => (
            <div key={idx} className="group border rounded-lg overflow-hidden bg-white shadow hover:shadow-lg transition">
              <div className="aspect-video bg-gray-100 flex items-center justify-center overflow-hidden">
                {p.thumbnail ? (
                  <img src={p.thumbnail} alt={p.title} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-400">No thumbnail</span>
                )}
              </div>
              <div className="p-4">
                <input
                  className={`w-full font-semibold text-lg bg-transparent outline-none ${editMode ? 'border-b' : ''}`}
                  value={p.title}
                  readOnly={!editMode}
                  onChange={(e) => handleField(idx, 'title', e.target.value)}
                  aria-label={`Project ${idx + 1} title`}
                />
                <textarea
                  className={`mt-2 w-full text-sm text-gray-600 bg-transparent outline-none ${editMode ? 'border-b' : ''}`}
                  value={p.description}
                  readOnly={!editMode}
                  onChange={(e) => handleField(idx, 'description', e.target.value)}
                  aria-label={`Project ${idx + 1} description`}
                />
                <div className="mt-3 flex items-center gap-2">
                  <input
                    className={`flex-1 text-sm text-blue-600 underline bg-transparent outline-none ${editMode ? 'border-b' : ''}`}
                    value={p.link}
                    readOnly={!editMode}
                    onChange={(e) => handleField(idx, 'link', e.target.value)}
                    aria-label={`Project ${idx + 1} link`}
                  />
                  {editMode && (
                    <>
                      <label className="text-xs px-2 py-1 border rounded cursor-pointer">
                        Upload
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            const b64 = await fileToBase64(file);
                            handleField(idx, 'thumbnail', b64);
                          }}
                        />
                      </label>
                      <button className="text-xs px-2 py-1 border rounded" onClick={() => handleRemove(idx)}>Remove</button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
          {editMode && (
            <button onClick={handleAdd} className="border-2 border-dashed rounded-lg p-8 flex items-center justify-center text-gray-500 hover:text-gray-700">
              + Add Project
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default Projects;
