import React from 'react';

const SkillsEducationContact = ({ data, editMode, onChange }) => {
  const updateList = (key, next) => onChange({ [key]: next });

  const addSkill = () => updateList('skillsList', [...data.skillsList, { name: 'New Skill', level: 50, category: 'General' }]);
  const removeSkill = (i) => updateList('skillsList', data.skillsList.filter((_, idx) => idx !== i));
  const setSkill = (i, k, v) => updateList('skillsList', data.skillsList.map((s, idx) => idx === i ? { ...s, [k]: v } : s));

  const addEdu = () => updateList('educationList', [...data.educationList, { degree: 'B.Sc', school: 'University', years: '2018-2022', description: 'Description' }]);
  const removeEdu = (i) => updateList('educationList', data.educationList.filter((_, idx) => idx !== i));
  const setEdu = (i, k, v) => updateList('educationList', data.educationList.map((s, idx) => idx === i ? { ...s, [k]: v } : s));

  const setContact = (k, v) => onChange({ [k]: v });

  return (
    <section className="py-16 px-6 space-y-16">
      <div id="skills" className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Skills</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.skillsList.map((s, i) => (
            <div key={i} className="border rounded p-4 bg-white">
              <input className={`w-full font-medium bg-transparent outline-none ${editMode ? 'border-b' : ''}`} value={s.name} readOnly={!editMode} onChange={(e)=>setSkill(i,'name', e.target.value)} aria-label={`Skill ${i+1} name`} />
              <div className="mt-2 flex items-center gap-2">
                <label className="text-sm text-gray-600">Level</label>
                <input type="range" min={0} max={100} value={s.level} readOnly={!editMode} onChange={(e)=>setSkill(i,'level', Number(e.target.value))} />
                <span className="text-sm w-10 text-right">{s.level}</span>
              </div>
              <input className={`mt-2 w-full text-sm bg-transparent outline-none ${editMode ? 'border-b' : ''}`} value={s.category} readOnly={!editMode} onChange={(e)=>setSkill(i,'category', e.target.value)} aria-label={`Skill ${i+1} category`} />
              {editMode && (
                <button className="mt-3 text-xs px-2 py-1 border rounded" onClick={()=>removeSkill(i)}>Remove</button>
              )}
            </div>
          ))}
          {editMode && (
            <button onClick={addSkill} className="border-2 border-dashed rounded-lg p-8 flex items-center justify-center text-gray-500 hover:text-gray-700">+ Add Skill</button>
          )}
        </div>
      </div>

      <div id="education" className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Education</h2>
        <div className="space-y-4">
          {data.educationList.map((e, i) => (
            <div key={i} className="border rounded p-4 bg-white">
              <div className="grid md:grid-cols-2 gap-3">
                <input className={`w-full font-medium bg-transparent outline-none ${editMode ? 'border-b' : ''}`} value={e.degree} readOnly={!editMode} onChange={(ev)=>setEdu(i,'degree', ev.target.value)} aria-label={`Degree ${i+1}`} />
                <input className={`w-full font-medium bg-transparent outline-none ${editMode ? 'border-b' : ''}`} value={e.school} readOnly={!editMode} onChange={(ev)=>setEdu(i,'school', ev.target.value)} aria-label={`School ${i+1}`} />
              </div>
              <div className="grid md:grid-cols-2 gap-3 mt-2">
                <input className={`w-full text-sm bg-transparent outline-none ${editMode ? 'border-b' : ''}`} value={e.years} readOnly={!editMode} onChange={(ev)=>setEdu(i,'years', ev.target.value)} aria-label={`Years ${i+1}`} />
                <input className={`w-full text-sm bg-transparent outline-none ${editMode ? 'border-b' : ''}`} value={e.description} readOnly={!editMode} onChange={(ev)=>setEdu(i,'description', ev.target.value)} aria-label={`Description ${i+1}`} />
              </div>
              {editMode && (
                <button className="mt-3 text-xs px-2 py-1 border rounded" onClick={()=>removeEdu(i)}>Remove</button>
              )}
            </div>
          ))}
          {editMode && (
            <button onClick={addEdu} className="border-2 border-dashed rounded-lg p-8 flex items-center justify-center text-gray-500 hover:text-gray-700">+ Add Degree</button>
          )}
        </div>
      </div>

      <div id="contact" className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Contact</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <input id="contactEmail" className={`w-full bg-white border rounded px-3 py-2 ${!editMode ? 'pointer-events-none opacity-90' : ''}`} value={data.contactEmail} readOnly={!editMode} onChange={(e)=>setContact('contactEmail', e.target.value)} placeholder="Email" />
          <input id="contactPhone" className={`w-full bg-white border rounded px-3 py-2 ${!editMode ? 'pointer-events-none opacity-90' : ''}`} value={data.contactPhone} readOnly={!editMode} onChange={(e)=>setContact('contactPhone', e.target.value)} placeholder="Phone" />
        </div>
        <input id="contactCTA" className={`mt-3 w-full bg-white border rounded px-3 py-2 ${!editMode ? 'pointer-events-none opacity-90' : ''}`} value={data.contactCTA} readOnly={!editMode} onChange={(e)=>setContact('contactCTA', e.target.value)} placeholder="CTA" />
      </div>
    </section>
  );
};

export default SkillsEducationContact;
