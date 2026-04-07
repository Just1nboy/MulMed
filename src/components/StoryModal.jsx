import "./StoryModal.css";

export default function StoryModal({ character, onClose }) {
  return (
    <div className="story-overlay" onClick={onClose}>
      <div className="story-modal" onClick={(e) => e.stopPropagation()}>
        <button className="story-close" onClick={onClose}>&times;</button>

        <div className="story-header">
          <span className="badge">{character.epic}</span>
          <h2>The Story of {character.name}</h2>
          <span className="story-subtitle">{character.title}</span>
        </div>

        <div className="story-sep" />

        <div className="story-content">
          <p>{character.story}</p>
        </div>

        <div className="moral-box">
          <h4>Moral Lesson</h4>
          <p>{character.moralLesson}</p>
        </div>

        <div className="story-info-section">
          <div className="story-info-row">
            <span className="story-info-label">Traits</span>
            <span className="story-info-value">{character.personality.join(", ")}</span>
          </div>
          {character.weapons.length > 0 && (
            <div className="story-info-row">
              <span className="story-info-label">Weapons</span>
              <span className="story-info-value">{character.weapons.join(", ")}</span>
            </div>
          )}
        </div>

        <button className="story-close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
