import { useNavigate } from "react-router-dom";
import { wayangTypes } from "../data/wayang";
import { typeImages } from "../data/images";
import Nav from "../components/Nav";
import "./JenisWayang.css";

export default function JenisWayang() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <Nav />

      <header className="page-header animate-fade-in-up">
        <span className="badge">Learn</span>
        <h1>Types of Wayang</h1>
        <p className="page-subtitle">
          Indonesia is home to many types of wayang spread across different regions.
          Each type has its own materials, performance style, and storytelling tradition.
        </p>
      </header>

      <div className="type-grid">
        {wayangTypes.map((type, i) => (
          <button
            key={type.id}
            className={`type-card animate-fade-in-up delay-${Math.min(i + 1, 5)}`}
            onClick={() => navigate(`/jenis/${type.id}`)}
          >
            {typeImages[type.id] && (
              <img
                src={typeImages[type.id]}
                alt={type.name}
                className="type-card-img"
                loading="lazy"
              />
            )}
            <div className="type-card-top">
              <span className="type-subtitle">{type.subtitle}</span>
              <span className="type-origin">{type.origin}</span>
            </div>
            <h3 className="type-name">{type.name}</h3>
            <p className="type-desc">{type.characteristics}</p>
            <span className="type-link">Learn more &rarr;</span>
          </button>
        ))}
      </div>

      <section className="comparison-section animate-fade-in-up delay-3">
        <h2>Quick Comparison</h2>
        <div className="comparison-table-wrap">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Material</th>
                <th>Dimension</th>
                <th>Origin</th>
                <th>Primary Stories</th>
              </tr>
            </thead>
            <tbody>
              {wayangTypes.map((t) => (
                <tr key={t.id}>
                  <td className="table-name">{t.name}</td>
                  <td>{t.material}</td>
                  <td>{t.id === "wayang-kulit" || t.id === "wayang-klitik" ? "2D (flat)" : t.id === "wayang-golek" ? "3D (rod puppet)" : "Live performance"}</td>
                  <td>{t.origin}</td>
                  <td>{t.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
