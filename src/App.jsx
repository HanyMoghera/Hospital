import { useEffect, useRef, useState } from "react";
import { hero, sections } from "./data.js";
import "./App.css";

function PdfModal({ fileUrl, onClose }) {
  if (!fileUrl) return null;
  return (
    <div className="pdf-modal-overlay" onClick={onClose}>
      <div className="pdf-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="pdf-modal-close" onClick={onClose} aria-label="Close modal">
          &times;
        </button>
        <iframe src={fileUrl} className="pdf-iframe" title="PDF Viewer" />
      </div>
    </div>
  );
}

function SectionBlock({ section, index, onOpenFile }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  let itemCounter = 0;

  return (
    <section
      ref={ref}
      id={section.id}
      className={`section-block reveal${visible ? " is-visible" : ""}`}
      style={{ transitionDelay: `${Math.min(index * 40, 200)}ms` }}
      aria-labelledby={`heading-${section.id}`}
    >
      <div className="section-head">
        <div>
          <div className="section-title-row">
            <span className="section-icon" aria-hidden>
              {section.icon}
            </span>
            <div>
              <h2 id={`heading-${section.id}`}>{section.title}</h2>
              {section.intro ? (
                <p className="section-intro">{section.intro}</p>
              ) : (
                <p className="tagline">Checklist of required documentation and bundles.</p>
              )}
            </div>
          </div>
        </div>
        <div className="section-visual">
          <img src={section.image} alt="" loading="lazy" decoding="async" />
        </div>
      </div>

      <div className="card-grid">
        {section.groups.map((group) => (
          <article key={group.name} className="group-card">
            <h3>{group.name}</h3>
            <ul className="form-list">
              {group.items.map((item) => {
                itemCounter += 1;
                return (
                  <li
                    key={`${group.name}-${item.name}`}
                    className="form-item"
                    style={{ animationDelay: `${(itemCounter % 12) * 35}ms` }}
                  >
                    <span className="form-item-index">{itemCounter}</span>
                    <div className="form-item-body">
                      <strong>{item.name}</strong>
                      {item.note ? <span className="note">{item.note}</span> : null}
                    </div>
                    {item.file && (
                      <button 
                        className="form-item-action" 
                        onClick={() => onOpenFile(item.file)}
                        title="View Document"
                        aria-label={`View ${item.name}`}
                      >
                        📄
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [openFile, setOpenFile] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="app">
      <div className="bg-mesh" aria-hidden />
      <div className="floating-orb floating-orb--1" aria-hidden />
      <div className="floating-orb floating-orb--2" aria-hidden />

      <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
        <div className="header-inner">
          <div className="brand">
            <span className="brand-mark" aria-hidden>
              ✚
            </span>
            <span>Forms Clinical Guide</span>
          </div>
          <nav className="nav-scroll" aria-label="Section navigation">
            {sections.map((s) => (
              <a key={s.id} className="nav-link" href={`#${s.id}`}>
                {s.title}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-media" aria-hidden>
          <img src={hero.image} alt="" fetchPriority="high" decoding="async" />
          <div className="hero-overlay" />
        </div>
        <div className="hero-content">
          <div className="nurse-badge">
            <span className="nurse-badge-icon">👨‍⚕️</span>
            Curated by Nurse Yahia Mohamed
          </div>
          <p className="hero-kicker">ER → ICU → OR → Ward → Home</p>
          <h1 id="hero-title">{hero.title}</h1>
          <p className="hero-lead">{hero.subtitle}</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#nursing-er">
              Browse nursing forms
            </a>
            <a className="btn btn-ghost" href="#discharge">
              Jump to discharge
            </a>
          </div>
        </div>
      </section>

      <main className="sections">
        {sections.map((section, index) => (
          <SectionBlock key={section.id} section={section} index={index} onOpenFile={setOpenFile} />
        ))}
      </main>
      <PdfModal fileUrl={openFile} onClose={() => setOpenFile(null)} />
    </div>
  );
}
