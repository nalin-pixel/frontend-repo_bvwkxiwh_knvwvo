import React from 'react';

const About = ({ data, editMode, onChange }) => {
  return (
    <section id="about" className="py-16 px-6 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">About</h2>
        <div
          id="aboutText"
          className={`prose max-w-none bg-white/60 rounded-lg p-4 outline-none ${editMode ? 'ring-1 ring-slate-200' : ''}`}
          contentEditable={editMode}
          suppressContentEditableWarning
          onInput={(e)=> onChange({ aboutText: e.currentTarget.innerHTML })}
          role={editMode ? 'textbox' : undefined}
          aria-label="About text"
          dangerouslySetInnerHTML={{ __html: data.aboutText }}
        />
      </div>
    </section>
  );
};

export default About;
