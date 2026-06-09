import { useAudio } from "./AudioContext";
import "./AudioToggle.css";

export default function AudioToggle() {
  const { enabled, toggleAudio } = useAudio();

  return (
    <button
      className={`audio-toggle ${enabled ? "is-on" : ""}`}
      onClick={toggleAudio}
      data-audio-toggle="true"
      aria-pressed={enabled}
      aria-label={enabled ? "Turn sound off" : "Turn sound on"}
      title={
        enabled
          ? "Playing a Javanese bonang"
          : "Play Javanese bonang ambience"
      }
    >
      <span className="audio-toggle-icon" aria-hidden="true">
        {enabled ? "\u266A" : "\u00D7"}
      </span>
      <span>{enabled ? "Sound on" : "Sound off"}</span>
      <i aria-hidden="true">
        <b />
        <b />
        <b />
      </i>
    </button>
  );
}
