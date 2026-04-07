import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { wayangTypes } from "../data/wayang";
import { typeImages, characterImages } from "../data/images";
import WayangViewer from "../components/WayangViewer";
import StoryModal from "../components/StoryModal";
import Nav from "../components/Nav";
import "./WayangDetail.css";

export default function WayangDetail() {
  const { typeId } = useParams();
  const navigate = useNavigate();
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [showStory, setShowStory] = useState(false);
  const [showViewer, setShowViewer] = useState(false);

  const wayangType = wayangTypes.find((t) => t.id === typeId);

  if (!wayangType) {
    return (
      <div className="page-container">
        <Nav />
        <p>Wayang type not found.</p>
      </div>
    );
  }

  const headerImg = typeImages[typeId];

  return (
    <div className="page-container">
      <Nav />

      <button className="back-link" onClick={() => navigate("/jenis")}>
        &larr; All Wayang Types
      </button>

      <section className="detail-header">
        {headerImg && (
          <img src={headerImg} alt={wayangType.name} className="detail-hero-img animate-fade-in" loading="lazy" />
        )}

        <div className="animate-fade-in-up delay-1">
          <span className="badge">{wayangType.subtitle}</span>
          <h1>{wayangType.name}</h1>
          <p className="detail-desc">{wayangType.description}</p>
        </div>

        <div className="info-grid animate-fade-in-up delay-2">
          <div className="info-item">
            <span className="info-label">Origin</span>
            <span className="info-value">{wayangType.origin}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Material</span>
            <span className="info-value">{wayangType.material}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Characteristics</span>
            <span className="info-value">{wayangType.characteristics}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Stories</span>
            <span className="info-value">{wayangType.role}</span>
          </div>
        </div>

        {wayangType.funFact && (
          <div className="fun-fact">
            <span className="fun-fact-label">Did you know?</span>
            <p>{wayangType.funFact}</p>
          </div>
        )}
      </section>

      {wayangType.characters.length > 0 && (
        <>
          <div className="divider" />

          <section className="characters-section animate-fade-in-up delay-3">
            <h2>Characters</h2>
            <p className="section-desc">
              Select a character to learn about their story, or try posing them in the interactive viewer.
            </p>

            <div className="char-grid">
              {wayangType.characters.map((char) => (
                <button
                  key={char.id}
                  className={`char-card ${selectedCharacter?.id === char.id ? "selected" : ""}`}
                  onClick={() => setSelectedCharacter(char)}
                >
                  {characterImages[char.id] && (
                    <img
                      src={characterImages[char.id]}
                      alt={char.name}
                      className="char-card-img"
                      loading="lazy"
                    />
                  )}
                  <h3>{char.name}</h3>
                  <span className="char-card-title">{char.title}</span>
                  <span className="char-card-epic">{char.epic}</span>
                </button>
              ))}
            </div>
          </section>

          {selectedCharacter && (
            <section className="char-detail" key={selectedCharacter.id}>
              <div className="char-detail-top">
                <div>
                  <span className="badge">{selectedCharacter.epic}</span>
                  <h2>{selectedCharacter.name}</h2>
                  <span className="char-detail-title">{selectedCharacter.title}</span>
                </div>
              </div>

              <p className="char-body">{selectedCharacter.description}</p>

              <div className="char-meta">
                <div className="meta-group">
                  <h4>Traits</h4>
                  <div className="tags">
                    {selectedCharacter.personality.map((p) => (
                      <span key={p} className="tag">{p}</span>
                    ))}
                  </div>
                </div>
                {selectedCharacter.weapons.length > 0 && (
                  <div className="meta-group">
                    <h4>Weapons</h4>
                    <div className="tags">
                      {selectedCharacter.weapons.map((w) => (
                        <span key={w} className="tag tag-weapon">{w}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="char-actions">
                <button className="btn-primary" onClick={() => setShowViewer(true)}>
                  Pose the Puppet
                </button>
                <button className="btn-outline" onClick={() => setShowStory(true)}>
                  Read the Story
                </button>
              </div>
            </section>
          )}
        </>
      )}

      {showViewer && selectedCharacter && (
        <WayangViewer character={selectedCharacter} onClose={() => setShowViewer(false)} />
      )}
      {showStory && selectedCharacter && (
        <StoryModal character={selectedCharacter} onClose={() => setShowStory(false)} />
      )}
    </div>
  );
}
