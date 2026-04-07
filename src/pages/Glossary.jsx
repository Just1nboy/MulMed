import { useState } from "react";
import Nav from "../components/Nav";
import "./Glossary.css";

const terms = [
  { term: "Blencong", def: "The oil lamp used in Wayang Kulit performances, placed behind the screen to cast shadows. The flickering flame creates a lively, dynamic shadow effect." },
  { term: "Dalang", def: "The master puppeteer who controls the puppets, narrates the story, voices all characters, directs the gamelan orchestra, and improvises humor — all in a single performance lasting up to 8 hours." },
  { term: "Gamelan", def: "A traditional Indonesian musical ensemble made up of bronze metallophones, xylophones, drums (kendang), gongs, and bamboo flutes. It accompanies wayang performances, setting the mood for each scene." },
  { term: "Gunungan / Kayon", def: "A large, leaf-shaped puppet used to symbolize the universe, mountains, wind, fire, or a scene change. The dalang plants it center-screen to mark the beginning, intermission, or end of a performance." },
  { term: "Kelir", def: "The white cotton screen used in Wayang Kulit performances. Shadows are cast onto the kelir by the blencong lamp behind it. The audience traditionally sits on the shadow side." },
  { term: "Kendang", def: "A double-headed drum that the dalang strikes with their foot to signal the gamelan and punctuate dramatic moments in the story." },
  { term: "Keraton", def: "The royal palace of a Javanese sultan. Historically, keraton courts were the primary patrons and preservers of wayang tradition." },
  { term: "Lakon", def: "The specific story or episode being performed in a given wayang show. A lakon can be drawn from the Mahabharata, Ramayana, Panji cycle, or original compositions." },
  { term: "Mahabharata", def: "One of two major Sanskrit epics from India, telling the story of the Pandava and Kaurava families. In Java, it has been adapted over centuries with local philosophy and characters." },
  { term: "Panji Cycle", def: "A collection of romantic stories originating from East Java (not India), centered on Prince Panji Asmarabangun and Dewi Sekartaji. These are among the oldest purely Javanese narratives." },
  { term: "Ramayana", def: "The other major Sanskrit epic, telling the story of Prince Rama, his wife Sinta, and the demon king Rahwana. It has been adapted throughout Southeast Asia." },
  { term: "Sinden", def: "A female vocalist who sings alongside the gamelan orchestra during wayang and other traditional performances." },
  { term: "Wayang Golek", def: "Three-dimensional wooden rod puppets from West Java (Sunda). The puppet's head rotates and hands are controlled through thin rods. Performances are done in full view, not behind a screen." },
  { term: "Wayang Klitik", def: "Flat wooden puppets from East Java, named after the 'klitik-klitik' clacking sound they make when they touch during performance. They typically tell Panji cycle stories." },
  { term: "Wayang Kulit", def: "Flat leather shadow puppets, the most iconic form of wayang. Made from carved buffalo or cow hide, they are performed behind a kelir screen with a blencong lamp." },
  { term: "Wayang Orang", def: "Also called Wayang Wong. A dance drama where human performers enact wayang stories wearing elaborate costumes and makeup that mimic the appearance of shadow puppets." },
];

export default function Glossary() {
  const [search, setSearch] = useState("");

  const filtered = terms.filter(
    (t) =>
      t.term.toLowerCase().includes(search.toLowerCase()) ||
      t.def.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-container">
      <Nav />

      <header className="page-header animate-fade-in-up">
        <span className="badge">Reference</span>
        <h1>Glossary</h1>
        <p className="page-subtitle">
          Key terms and concepts in the world of wayang.
        </p>
      </header>

      <input
        type="text"
        className="glossary-search animate-fade-in delay-1"
        placeholder="Search terms..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="glossary-list animate-fade-in-up delay-2">
        {filtered.map((t) => (
          <div className="glossary-item" key={t.term}>
            <dt className="glossary-term">{t.term}</dt>
            <dd className="glossary-def">{t.def}</dd>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="glossary-empty">No terms match your search.</p>
        )}
      </div>
    </div>
  );
}
