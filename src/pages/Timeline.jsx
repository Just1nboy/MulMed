import Nav from "../components/Nav";
import "./Timeline.css";

const events = [
  {
    year: "~800 CE",
    title: "Earliest Evidence",
    desc: "The oldest known reference to wayang appears in a Javanese court inscription (Prasasti Balitung), mentioning a performance called 'si Galigi mawayang' — evidence that shadow play was already established in royal courts.",
  },
  {
    year: "~900 CE",
    title: "Hindu-Buddhist Influence",
    desc: "Indian epics Mahabharata and Ramayana arrive in Java through Hindu-Buddhist trade routes. Javanese artists adapt these stories, blending them with local animistic beliefs and ancestor worship traditions.",
  },
  {
    year: "~1000 CE",
    title: "Wayang Kulit Takes Shape",
    desc: "The flat leather puppet form we know today as Wayang Kulit becomes the dominant art form in Javanese courts. The kelir (screen) and blencong (oil lamp) setup becomes standardized.",
  },
  {
    year: "~1400s",
    title: "Islamic Adaptation",
    desc: "As Islam spreads through Java, wayang puppets are redesigned to avoid realistic human depiction — leading to the stylized, elongated forms seen today. The stories gain layers of Sufi mysticism.",
  },
  {
    year: "~1500s",
    title: "Wayang Golek Emerges",
    desc: "Three-dimensional wooden rod puppets develop in Sundanese (West Java) culture. Unlike the shadow-based Wayang Kulit, Wayang Golek performs in full view of the audience.",
  },
  {
    year: "~1600s",
    title: "Wayang Orang Begins",
    desc: "The royal courts of Surakarta and Yogyakarta develop Wayang Orang — live dance drama where human performers embody wayang characters with elaborate costumes and classical Javanese dance.",
  },
  {
    year: "1755",
    title: "Court Culture Peak",
    desc: "After the Treaty of Giyanti splits the Mataram Sultanate, both successor courts (Surakarta and Yogyakarta) compete in patronizing wayang arts, leading to a golden age of performance and puppet craftsmanship.",
  },
  {
    year: "1945",
    title: "Independence & National Identity",
    desc: "Following Indonesian independence, wayang is embraced as a symbol of national cultural identity. Performances begin incorporating contemporary themes alongside traditional epics.",
  },
  {
    year: "2003",
    title: "UNESCO Recognition",
    desc: "UNESCO proclaims Wayang as a Masterpiece of the Oral and Intangible Heritage of Humanity, recognizing its significance to world culture and urging preservation efforts.",
  },
  {
    year: "Present",
    title: "Modern Revival",
    desc: "Contemporary dalang experiment with new formats: shortened performances, modern themes, digital projections, and social media. Universities now offer formal programs in dalang studies.",
  },
];

export default function Timeline() {
  return (
    <div className="page-container">
      <Nav />

      <header className="page-header animate-fade-in-up">
        <span className="badge">History</span>
        <h1>Timeline of Wayang</h1>
        <p className="page-subtitle">
          Over a thousand years of evolution — from ancient court rituals to
          UNESCO-recognized world heritage.
        </p>
      </header>

      <div className="timeline">
        {events.map((ev, i) => (
          <div className="tl-item animate-slide-in-left" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="tl-marker">
              <div className="tl-dot" />
              {i < events.length - 1 && <div className="tl-line" />}
            </div>
            <div className="tl-content">
              <span className="tl-year">{ev.year}</span>
              <h3 className="tl-title">{ev.title}</h3>
              <p className="tl-desc">{ev.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
