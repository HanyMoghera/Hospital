import { useEffect, useRef, useState } from "react";
import { hero, sections } from "./data.js";
import "./App.css";

const departments = [
  "Safety", "Quality", "Medication Management", "ICU", "ER", "NICU",
  "PICU", "HDU", "BMT", "LTX", "GW",
];

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const slugify = (value) => value.toLowerCase().replace(/\s+/g, "-");

function getRoute() {
  const route = window.location.hash.replace(/^#\/?/, "");
  return route || "methods";
}

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
        <div className="section-title-row">
          <span className="section-icon" aria-hidden>{section.icon}</span>
          <div>
            <h2 id={`heading-${section.id}`}>{section.title}</h2>
            {section.intro ? <p className="section-intro">{section.intro}</p> :
              <p className="tagline">Checklist of required documentation and bundles.</p>}
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
                  <li key={`${group.name}-${item.name}`} className="form-item"
                    style={{ animationDelay: `${(itemCounter % 12) * 35}ms` }}>
                    <span className="form-item-index">{itemCounter}</span>
                    <div className="form-item-body">
                      <strong>{item.name}</strong>
                      {item.note ? <span className="note">{item.note}</span> : null}
                    </div>
                    {item.file && (
                      <button className="form-item-action" onClick={() => onOpenFile(item.file)}
                        title="View Document" aria-label={`View ${item.name}`}>📄</button>
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

function PageIntro({ eyebrow, title, description }) {
  return (
    <div className="page-intro">
      <p className="page-eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </div>
  );
}

function EmptyState({ icon, title, message }) {
  return (
    <div className="empty-state">
      <span className="empty-state-icon" aria-hidden>{icon}</span>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

function InservicePage({ navigate }) {
  return (
    <main className="portal-page">
      <PageIntro eyebrow="Materials · Inservice" title="Inservice Departments"
        description="Choose a clinical department to explore its nursing education materials." />
      <div className="directory-grid">
        {departments.map((department) => (
          <button className="directory-card" key={department}
            onClick={() => navigate(`methods/inservice/${slugify(department)}`)}>
            <span className="directory-icon" aria-hidden>{department === "ICU" ? "✚" : "◇"}</span>
            <span><strong>{department}</strong><small>{department === "ICU" ? "Clinical guide available" : "Under preparation"}</small></span>
            <span aria-hidden>→</span>
          </button>
        ))}
      </div>
    </main>
  );
}

function MaterialsPage({ navigate }) {
  const materialSections = [
    { title: "Inservice", description: "Clinical departments and inservice education", icon: "✚", path: "methods/inservice" },
    { title: "CNE", description: "Monthly continuing nursing education topics", icon: "◫", path: "methods/cne" },
    { title: "Tests", description: "Online assessments and knowledge checks", icon: "✓", path: "tests" },
  ];

  return (
    <main className="portal-page">
      <PageIntro eyebrow="CNE Guide" title="Materials"
        description="Choose a section to explore its nursing education materials." />
      <div className="directory-grid materials-grid">
        {materialSections.map((section) => (
          <button className="directory-card" key={section.title} onClick={() => navigate(section.path)}>
            <span className="directory-icon" aria-hidden>{section.icon}</span>
            <span><strong>{section.title}</strong><small>{section.description}</small></span>
            <span aria-hidden>→</span>
          </button>
        ))}
      </div>
    </main>
  );
}

function DepartmentPage({ department, navigate }) {
  return (
    <main className="portal-page">
      <button className="back-link" onClick={() => navigate("methods/inservice")}>← All departments</button>
      <PageIntro eyebrow="Materials · Inservice" title={department} />
      <EmptyState icon="✚" title={department} message="This section is under preparation." />
    </main>
  );
}

function CnePage({ month, navigate }) {
  if (!month) {
    return (
      <main className="portal-page">
        <PageIntro eyebrow="Materials · CNE" title="Continuing Nursing Education"
          description="Select a month to view its educational topic and resources." />
        <div className="month-grid">
          {months.map((item) => <button key={item} onClick={() => navigate(`methods/cne/${slugify(item)}`)}>{item}</button>)}
        </div>
      </main>
    );
  }

  return (
    <main className="portal-page">
      <button className="back-link" onClick={() => navigate("methods/cne")}>← All months</button>
      <PageIntro eyebrow="Materials · CNE" title={month} />
      <section className="content-panel">
        <div className="content-panel-head"><span aria-hidden>◫</span><div><h2>Monthly Topic</h2><p>Educational materials for {month}</p></div></div>
        <div className="content-dropzone"><span aria-hidden>＋</span><p>Future articles, PDFs, presentations, and announcements will appear here.</p></div>
      </section>
    </main>
  );
}

function ResourcePage({ type }) {
  const isBooks = type === "books";
  const isCourses = type === "courses";
  const title = isBooks ? "Text Books" : isCourses ? "Free Courses" : "Tests";
  const description = isBooks ? "Books, PDFs, presentations, and documents for nursing education."
    : isCourses ? "Explore curated external learning opportunities."
      : "Access external online assessments and knowledge checks.";
  const emptyMessage = isBooks ? "No resources have been added yet."
    : isCourses ? "No courses have been added yet." : "No tests have been added yet.";

  return (
    <main className="portal-page">
      <PageIntro eyebrow={isBooks ? "Materials" : "CNE Guide"} title={title} description={description} />
      <div className="future-card-sample" aria-hidden="true">
        <span>{isBooks ? "▤" : isCourses ? "▶" : "✓"}</span><div><i /><i /></div><b>↗</b>
      </div>
      <EmptyState icon={isBooks ? "▤" : isCourses ? "▶" : "✓"} title={title} message={emptyMessage} />
    </main>
  );
}

function IcuPage({ navigate }) {
  const [openFile, setOpenFile] = useState(null);
  return (
    <>
      <div className="icu-toolbar"><button className="back-link" onClick={() => navigate("methods/inservice")}>← All departments</button><span>Materials · Inservice · ICU</span></div>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-media" aria-hidden><img src={hero.image} alt="" fetchPriority="high" decoding="async" /><div className="hero-overlay" /></div>
        <div className="hero-content">
          <div className="nurse-badge"><span className="nurse-badge-icon">👨‍⚕️</span>Curated by Nurse Yahia Mohamed</div>
          <p className="hero-kicker">ER → ICU → OR → Ward → Home</p>
          <h1 id="hero-title">{hero.title}</h1><p className="hero-lead">{hero.subtitle}</p>
          <div className="hero-actions"><a className="btn btn-primary" href="#nursing-er">Browse nursing forms</a><a className="btn btn-ghost" href="#discharge">Jump to discharge</a></div>
        </div>
      </section>
      <main className="sections">{sections.map((section, index) => <SectionBlock key={section.id} section={section} index={index} onOpenFile={setOpenFile} />)}</main>
      <PdfModal fileUrl={openFile} onClose={() => setOpenFile(null)} />
    </>
  );
}

function PortalHeader({ route, navigate, scrolled }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const go = (path) => { setMenuOpen(false); navigate(path); };
  return (
    <header className={`site-header portal-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="header-inner">
        <button className="brand brand-button" onClick={() => go("methods")}><span className="brand-mark" aria-hidden>✚</span><span>CNE Guide</span></button>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation"><span /><span /><span /></button>
        <nav className={`primary-nav${menuOpen ? " is-open" : ""}`} aria-label="Primary navigation">
          <button className={route.startsWith("methods") ? "is-active" : ""} onClick={() => go("methods")}>Materials</button>
          <button className={route === "free-courses" ? "is-active" : ""} onClick={() => go("free-courses")}>Free Courses</button>
          <button className={route === "tests" ? "is-active" : ""} onClick={() => go("tests")}>Tests</button>
        </nav>
      </div>
    </header>
  );
}

export default function App() {
  const [route, setRoute] = useState(getRoute);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onHashChange = () => { setRoute(getRoute()); window.scrollTo(0, 0); };
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("hashchange", onHashChange); window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener("hashchange", onHashChange); window.removeEventListener("scroll", onScroll); };
  }, []);
  const navigate = (path) => { if (getRoute() === path) { setRoute(path); window.scrollTo(0, 0); } else window.location.hash = `/${path}`; };

  let page;
  if (route === "methods") page = <MaterialsPage navigate={navigate} />;
  else if (route === "methods/inservice") page = <InservicePage navigate={navigate} />;
  else if (route === "methods/inservice/icu") page = <IcuPage navigate={navigate} />;
  else if (route.startsWith("methods/inservice/")) {
    const slug = route.split("/").at(-1); const department = departments.find((item) => slugify(item) === slug) || "Department";
    page = <DepartmentPage department={department} navigate={navigate} />;
  } else if (route === "methods/cne" || route.startsWith("methods/cne/")) {
    const slug = route.split("/")[2]; const month = months.find((item) => slugify(item) === slug);
    page = <CnePage month={month} navigate={navigate} />;
  } else if (route === "methods/text-books") page = <ResourcePage type="books" />;
  else if (route === "free-courses") page = <ResourcePage type="courses" />;
  else if (route === "tests") page = <ResourcePage type="tests" />;
  else page = <InservicePage navigate={navigate} />;

  return <div className="app"><div className="bg-mesh" aria-hidden /><div className="floating-orb floating-orb--1" aria-hidden /><div className="floating-orb floating-orb--2" aria-hidden /><PortalHeader route={route} navigate={navigate} scrolled={scrolled} />{page}</div>;
}
