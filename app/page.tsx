const focusAreas = [
  ["01", "Engineering automation", "Building reliable flows that reduce manual effort and help teams move faster."],
  ["02", "AI agents", "Applying MCP, tool calling, and orchestration to practical engineering workflows."],
  ["03", "End-to-end delivery", "Taking solutions from technical scoping through build, validation, and release."],
];

const projects = [
  { number: "01", title: "Schematic Migration Automation", type: "Intel · 2021—present", className: "project-blue" },
  { number: "02", title: "Advanced Battery Test & Emulation", type: "Keysight · 2019—2021", className: "project-sand" },
  { number: "03", title: "Engineering Agents", type: "Automation · Ongoing", className: "project-red" },
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
          <p className="eyebrow light">CHONG ZHI HONG · SOFTWARE ENGINEER</p>
          <h1 id="hero-title">Engineering better<br />{" "}ways to build.</h1>
          <p className="hero-intro">I&apos;m Zhihong, a software engineer building automation and AI-powered tools that help engineering teams do their best work.</p>
          <a className="button button-light" href="#about">Explore my work <span aria-hidden="true">↓</span></a>
        </div>
        <div className="hero-stamp" aria-hidden="true"><span>ZH</span><span>EST. 2026</span></div>
        <p className="hero-caption">Automation, engineering systems, and practical AI agents.</p>
      </section>

      <section className="about section" id="about" aria-labelledby="about-title">
        <p className="eyebrow">ABOUT</p>
        <div className="about-grid">
          <h2 id="about-title">Building tools that give engineering teams room to move faster.</h2>
          <div className="about-copy"><p>With 6+ years in software engineering, I turn complex customer workflows into automation that is reliable, reusable, and ready for production—from technical scoping through release.</p><a className="text-link" href="https://www.linkedin.com/in/zhi-hong-chong/" target="_blank" rel="noreferrer">Connect on LinkedIn <span aria-hidden="true">↗</span></a></div>
        </div>
        <div className="focus-grid">
          {focusAreas.map(([number, title, description]) => <article className="focus-card" key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}
        </div>
      </section>

      <section className="work section" id="work" aria-labelledby="work-title">
        <div className="section-heading"><div><p className="eyebrow">SELECTED WORK</p><h2 id="work-title">Systems built for real engineering work.</h2></div><p>Selected work across EDA automation, test software, and AI-enabled workflows.</p></div>
        <div className="projects">
          {projects.map((project) => <article className={`project-card ${project.className}`} key={project.number}><div className="project-art" aria-hidden="true"><span>{project.number}</span></div><div className="project-details"><p>{project.type}</p><h3>{project.title}</h3><a href="#contact" aria-label={`Read more about ${project.title}`}>View story <span aria-hidden="true">↗</span></a></div></article>)}
        </div>
      </section>

      <section className="notes section" id="notes" aria-labelledby="notes-title">
        <p className="eyebrow">SELECTED HIGHLIGHTS</p>
        <div className="notes-heading"><h2 id="notes-title">Results that<br />{" "}keep compounding.</h2><a className="text-link" href="https://www.linkedin.com/in/zhi-hong-chong/" target="_blank" rel="noreferrer">View my profile <span aria-hidden="true">↗</span></a></div>
        <div className="note-list">
          <article><span>01</span><p>~80% faster schematic and testbench migration turnaround, with 100% netlistable schematics.</p><time dateTime="2021">INTEL</time></article>
          <article><span>02</span><p>Presented migration automation and field outcomes at CadenceConnect 2024, 2025, and 2026.</p><time dateTime="2024">EDA</time></article>
          <article><span>03</span><p>Three invention disclosures, including two recognised with commercialization awards.</p><time dateTime="2019">KEYSIGHT</time></article>
        </div>
      </section>

      <section className="contact" id="contact" aria-labelledby="contact-title"><p className="eyebrow light">GET IN TOUCH</p><h2 id="contact-title">Let&apos;s make<br />{" "}<em>something useful.</em></h2><a className="button button-light" href="mailto:zhihong0924@gmail.com">zhihong0924@gmail.com <span aria-hidden="true">↗</span></a><p className="contact-note">Available for thoughtful engineering and automation conversations.</p></section>
      <footer><span>© 2026 Chong Zhi Hong</span><a href="#top">Back to top ↑</a></footer>
    </main>
  );
}
