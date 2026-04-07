import { useNavigate } from "react-router-dom";
import puppetHero from "../assets/puppet-hero.jpg";
import "./Landing.css";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <nav className="landing-nav">
        <span className="nav-logo">Wayang</span>
        <div className="nav-links">
          <button onClick={() => navigate("/jenis")}>Types</button>
          <button onClick={() => navigate("/timeline")}>Timeline</button>
          <button onClick={() => navigate("/glossary")}>Glossary</button>
          <button onClick={() => navigate("/quiz")}>Quiz</button>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <p className="hero-label animate-fade-in">Indonesian Cultural Heritage</p>
          <h1 className="hero-title animate-fade-in-up delay-1">
            The Art of<br />
            <span className="hero-accent">Wayang</span>
          </h1>
          <p className="hero-desc animate-fade-in-up delay-2">
            Wayang is Indonesia's ancient art of puppet theater, recognized by
            UNESCO as a Masterpiece of Oral and Intangible Heritage of Humanity.
            Explore the types, characters, and stories that have been told for
            over a thousand years.
          </p>
          <div className="hero-actions animate-fade-in-up delay-3">
            <button className="btn-primary" onClick={() => navigate("/jenis")}>
              Explore Wayang Types
            </button>
            <button className="btn-secondary" onClick={() => navigate("/timeline")}>
              View Timeline
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <img src={puppetHero} alt="Wayang Kulit puppet" className="hero-img animate-fade-in delay-2" />
        </div>
      </section>

      <section className="stats animate-fade-in-up delay-3">
        <div className="stat">
          <span className="stat-value">1000+</span>
          <span className="stat-label">Years of history</span>
        </div>
        <div className="stat-sep" />
        <div className="stat">
          <span className="stat-value">4</span>
          <span className="stat-label">Major types</span>
        </div>
        <div className="stat-sep" />
        <div className="stat">
          <span className="stat-value">2003</span>
          <span className="stat-label">UNESCO recognition</span>
        </div>
        <div className="stat-sep" />
        <div className="stat">
          <span className="stat-value">100+</span>
          <span className="stat-label">Characters per performance</span>
        </div>
      </section>

      <section className="intro-cards">
        <div className="intro-card animate-fade-in-up delay-3">
          <h3>The Dalang</h3>
          <p>
            A single puppeteer who serves as director, narrator, and voice actor
            for all characters. A skilled dalang performs for 8 hours straight,
            controlling over 100 puppets — all without a script.
          </p>
        </div>
        <div className="intro-card animate-fade-in-up delay-4">
          <h3>Gamelan Orchestra</h3>
          <p>
            Every performance is accompanied by gamelan, a traditional ensemble
            of gongs, metallophones, and drums. The music sets the mood from
            romance to battle, and is itself a UNESCO-recognized heritage.
          </p>
        </div>
        <div className="intro-card animate-fade-in-up delay-5">
          <h3>Epic Stories</h3>
          <p>
            Most wayang stories come from two Indian Hindu epics — the Mahabharata
            and Ramayana — adapted with Javanese philosophy and local wisdom over
            centuries of oral tradition.
          </p>
        </div>
      </section>

      <footer className="landing-footer">
        <p>
          Additional images from <a href="https://commons.wikimedia.org/wiki/Category:Wayang" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a> under Creative Commons licenses.
        </p>
      </footer>
    </div>
  );
}
