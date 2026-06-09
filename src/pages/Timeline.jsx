import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import { timelineCategories, timelineEras, timelineEvents } from "../data/timeline";
import "./Timeline.css";

export default function Timeline() {
  const navigate = useNavigate();
  const [activeEra, setActiveEra] = useState("all");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedId, setSelectedId] = useState(timelineEvents[0].id);

  const events = useMemo(
    () => timelineEvents.filter((event) =>
      (activeEra === "all" || event.era === activeEra) &&
      (activeCategory === "All" || event.category === activeCategory)
    ),
    [activeCategory, activeEra]
  );
  const selectedEvent = events.find((event) => event.id === selectedId) || events[0];

  const changeFilter = (era, category) => {
    setActiveEra(era);
    setActiveCategory(category);
    const firstMatch = timelineEvents.find((event) =>
      (era === "all" || event.era === era) &&
      (category === "All" || event.category === category)
    );
    if (firstMatch) setSelectedId(firstMatch.id);
  };

  return (
    <div className="page-container timeline-page">
      <Nav />
      <header className="page-header">
        <span className="badge">History</span>
        <h1>Timeline of Wayang</h1>
        <p className="page-subtitle">Follow how wayang changes across belief systems, courts, regions, and modern stages while remaining a living tradition.</p>
      </header>

      <section className="era-strip" aria-label="Filter by historical era">
        <button className={activeEra === "all" ? "active" : ""} onClick={() => changeFilter("all", activeCategory)}>
          <span>Full story</span><strong>All eras</strong>
        </button>
        {timelineEras.map((era) => (
          <button key={era.id} className={activeEra === era.id ? "active" : ""} onClick={() => changeFilter(era.id, activeCategory)}>
            <span>{era.range}</span><strong>{era.label}</strong>
          </button>
        ))}
      </section>

      {activeEra !== "all" && <p className="era-summary">{timelineEras.find((era) => era.id === activeEra)?.summary}</p>}

      <div className="timeline-filters" aria-label="Filter by theme">
        {timelineCategories.map((category) => (
          <button key={category} className={activeCategory === category ? "active" : ""} onClick={() => changeFilter(activeEra, category)}>{category}</button>
        ))}
      </div>

      <section className="timeline-explorer">
        <div className="timeline">
          {events.map((event, index) => (
            <button className={`tl-item ${selectedEvent?.id === event.id ? "active" : ""}`} key={event.id} onClick={() => setSelectedId(event.id)}>
              <span className="tl-marker"><span className="tl-dot" />{index < events.length - 1 && <span className="tl-line" />}</span>
              <span className="tl-content">
                <span className="tl-year">{event.year}</span>
                <strong className="tl-title">{event.title}</strong>
                <span className="tl-meta">{event.region} · {event.category}</span>
              </span>
            </button>
          ))}
          {events.length === 0 && <p className="timeline-empty">No events match these filters.</p>}
        </div>

        {selectedEvent && (
          <article className="timeline-record" key={selectedEvent.id}>
            <div className="record-heading">
              <span className="panel-kicker">{selectedEvent.year} · {selectedEvent.region}</span>
              <h2>{selectedEvent.title}</h2>
              <p>{selectedEvent.description}</p>
            </div>
            <div className="record-insights">
              <div><span>What changed?</span><p>{selectedEvent.change}</p></div>
              <div><span>Why it matters</span><p>{selectedEvent.significance}</p></div>
            </div>
            <div className="record-related">
              <span className="panel-kicker">Continue exploring</span>
              <div>{selectedEvent.relatedTerms.map((term) => <button key={term} onClick={() => navigate(`/glossary?term=${encodeURIComponent(term)}`)}>{term}</button>)}</div>
              <button className="record-type-link" onClick={() => navigate(`/jenis/${selectedEvent.relatedType}`)}>Explore the related wayang tradition →</button>
            </div>
          </article>
        )}
      </section>
    </div>
  );
}
