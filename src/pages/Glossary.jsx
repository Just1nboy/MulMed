import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Nav from "../components/Nav";
import { glossaryCategories, glossaryTerms } from "../data/glossary";
import "./Glossary.css";

export default function Glossary() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedTerm = searchParams.get("term");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [activeTerm, setActiveTerm] = useState(glossaryTerms.find((item) => item.term === requestedTerm)?.term || glossaryTerms[0].term);

  const filtered = useMemo(() => glossaryTerms.filter((item) =>
    (category === "All" || item.category === category) &&
    [item.term, item.definition, item.short].some((value) => value.toLowerCase().includes(search.toLowerCase()))
  ), [category, search]);
  const active = glossaryTerms.find((item) => item.term === activeTerm) || glossaryTerms[0];

  const selectTerm = (term) => {
    setActiveTerm(term);
    setSearchParams({ term });
  };

  return (
    <div className="page-container glossary-page">
      <Nav />
      <header className="page-header">
        <span className="badge">Reference</span>
        <h1>Glossary</h1>
        <p className="page-subtitle">Learn the language of wayang, then follow each term into the stage, stories, and traditions where it comes alive.</p>
      </header>

      <section className="glossary-tools">
        <input type="text" className="glossary-search" placeholder="Search terms and meanings..." value={search} onChange={(event) => setSearch(event.target.value)} />
        <div className="glossary-categories" aria-label="Filter glossary by category">
          {glossaryCategories.map((item) => <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>)}
        </div>
      </section>

      <section className="glossary-explorer">
        <div className="glossary-list">
          <span className="result-count">{filtered.length} terms</span>
          {filtered.map((item) => (
            <button className={`glossary-item ${active.term === item.term ? "active" : ""}`} key={item.term} onClick={() => selectTerm(item.term)}>
              <span><strong className="glossary-term">{item.term}</strong><small>{item.category}</small></span>
              <span className="glossary-def">{item.short}</span>
            </button>
          ))}
          {filtered.length === 0 && <p className="glossary-empty">No terms match your search.</p>}
        </div>

        <article className="glossary-record" key={active.term}>
          <span className="panel-kicker">{active.category} · Wayang vocabulary</span>
          <h2>{active.term}</h2>
          <p className="glossary-full-definition">{active.definition}</p>
          <div className="glossary-context"><span>In performance</span><p>{active.context}</p></div>
          <div className="glossary-related">
            <span className="panel-kicker">Related terms</span>
            <div>{active.related.map((term) => <button key={term} onClick={() => selectTerm(term)}>{term}</button>)}</div>
          </div>
          <button className="btn-primary glossary-explore-link" onClick={() => navigate(active.explore.path)}>{active.explore.label}</button>
        </article>
      </section>
    </div>
  );
}
