import { useState } from "react";
import Nav from "../components/Nav";
import { characterImages } from "../data/images";
import { symbolismHotspots } from "../data/symbolism";
import "./SymbolismExplorer.css";

export default function SymbolismExplorer() {
  const [activeId, setActiveId] = useState(symbolismHotspots[0].id);
  const [discovered, setDiscovered] = useState([symbolismHotspots[0].id]);
  const active = symbolismHotspots.find((item) => item.id === activeId);

  const reveal = (id) => {
    setActiveId(id);
    setDiscovered((items) => (items.includes(id) ? items : [...items, id]));
  };

  return (
    <div className="page-container symbolism-page">
      <Nav />
      <header className="page-header animate-fade-in-up">
        <span className="badge">Visual Language</span>
        <h1>Puppet Symbolism Explorer</h1>
        <p className="page-subtitle">
          Wayang characters speak before they move. Discover how posture, eyes,
          ornaments, and silhouette reveal personality.
        </p>
      </header>

      <section className="symbolism-shell animate-fade-in-up delay-1">
        <div className="symbolism-visual">
          <div className="symbolism-lamp" />
          <div className="symbolism-image-stage">
            <img src={characterImages.arjuna} alt="Traditional Arjuna wayang puppet" />
            {symbolismHotspots.map((item, index) => (
              <button
                key={item.id}
                className={`symbol-hotspot ${activeId === item.id ? "active" : ""} ${discovered.includes(item.id) ? "discovered" : ""}`}
                style={{ left: `${item.x}%`, top: `${item.y}%`, "--hotspot-delay": `${index * 0.12}s` }}
                onClick={() => reveal(item.id)}
                aria-label={`Explore ${item.label}`}
              >
                <span>{index + 1}</span>
              </button>
            ))}
          </div>
          <div className="symbolism-caption">Arjuna · The refined knight</div>
        </div>

        <div className="symbolism-content">
          <div className="discovery-meter">
            <div>
              <span>Symbols discovered</span>
              <strong>{discovered.length} / {symbolismHotspots.length}</strong>
            </div>
            <div className="discovery-track">
              <span style={{ width: `${(discovered.length / symbolismHotspots.length) * 100}%` }} />
            </div>
          </div>

          <article className="symbolism-card" key={active.id}>
            <span className="panel-kicker">{active.label}</span>
            <h2>{active.title}</h2>
            <p>{active.description}</p>
            <div className="symbolism-prompt">{active.prompt}</div>
          </article>

          <div className="symbol-list">
            {symbolismHotspots.map((item) => (
              <button
                key={item.id}
                className={activeId === item.id ? "active" : ""}
                onClick={() => reveal(item.id)}
              >
                <span>{discovered.includes(item.id) ? "Discovered" : "Hidden meaning"}</span>
                <strong>{item.label}</strong>
              </button>
            ))}
          </div>

          {discovered.length === symbolismHotspots.length && (
            <div className="symbolism-complete">
              <span>New insight unlocked</span>
              <strong>You can now read a puppet's visual language.</strong>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
