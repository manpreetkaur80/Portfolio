import { useEffect, useRef, useState } from "react";
import "./App.css";

/* ---------- Content: edit this part to update the site ---------- */
const EMAIL = "kaurm08525@gmail.com";
// Paste your profile links between the quotes. Each link only shows once it is filled in.
const GITHUB_URL = "https://github.com/manpreetkaur80";
const LINKEDIN_URL = "https://www.linkedin.com/in/manpreet-kaur-sandhu-bb8b58375/";
const PHONE_LABEL = "+91 70167 66377";
const PHONE_LINK = "tel:+917016766377";

const projects = [
  { title: "Shree Ganesh Motors", bg: "linear-gradient(135deg,#1c2f78,#d9772b)", cols: 3, tiles: 6,
    text: "A MERN app for a local automobile business to manage vehicle listings, customer inquiries and sell requests, with JWT login and an admin dashboard.",
    stack: "React, Node.js, Express, MongoDB Atlas, Cloudinary", image: "/shots/ganesh-motors.webp", github: "https://github.com/manpreetkaur80/shree-ganesh-motors", demo: "https://shree-ganesh-motors.vercel.app/" },
  { title: "Growth Within", bg: "linear-gradient(135deg,#3b1d7a,#16a58a)", cols: 2, tiles: 4,
    text: "A personal growth platform for journaling, habits, goals, planning and a vision board powered by the Unsplash API, with password reset by email.",
    stack: "React, Node.js, Express, MongoDB, JWT, Nodemailer", image: "/shots/growth-within.webp", github: "https://github.com/manpreetkaur80/Growth-within", demo: "https://growth-within-frontend.onrender.com/" },
  { title: "DigiPratibha", bg: "linear-gradient(135deg,#0f3b57,#6d28d9)", cols: 4, tiles: 8,
    text: "A hackathon project: a portfolio builder where people create and manage professional portfolios, backed by a Node.js server.",
    stack: "HTML, CSS, JavaScript, Node.js, Express.js", image: "/shots/digipratibha.webp", github: "https://github.com/manpreetkaur80/digipratibha---a-no-code-portfolio-builder-", demo: "" },
];

const toolRows = [
  [["Re", "React"], ["Nd", "Node.js"], ["Ex", "Express"], ["Mo", "MongoDB"], ["Ms", "Mongoose"], ["JW", "JWT"], ["Cl", "Cloudinary"], ["Nm", "Nodemailer"]],
  [["JS", "JavaScript"], ["Py", "Python"], ["Jv", "Java"], ["C+", "C and C++"], ["Gi", "Git"], ["GH", "GitHub"], ["Pm", "Postman"], ["At", "MongoDB Atlas"]],
];

const experience = [
  { title: "Societal Intern, Udayan Care", when: "2026, Udayan Shalini Fellowship", text: "Four-member team running scholarship and career-awareness outreach: 12 sessions, 20 schools, 462 girls and 11 home visits." },
  { title: "Orientation speaker", when: "2025 and 2026", text: "Guided 200+ students with college advice." },
  { title: "College Food Fest coordinator", when: "2025", text: "Led planning and team coordination for 300+ attendees and 20+ teams." },
];

const hackathons = [
  ["Bit N Build’26, Gujarat Round", "19 Sep 2026"],
  ["Odoo × Parul University (virtual)", "10 May 2026"],
  ["TechSprint, GDGoC LDCE", "20 Jan 2026"],
  ["hackhertz 2025, SSIT College", "Nov 2025"],
  ["RotaHack 2025", "25–27 Jul 2025"],
  ["Smart India Hackathon", "2025"],
];

const certificates = [
  ["C-DAC, Diploma in Computer Languages", "2024–25"],
  ["IBM SkillsBuild, AI Agent Architect", "Jul 2025"],
  ["Python for Data Science bootcamp", "Jul 2025"],
  ["Deloitte / Forage job simulations", "Jul 2025"],
];

// Mini projects shown in the swipe deck. All of them live in one GitHub repository.
const MINI_REPO = "https://github.com/manpreetkaur80/React-project";
const miniProjects = [
  { title: "Weather app", text: "Search a city to see its temperature, humidity, wind, visibility and sunrise and sunset times.", tag: "React", bg: "#3f534a", image: "/shots/weather-app.png", github: MINI_REPO, live: "", fit: "contain" },
  { title: "To-do list", text: "Add tasks, mark them as completed and delete them.", tag: "React", bg: "linear-gradient(160deg,#c2185b,#f48fb1)", image: "/shots/todo-list.webp", github: MINI_REPO, live: "" },
  { title: "Quiz app", text: "A multiple-choice React quiz with a Next button.", tag: "React", bg: "linear-gradient(160deg,#1c3f94,#6aa6f5)", image: "/shots/quiz-app.webp", github: MINI_REPO, live: "" },
  { title: "Users manager", text: "Add, edit and delete users in a list.", tag: "React", bg: "linear-gradient(160deg,#2e7d32,#a5d6a7)", image: "/shots/users-app.webp", github: MINI_REPO, live: "" },
  { title: "Login form", text: "A login form that checks the input, for example it asks for at least 8 characters.", tag: "React", bg: "linear-gradient(160deg,#8e3b53,#f3c4c4)", image: "/shots/login-form.webp", github: MINI_REPO, live: "" },
];

// Hero: words that rotate in "I ___ real web apps" and captions for the project preview
const heroWords = ["build", "debug", "design", "ship"];
const heroCaptions = [
  "Vehicle listings, inquiries and sell requests with an admin dashboard.",
  "Journaling, habits, goals and a vision board in one place.",
  "A portfolio builder where people create and manage their own portfolios."
];

const languages = ["English", "Hindi", "Gujarati", "Punjabi"];

const navLinks = [["Home", "#home"], ["About", "#about"], ["Work", "#work"], ["Skills", "#skills"], ["Contact", "#contact"]];

/* ---------- Helpers ---------- */
const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Fades an element in (blur to sharp) the first time it scrolls into view.
function Reveal({ as: Tag = "div", className = "", children, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in");
          if (el.classList.contains("fan")) setTimeout(() => el.classList.add("settled"), 1500);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={`rv ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}

/* ---------- Sections ---------- */
function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className={open ? "open" : ""} aria-label="Main">
      <a className="logo" href="#home">Manpreet Kaur</a>
      <div className="links">
        {navLinks.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
        ))}
      </div>
      <a className="ib" href={`mailto:${EMAIL}`} aria-label="Email me">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
      </a>
      <button className="ib" id="menu" type="button" aria-label="Open menu" onClick={() => setOpen((o) => !o)}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
      </button>
    </nav>
  );
}

function Hero() {
  const ref = useRef(null);
  const pv = useRef(null);
  const frame = useRef(0);
  const [slide, setSlide] = useState(0);
  const [wi, setWi] = useState(0);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const a = setInterval(() => setSlide((s) => (s + 1) % 3), 3200);
    const b = setInterval(() => setWi((w) => (w + 1) % heroWords.length), 2200);
    return () => { clearInterval(a); clearInterval(b); };
  }, []);
  const onMove = (e) => {
    if (prefersReducedMotion() || frame.current) return;
    const mx = (e.clientX / window.innerWidth - 0.5).toFixed(2);
    const my = (e.clientY / window.innerHeight - 0.5).toFixed(2);
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      if (pv.current) { pv.current.style.setProperty("--mx", mx); pv.current.style.setProperty("--my", my); }
    });
  };
  return (
    <header className="hero" id="home" ref={ref} onPointerMove={onMove}>
      <h1><span>Manpreet</span> <span>Kaur</span> <span>Sandhu</span></h1>
      <p className="tag">I <span className="rot"><b key={wi}>{heroWords[wi]}</b></span> real web apps, from database to screen.</p>
      <div>
        <a className="pill on" href="#contact">Contact</a>
        <a className="pill" href="#work">View Work</a>
      </div>
      <div className="pv" ref={pv} aria-hidden="true">
        <div className="tb"><i /><i /><i /><span>{projects[slide].title}</span></div>
        <div className="st">
          {projects.slice(0, 3).map((p, i) => (
            <div key={p.title} className={"sl" + (i === slide ? " on" : "")} style={{ "--g": p.bg, "--c": p.cols }}>
              {p.image ? <img src={p.image} alt="" /> : <><b />{Array.from({ length: p.tiles }, (_, k) => <i key={k} />)}</>}
            </div>
          ))}
        </div>
        <p>{heroCaptions[slide]}</p>
      </div>
      <p className="note">MERN developer and computer engineering student who ships complete apps with React, Node and MongoDB.</p>
    </header>
  );
}

function About() {
  return (
    <section id="about">
      <div className="w">
        <p className="eyebrow">ABOUT</p>
        <h2>My journey</h2>
        <div className="about">
          <Reveal className="mono" aria-hidden="true">
            MK
            <small><b>CPI 9.61</b><b>6 hackathons</b><b>20+ projects</b></small>
          </Reveal>
          <div>
            <Reveal as="p">I’m a B.E. Computer Science Engineering student at New L J Institute of Engineering and Technology, with a CPI of 9.61 out of 10.</Reveal>
            <Reveal as="p">I work across the MERN stack, from React screens to Express APIs and MongoDB data, and I practise data structures and algorithms to sharpen how I solve problems.</Reveal>
            <Reveal as="p">Beyond code, I worked with Udayan Care on school outreach that reached 462 girls across 20 schools, and I’ve spoken to 200+ students at college orientations.</Reveal>
            <Reveal as="p">Now I’m looking for an internship where I can build real features with a team.</Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

// Vertical scroll drives a horizontal slide of the project cards.
function Work() {
  const hsRef = useRef(null);
  const trackRef = useRef(null);
  const fillRef = useRef(null);

  useEffect(() => {
    const hs = hsRef.current, track = trackRef.current, fill = fillRef.current;
    if (prefersReducedMotion()) { hs.classList.add("free"); return; }
    let dist = 0;
    const size = () => {
      dist = Math.max(track.offsetWidth - window.innerWidth, 0);
      hs.style.height = track.parentElement.offsetHeight + dist + "px";
    };
    const update = () => {
      const p = Math.min(Math.max(-hs.getBoundingClientRect().top / Math.max(hs.offsetHeight - track.parentElement.offsetHeight, 1), 0), 1);
      track.style.transform = `translateX(${-p * dist}px)`;
      fill.style.width = p * 100 + "%";
    };
    let lw = window.innerWidth;
    const onLoad = () => { size(); update(); };
    const onResize = () => { if (window.innerWidth !== lw) { lw = window.innerWidth; size(); } update(); };
    size(); update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("load", onLoad);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  return (
    <div className="hs" id="work" ref={hsRef}>
      <div className="pin">
        <div className="w">
          <p className="eyebrow">WORK</p>
          <h2>Projects I’ve built</h2>
        </div>
        <div className="track" ref={trackRef}>
          {projects.map((p, i) => (
            <article className="card" key={p.title}>
              <div className="shot" style={{ background: p.bg, "--c": p.cols }}>
                {p.image ? <img src={p.image} alt={`${p.title} screenshot`} /> : <><b />{Array.from({ length: p.tiles }, (_, k) => <i key={k} />)}</>}
                <span className="badge">0{i + 1} / 0{projects.length}</span>
              </div>
              <div className="meta">
                <h3>{p.title}</h3>
                <p>{p.text}</p>
                <p className="st">{p.stack}</p>
                {(p.github || p.demo) && (
                  <div className="ml">
                    {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer">GitHub</a>}
                    {p.demo && <a href={p.demo} target="_blank" rel="noopener noreferrer">Live Demo</a>}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
        <div className="bar"><i ref={fillRef} /></div>
      </div>
    </div>
  );
}

// Two auto-sliding rows; each list is doubled so the loop is seamless.
function Skills() {
  return (
    <section id="skills">
      <div className="w">
        <p className="eyebrow">BUILT WITH</p>
        <h2>Tools I work with</h2>
        <p className="sub">The languages, frameworks and tools behind my projects.</p>
      </div>
      <div className="mq">
        {toolRows.map((row, i) => (
          <div className={`mr${i ? " rev" : ""}`} key={i}>
            {[...row, ...row].map(([code, name], k) => (
              <div className="t" key={k}><b>{code}</b>{name}</div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function More() {
  const List = ({ items }) => (
    <ul className="rows">
      {items.map(([name, when]) => (
        <Reveal as="li" key={name}><b>{name}</b><span>{when}</span></Reveal>
      ))}
    </ul>
  );
  return (
    <section>
      <div className="w">
        <div className="cols">
          <div>
            <h3>Experience and leadership</h3>
            <ul className="tl">
              {experience.map((e) => (
                <Reveal as="li" key={e.title}>
                  <h4>{e.title}</h4><span>{e.when}</span><p>{e.text}</p>
                </Reveal>
              ))}
            </ul>
          </div>
          <div>
            <h3>Hackathons</h3>
            <List items={hackathons} />
            <h3 style={{ marginTop: "2.2rem" }}>Certificates</h3>
            <List items={certificates} />
          </div>
        </div>
      </div>
    </section>
  );
}

// Swipe deck: drag the top card away (or use the buttons) to reveal the next one.
function Mini() {
  const n = miniProjects.length;
  const [order, setOrder] = useState(() => miniProjects.map((_, i) => i));
  const cards = useRef([]);
  const deck = useRef(null);
  const drag = useRef(null);
  const busy = useRef(false);
  const [hint, setHint] = useState("");
  const slot = (pos) => { const s = Math.min(pos, 2); return `translateY(${-s * 14}px) scale(${1 - s * 0.05})`; };

  // Keep the deck as tall as its tallest card so the buttons sit right under it.
  useEffect(() => {
    const fit = () => {
      let m = 0;
      cards.current.forEach((c) => { if (c) m = Math.max(m, c.offsetHeight); });
      if (deck.current) deck.current.style.height = m + "px";
    };
    fit();
    window.addEventListener("resize", fit);
    window.addEventListener("load", fit);
    if (document.fonts) document.fonts.ready.then(fit);
    return () => { window.removeEventListener("resize", fit); window.removeEventListener("load", fit); };
  }, []);

  const next = (dir = 1) => {
    if (busy.current) return;
    busy.current = true;
    const el = cards.current[order[0]];
    el.classList.remove("drag");
    el.style.transform = `translateX(${dir * 130}%) rotate(${dir * 14}deg)`;
    el.classList.add("gone");
    setTimeout(() => { setOrder((o) => [...o.slice(1), o[0]]); setHint(""); busy.current = false; }, prefersReducedMotion() ? 0 : 300);
  };
  const prev = () => { if (!busy.current) { setHint(""); setOrder((o) => [o[o.length - 1], ...o.slice(0, -1)]); } };

  const down = (e) => {
    if (busy.current || (e.target.closest && e.target.closest("a,button"))) return;
    const el = cards.current[order[0]];
    drag.current = { x: e.clientX, el, dx: 0 };
    el.classList.add("drag");
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const move = (e) => {
    const d = drag.current;
    if (!d) return;
    d.dx = e.clientX - d.x;
    d.el.style.transform = `translateX(${d.dx}px) rotate(${d.dx / 18}deg)`;
  };
  const end = () => {
    const d = drag.current;
    if (!d) return;
    drag.current = null;
    d.el.classList.remove("drag");
    if (Math.abs(d.dx) > 80) next(d.dx > 0 ? 1 : -1);
    else { d.el.style.transform = slot(0); if (Math.abs(d.dx) < 6) tap(); }
  };
  const tap = () => {
    const p = miniProjects[order[0]];
    const url = p.live || p.github;
    if (url) window.open(url, "_blank", "noopener");
    else setHint(`No link added for ${p.title} yet.`);
  };
  const key = (e) => { if (e.key === "ArrowRight") next(1); if (e.key === "ArrowLeft") prev(); };

  return (
    <section id="playground">
      <div className="w">
        <p className="eyebrow">PRACTICE</p>
        <h2>Mini projects</h2>
        <p className="sub">Small builds where I practised one idea at a time. Swipe the top card away, or use the buttons.</p>
      </div>
      <div className="dkw" ref={deck} tabIndex={0} aria-label="Mini projects deck" onKeyDown={key}
        onPointerDown={down} onPointerMove={move} onPointerUp={end} onPointerCancel={end}>
        {miniProjects.map((p, i) => {
          const pos = order.indexOf(i);
          return (
            <article key={p.title} ref={(el) => (cards.current[i] = el)} className={"dc" + (pos === 0 ? " top" : "")}
              inert={pos !== 0 ? "" : undefined}
              style={{ zIndex: n - pos, opacity: pos > 2 ? 0 : 1, transform: slot(pos) }}>
              <div className="ms" style={{ background: p.bg }}>
                {p.image ? <img src={p.image} alt={`${p.title} screenshot`} style={p.fit ? { objectFit: p.fit, objectPosition: "center" } : undefined} /> : <><b />{Array.from({ length: 6 }, (_, k) => <i key={k} />)}</>}
                <span className="badge">0{i + 1} / 0{n}</span>
              </div>
              <div className="mi">
                <div><h3>{p.title}</h3><p>{p.tag}</p><p className="tx">{p.text}</p></div>
                <div className="ml">
                  {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer">GitHub</a>}
                  {p.live && <a href={p.live} target="_blank" rel="noopener noreferrer">Live {"\u2197"}</a>}
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <div className="dctl">
        <button type="button" aria-label="Previous project" onClick={prev}>{"\u2190"}</button>
        <span>0{order[0] + 1} / 0{n}</span>
        <button type="button" aria-label="Next project" onClick={() => next(1)}>{"\u2192"}</button>
      </div>
      <p className="sub" aria-live="polite" style={{ minHeight: "1.7em", marginTop: ".6rem" }}>{hint}</p>
    </section>
  );
}

// Custom cursor: a white four-point star (dark outline, so it shows on any background) that glows while you scroll.
// Over links, buttons and the swipe deck it hides and the normal cursor shows, so aiming is easy.
function Cursor() {
  const cs = useRef(null);
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    document.documentElement.classList.add("cc");
    let cx = -100, cy = -100, target = null, raf = 0, dirty = false, timer;
    const frame = () => {
      raf = 0;
      if (dirty) { target = document.elementFromPoint(cx, cy); dirty = false; }
      const el = cs.current;
      if (!el) return;
      el.style.transform = `translate3d(${cx}px,${cy}px,0)`;
      el.classList.toggle("off", !!(target && target.closest && target.closest("a,button,.dkw")));
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(frame); };
    const move = (e) => { cx = e.clientX; cy = e.clientY; target = e.target; schedule(); };
    const scroll = () => {
      cs.current.classList.add("glow");
      clearTimeout(timer);
      timer = setTimeout(() => cs.current && cs.current.classList.remove("glow"), 700);
      dirty = true; schedule();
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", scroll);
      clearTimeout(timer); cancelAnimationFrame(raf);
      document.documentElement.classList.remove("cc");
    };
  }, []);
  return (
    <div className="cs" ref={cs} style={{ transform: "translate3d(-100px,-100px,0)" }} aria-hidden="true">
      <svg viewBox="0 0 24 24"><path d="M12 0C12.7 7.2 16.8 11.3 24 12 16.8 12.7 12.7 16.8 12 24 11.3 16.8 7.2 12.7 0 12 7.2 11.3 11.3 7.2 12 0Z" /></svg>
    </div>
  );
}

function Contact() {
  return (
    <section id="contact" className="ct">
      <div className="w">
        <p className="eyebrow">CONTACT</p>
        <h2>Let’s build something together</h2>
        <p className="sub">I’m open to internships. Write or call me.</p>
        <a href={`mailto:${EMAIL}`}>Email</a>
        <a href={PHONE_LINK}>Phone</a>
        {GITHUB_URL && <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">GitHub</a>}
        {LINKEDIN_URL && <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
      </div>
    </section>
  );
}

export default function App() {
  return (
    <>
      <Cursor />
      <Nav />
      <Hero />
      <About />
      <Work />
      <Skills />
      <More />
      <Mini />
      <Contact />
      <footer>
        <div className="w">
          <div className="lg">
            <span>Languages</span>
            <ul>{languages.map((l) => <li key={l}>{l}</li>)}</ul>
          </div>
          <p>© 2026 Manpreet Kaur Sandhu</p>
        </div>
      </footer>
    </>
  );
}
