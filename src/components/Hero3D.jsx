import React, { useEffect, useRef } from 'react';
import Spline from '@splinetool/react-spline';

const Hero3D = ({ data, editMode, onChange }) => {
  const nameRef = useRef(null);
  const blurbRef = useRef(null);

  useEffect(() => {
    if (nameRef.current) nameRef.current.textContent = data.profileName || '';
    if (blurbRef.current) blurbRef.current.textContent = data.introBlurb || '';
  }, [data.profileName, data.introBlurb]);

  const handleTextEdit = (key) => (e) => {
    onChange({ [key]: e.currentTarget.textContent });
  };

  const reducedMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <section id="hero" className="relative w-full h-[70vh] min-h-[420px]">
      {!data.lowQuality && (
        <Spline
          scene="https://prod.spline.design/VJLoxp84lCdVfdZu/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      )}
      {data.lowQuality && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
          <div className="w-40 h-40 rounded-full bg-white/10 blur-2xl" />
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" aria-hidden="true" />
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="max-w-3xl text-center">
          <h1
            id="profileName"
            ref={nameRef}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight"
            contentEditable={editMode}
            suppressContentEditableWarning
            onInput={handleTextEdit('profileName')}
            aria-label="Profile name"
            role={editMode ? 'textbox' : undefined}
          >
            {data.profileName}
          </h1>
          <p
            id="introBlurb"
            ref={blurbRef}
            className="mt-4 text-base sm:text-lg md:text-xl text-muted-foreground"
            contentEditable={editMode}
            suppressContentEditableWarning
            onInput={handleTextEdit('introBlurb')}
            aria-label="Intro blurb"
            role={editMode ? 'textbox' : undefined}
          >
            {data.introBlurb}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a href="#projects" className="pointer-events-auto inline-flex items-center rounded-md px-4 py-2 text-sm font-medium text-white" style={{ backgroundColor: data.themeColor }}>
              View Projects
            </a>
            <a href="#contact" className="pointer-events-auto inline-flex items-center rounded-md px-4 py-2 text-sm font-medium border" style={{ borderColor: data.themeColor, color: data.themeColor }}>
              Contact
            </a>
          </div>
          {!reducedMotion && (
            <div className="mt-8 text-xs text-muted-foreground">Tip: Press E to toggle edit mode</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero3D;
