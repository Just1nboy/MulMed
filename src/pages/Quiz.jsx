import { useState } from "react";
import Nav from "../components/Nav";
import "./Quiz.css";

const questions = [
  {
    q: "What material is Wayang Kulit traditionally made from?",
    options: ["Carved wood", "Buffalo or cow hide", "Bamboo", "Clay"],
    answer: 1,
    explanation: "Wayang Kulit puppets are made from carved buffalo or cow hide, which is then painted and attached to control rods.",
  },
  {
    q: "What is the white screen used in Wayang Kulit performances called?",
    options: ["Blencong", "Gamelan", "Kelir", "Gunungan"],
    answer: 2,
    explanation: "The kelir is a white cotton screen. The dalang performs behind it, and the audience watches the shadows cast on the other side.",
  },
  {
    q: "What role does a dalang play in a wayang performance?",
    options: [
      "Only controls the puppets",
      "Only narrates the story",
      "Puppeteer, narrator, voice actor, and orchestra director — all at once",
      "Plays the gamelan instruments",
    ],
    answer: 2,
    explanation: "A dalang is a one-person show: controlling all puppets, voicing every character, narrating the plot, directing the gamelan, and improvising humor — often for 8 hours straight.",
  },
  {
    q: "Which two Indian epics provide most of the stories told through wayang?",
    options: [
      "Vedas and Upanishads",
      "Mahabharata and Ramayana",
      "Bhagavad Gita and Panchatantra",
      "Arthashastra and Kamasutra",
    ],
    answer: 1,
    explanation: "The Mahabharata and Ramayana are the two great Sanskrit epics adapted by Javanese artists over centuries, blended with local philosophy and characters.",
  },
  {
    q: "Where does Wayang Golek originate from?",
    options: ["Central Java", "East Java", "West Java (Sunda)", "Bali"],
    answer: 2,
    explanation: "Wayang Golek is a 3D wooden rod puppet tradition from the Sundanese culture of West Java.",
  },
  {
    q: "In what year did UNESCO recognize wayang as Intangible Cultural Heritage?",
    options: ["1998", "2001", "2003", "2010"],
    answer: 2,
    explanation: "UNESCO proclaimed Wayang as a Masterpiece of the Oral and Intangible Heritage of Humanity in 2003.",
  },
  {
    q: "What is the gunungan (kayon) used for in a wayang performance?",
    options: [
      "As a weapon for battle scenes",
      "To represent a specific character",
      "To mark scene changes, beginnings, and endings",
      "As a musical instrument",
    ],
    answer: 2,
    explanation: "The gunungan is a large leaf-shaped puppet symbolizing the universe. The dalang uses it to signal scene changes, the start and end of a performance, and to represent natural elements.",
  },
  {
    q: "What is unique about the Panji cycle stories told through Wayang Klitik?",
    options: [
      "They come from Chinese folklore",
      "They are original Javanese stories, not adapted from India",
      "They can only be performed at night",
      "They use no musical accompaniment",
    ],
    answer: 1,
    explanation: "The Panji cycle is an indigenous Javanese romantic narrative centered on Prince Panji and Dewi Sekartaji — one of the few wayang story traditions not derived from Indian epics.",
  },
  {
    q: "Why were wayang puppet designs changed during the Islamic period in Java?",
    options: [
      "To make them easier to carve",
      "To avoid realistic human depiction, per Islamic tradition",
      "Because the original designs were lost",
      "To appeal to Dutch colonizers",
    ],
    answer: 1,
    explanation: "Islamic tradition discourages realistic human depiction. Javanese artists responded by stylizing the puppets into the elongated, abstract forms we recognize today.",
  },
  {
    q: "What does the blencong provide in a Wayang Kulit show?",
    options: [
      "Musical rhythm",
      "Light source to cast shadows on the kelir",
      "Incense smoke for atmosphere",
      "Amplification for the dalang's voice",
    ],
    answer: 1,
    explanation: "The blencong is an oil lamp placed behind the kelir screen. Its flickering flame casts the puppet shadows and creates a lively, dynamic visual effect.",
  },
];

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const qn = questions[current];

  const handleSelect = (idx) => {
    if (confirmed) return;
    setSelected(idx);
  };

  const handleConfirm = () => {
    if (selected === null) return;
    setConfirmed(true);
    if (selected === qn.answer) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setConfirmed(false);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setConfirmed(false);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    let msg = "Keep learning!";
    if (pct >= 80) msg = "Excellent — you really know your wayang!";
    else if (pct >= 60) msg = "Good job! You have a solid understanding.";
    else if (pct >= 40) msg = "Not bad — try exploring the site to learn more.";

    return (
      <div className="page-container">
        <Nav />
        <div className="quiz-result animate-fade-in-up">
          <span className="badge">Results</span>
          <h1>{score} / {questions.length}</h1>
          <p className="quiz-pct">{pct}% correct</p>
          <p className="quiz-msg">{msg}</p>
          <button className="btn-primary" onClick={handleRestart}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Nav />

      <header className="page-header animate-fade-in-up">
        <span className="badge">Test Your Knowledge</span>
        <h1>Wayang Quiz</h1>
        <p className="page-subtitle">
          {questions.length} questions about wayang history, types, and traditions.
        </p>
      </header>

      <div className="quiz-card animate-fade-in-up delay-1">
        <div className="quiz-progress">
          <span className="quiz-counter">Question {current + 1} of {questions.length}</span>
          <div className="quiz-bar">
            <div className="quiz-bar-fill" style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
          </div>
        </div>

        <h2 className="quiz-question">{qn.q}</h2>

        <div className="quiz-options">
          {qn.options.map((opt, i) => {
            let cls = "quiz-option";
            if (confirmed) {
              if (i === qn.answer) cls += " correct";
              else if (i === selected && i !== qn.answer) cls += " wrong";
            } else if (i === selected) {
              cls += " selected";
            }
            return (
              <button key={i} className={cls} onClick={() => handleSelect(i)}>
                <span className="option-letter">{String.fromCharCode(65 + i)}</span>
                <span>{opt}</span>
              </button>
            );
          })}
        </div>

        {confirmed && (
          <div className={`quiz-explanation ${selected === qn.answer ? "is-correct" : "is-wrong"}`}>
            <p className="explanation-verdict">
              {selected === qn.answer ? "Correct!" : "Incorrect."}
            </p>
            <p>{qn.explanation}</p>
          </div>
        )}

        <div className="quiz-actions">
          {!confirmed ? (
            <button className="btn-primary" onClick={handleConfirm} disabled={selected === null}>
              Check Answer
            </button>
          ) : (
            <button className="btn-primary" onClick={handleNext}>
              {current + 1 >= questions.length ? "See Results" : "Next Question"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
