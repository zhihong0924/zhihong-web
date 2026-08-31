const focusAreas = [
  ["01", "Product thinking", "Turning ambiguous ideas into useful, considered digital experiences."],
  ["02", "Digital craft", "Designing and building calm interfaces with purposeful detail."],
  ["03", "Continuous learning", "Exploring new tools, systems, and better ways to make things."],
];

const projects = [
  { number: "01", title: "The Sports Centre", type: "Platform design · 2026", className: "project-blue" },
  { number: "02", title: "A Better Routine", type: "Personal systems · 2026", className: "project-sand" },
  { number: "03", title: "Notes on Building", type: "Writing · Ongoing", className: "project-red" },
];

export default function Home() {
  return (
    <main>
      <nav className="site-nav" aria-label="Primary navigation">
        <a className="wordmark" href="#top" aria-label="Zhihong home">ZH<span>·</span>H</a>
        <div className="nav-links"><a href="#about">About</a><a href="#work">Work</a><a href="#notes">Notes</a></div>
        <a className="nav-contact" href="#contact">Let&apos;s talk <span aria-hidden="true">↗</span></a>
      </nav>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow light">PERSONAL PORTFOLIO · 2026</p>
          <h1 id="hero-title">Making room<br />{" "}for what&apos;s next.</h1>
          <p className="hero-intro">I&apos;m Zhihong — a curious builder shaping thoughtful digital experiences and the systems behind them.</p>
          <a className="button button-light" href="#about">Explore my work <span aria-hidden="true">↓</span></a>
        </div>
        <div className="hero-stamp" aria-hidden="true"><span>ZH</span><span>EST. 2026</span></div>
        <p className="hero-caption">An evolving collection of work, notes, and experiments.</p>
      </section>

      <section className="about section" id="about" aria-labelledby="about-title">
        <p className="eyebrow">ABOUT</p>
        <div className="about-grid">
          <h2 id="about-title">Building a body of work with clarity, care, and momentum.</h2>
          <div className="about-copy"><p>This is a starting point: a place to collect the projects I&apos;m proud of, the questions I&apos;m following, and the ideas that deserve a little more room.</p><a className="text-link" href="#contact">More about me <span aria-hidden="true">↗</span></a></div>
        </div>
        <div className="focus-grid">
          {focusAreas.map(([number, title, description]) => <article className="focus-card" key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}
        </div>
      </section>

      <section className="work section" id="work" aria-labelledby="work-title">
        <div className="section-heading"><div><p className="eyebrow">SELECTED WORK</p><h2 id="work-title">A few things in progress.</h2></div><p>Placeholder stories for now. The work will grow with the site.</p></div>
        <div className="projects">
          {projects.map((project) => <article className={`project-card ${project.className}`} key={project.number}><div className="project-art" aria-hidden="true"><span>{project.number}</span></div><div className="project-details"><p>{project.type}</p><h3>{project.title}</h3><a href="#contact" aria-label={`Read more about ${project.title}`}>View story <span aria-hidden="true">↗</span></a></div></article>)}
        </div>
      </section>

      <section className="notes section" id="notes" aria-labelledby="notes-title">
        <p className="eyebrow">FROM THE NOTEBOOK</p>
        <div className="notes-heading"><h2 id="notes-title">Small observations,<br />{" "}kept in motion.</h2><a className="text-link" href="#contact">Read all notes <span aria-hidden="true">↗</span></a></div>
        <div className="note-list">
          <article><span>01</span><p>On creating momentum without creating noise.</p><time dateTime="2026-01">JAN 2026</time></article>
          <article><span>02</span><p>Why the smallest useful version is often the right beginning.</p><time dateTime="2026-02">FEB 2026</time></article>
          <article><span>03</span><p>A working list of things worth returning to.</p><time dateTime="2026-03">MAR 2026</time></article>
        </div>
      </section>

      <section className="contact" id="contact" aria-labelledby="contact-title"><p className="eyebrow light">GET IN TOUCH</p><h2 id="contact-title">Let&apos;s make<br />{" "}<em>something useful.</em></h2><a className="button button-light" href="mailto:hello@example.com">hello@example.com <span aria-hidden="true">↗</span></a><p className="contact-note">Placeholder contact details — ready to be replaced.</p></section>
      <footer><span>© 2026 Zhihong</span><a href="#top">Back to top ↑</a></footer>
    </main>
  );
}
