import CadenceGallery from "./components/cadence-gallery";
import AgentToolsArt from "./components/agent-tools-art";
import InventionDisclosureGallery from "./components/invention-disclosure-gallery";
import TZHProductPreview from "./components/tzh-product-preview";
import Image from "next/image";

const focusAreas = [
  ["01", "Engineering automation", "Building reliable flows that reduce manual effort and help teams move faster."],
  ["02", "AI agents", "Applying MCP, tool calling, and orchestration to practical engineering workflows."],
  ["03", "End-to-end delivery", "Taking solutions from technical scoping through build, validation, and release."],
];

const projects = [
  { number: "01", title: "TZH Sports Centre", type: "Independent full-stack platform", description: "Developed and maintained end to end: court bookings, social games, lessons, payments, revenue ledgers, memberships, vouchers, shop workflows, and admin operations.", className: "project-blue", href: "https://tzhsports.vercel.app/", visual: "product-stack" },
  { number: "02", title: "Schematic Migration Automation", type: "Intel · 2021—present", description: "Automated schematic and testbench migration for internal and external IP design teams.", className: "project-sand", image: "/images/work/schematic-migration-canvas.png", imageAlt: "Analog schematic canvas with circuit components and connections" },
  { number: "03", title: "Advanced Battery Test & Emulation", type: "Keysight · 2019—2021", description: "Software for advanced battery test and emulation, developed across UI, services, localisation, and APIs.", className: "project-red", image: "/images/work/advanced-battery-emulator.png", imageAlt: "Battery Emulator product interface showing battery status and diagnostic charts" },
  { number: "04", title: "Engineering Agents", type: "Automation · Ongoing", description: "Practical AI agents for migration, design optimisation, and release-risk analysis.", className: "project-violet", visual: "agent-tools" },
];

export default function Home() {
  return (
    <main>
      <nav className="site-nav" aria-label="Primary navigation">
        <a className="wordmark" href="#top" aria-label="Chong Zhi Hong home"><span className="wordmark-initials">ZHI HONG</span><Image className="wordmark-signature" src="/images/branding/chong-signature-modern.png" alt="" width={1672} height={941} /></a>
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
          {projects.map((project) => <article className={`project-card ${project.className}`} key={project.number}><div className="project-art">{project.visual === "product-stack" ? <TZHProductPreview /> : project.visual === "agent-tools" ? <AgentToolsArt /> : project.image && <Image src={project.image} alt={project.imageAlt ?? ""} fill sizes="(max-width: 700px) 92vw, 72rem" />}<span>{project.number}</span></div><div className="project-details"><p>{project.type}</p><h3>{project.title}</h3><p className="project-description">{project.description}</p><a href={project.href ?? "#contact"} target={project.href ? "_blank" : undefined} rel={project.href ? "noreferrer" : undefined} aria-label={`Read more about ${project.title}`}>{project.href ? "Visit platform" : "View story"} <span aria-hidden="true">↗</span></a></div></article>)}
        </div>
      </section>

      <section className="notes section" id="notes" aria-labelledby="notes-title">
        <p className="eyebrow">RECOGNITION &amp; IMPACT</p>
        <div className="notes-heading"><h2 id="notes-title">Work worth<br />{" "}talking about.</h2><a className="text-link" href="https://www.linkedin.com/in/zhi-hong-chong/" target="_blank" rel="noreferrer">View my profile <span aria-hidden="true">↗</span></a></div>
        <div className="note-list">
          <article className="cadence-highlight">
            <span>01</span>
            <p><strong>CadenceConnect speaker.</strong> Presented migration automation and field outcomes in 2024, 2025, and 2026.</p>
            <time dateTime="2024">SPEAKER</time>
            <details className="recognition-details">
              <summary>View speaker gallery <span aria-hidden="true">↓</span></summary>
              <CadenceGallery />
            </details>
          </article>
          <article>
            <span>02</span>
            <p><strong>Three invention disclosures.</strong> Two were recognised with commercialization awards at Keysight.</p>
            <time dateTime="2019">INVENTOR</time>
            <details className="recognition-details">
              <summary>View invention photos <span aria-hidden="true">↓</span></summary>
              <InventionDisclosureGallery />
            </details>
          </article>
          <article><span>03</span><p><strong>Measured workflow impact.</strong> ~80% faster schematic and testbench migration turnaround, with 100% netlistable schematics.</p><time dateTime="2021">INTEL</time></article>
        </div>
      </section>

      <section className="contact" id="contact" aria-labelledby="contact-title"><p className="eyebrow light">GET IN TOUCH</p><h2 id="contact-title">Let&apos;s make<br />{" "}<em>something useful.</em></h2><a className="button button-light" href="mailto:zhihong0924@gmail.com">zhihong0924@gmail.com <span aria-hidden="true">↗</span></a><div className="contact-links" aria-label="Other ways to get in touch"><a href="https://www.linkedin.com/in/zhi-hong-chong/" target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a><a href="tel:+60134044212">+60 13-404 4212 <span aria-hidden="true">↗</span></a></div><p className="contact-note">Available for thoughtful engineering and automation conversations.</p></section>
      <footer><span>© 2026 Chong Zhi Hong</span><a href="#top">Back to top ↑</a></footer>
    </main>
  );
}
