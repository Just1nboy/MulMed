import { useNavigate, useLocation } from "react-router-dom";
import "./Nav.css";

const links = [
  { path: "/jenis", label: "Types" },
  { path: "/timeline", label: "Timeline" },
  { path: "/studio", label: "Studio" },
  { path: "/glossary", label: "Glossary" },
  { path: "/quiz", label: "Quiz" },
];

export default function Nav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="nav">
      <button className="nav-logo" onClick={() => navigate("/")}>Wayang</button>
      <div className="nav-links">
        {links.map((l) => (
          <button
            key={l.path}
            className={`nav-link ${location.pathname.startsWith(l.path) ? "active" : ""}`}
            onClick={() => navigate(l.path)}
          >
            {l.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
