import { useEffect, useMemo, useRef, useState } from "react";
import Nav from "../components/Nav";
import { wayangTypes } from "../data/wayang";
import { characterImages, typeImages } from "../data/images";
import { studioMoods, studioScenes } from "../data/studioScenes";
import "./DalangStudio.css";

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function getStagePoint(event, stage) {
  const rect = stage.getBoundingClientRect();
  return {
    x: clamp(((event.clientX - rect.left) / rect.width) * 100, 8, 92),
    y: clamp(((rect.bottom - event.clientY) / rect.height) * 100, 8, 58),
  };
}

function getCharacterMap() {
  return wayangTypes
    .flatMap((type) =>
      type.characters.map((character) => ({
        ...character,
        typeId: type.id,
        typeName: type.name,
      }))
    )
    .reduce((map, character) => {
      map[character.id] = character;
      return map;
    }, {});
}

export default function DalangStudio() {
  const charactersById = useMemo(() => getCharacterMap(), []);
  const [sceneId, setSceneId] = useState(studioScenes[0].id);
  const scene = studioScenes.find((item) => item.id === sceneId) || studioScenes[0];
  const [stepIndex, setStepIndex] = useState(0);
  const [selectedCharacterId, setSelectedCharacterId] = useState(scene.characters[0]);
  const [positions, setPositions] = useState(scene.initialPositions);
  const [shadowMode, setShadowMode] = useState(true);
  const [activeMood, setActiveMood] = useState(scene.defaultMood);
  const [failedImages, setFailedImages] = useState({});
  const [decisions, setDecisions] = useState({});
  const [earnedBadges, setEarnedBadges] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("wayang-studio-badges") || "[]");
    } catch {
      return [];
    }
  });

  const stageRef = useRef(null);
  const dragging = useRef(null);

  const currentStep = scene.steps[stepIndex];
  const selectedCharacter = charactersById[selectedCharacterId];
  const selectedPosition = positions[selectedCharacterId];
  const stageImage = typeImages[scene.typeId];
  const progress = ((stepIndex + 1) / scene.steps.length) * 100;
  const isFinalStep = stepIndex === scene.steps.length - 1;
  const decisionKey = `${scene.id}-${stepIndex}`;
  const selectedDecisionId = decisions[decisionKey];
  const selectedDecision = currentStep.decision?.choices.find(
    (choice) => choice.id === selectedDecisionId
  );
  const decisionComplete = !currentStep.decision || Boolean(selectedDecisionId);
  const stepTargets = currentStep.targets || [];
  const targetChecks = stepTargets.map((target) => {
    const position = positions[target.character];
    const distance = position
      ? Math.hypot(position.x - target.x, position.y - target.y)
      : Number.POSITIVE_INFINITY;

    return {
      target,
      complete: distance <= (target.tolerance || 8),
    };
  });
  const targetNames = targetChecks
    .map(({ target }) => charactersById[target.character]?.name || target.character)
    .join(", ");
  const targetsComplete =
    targetChecks.length === 0 || targetChecks.every((check) => check.complete);
  const shadowRequirementMet =
    typeof currentStep.requiresShadowMode !== "boolean" ||
    shadowMode === currentStep.requiresShadowMode;
  const isCurrentStepCorrect = targetsComplete && shadowRequirementMet && decisionComplete;
  const challengeInstruction = [
    !targetsComplete &&
      `Move ${targetNames} into ${targetChecks.length > 1 ? "their glowing targets" : "the glowing target"}.`,
    !shadowRequirementMet &&
      (currentStep.requiresShadowMode
        ? "Turn Shadow Play On."
        : "Switch to Normal Photo Mode."),
    !decisionComplete && "Make a storytelling decision.",
  ]
    .filter(Boolean)
    .join(" ");
  const challengeStatus = isCurrentStepCorrect
    ? isFinalStep
      ? "Scene complete."
      : "Correct. Next cue unlocked."
    : challengeInstruction;
  const visibleBadges =
    isFinalStep && isCurrentStepCorrect && !earnedBadges.includes(scene.id)
      ? [...earnedBadges, scene.id]
      : earnedBadges;

  useEffect(() => {
    const handleMove = (event) => {
      if (!dragging.current || !stageRef.current) return;
      const { id, offsetX, offsetY } = dragging.current;
      const point = getStagePoint(event, stageRef.current);

      setPositions((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          x: clamp(point.x + offsetX, 8, 92),
          y: clamp(point.y + offsetY, 8, 58),
        },
      }));
    };

    const stopDragging = () => {
      dragging.current = null;
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", stopDragging);
    window.addEventListener("pointercancel", stopDragging);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", stopDragging);
      window.removeEventListener("pointercancel", stopDragging);
    };
  }, []);

  useEffect(() => {
    if (!isFinalStep || !isCurrentStepCorrect || earnedBadges.includes(scene.id)) return;
    const nextBadges = [...earnedBadges, scene.id];
    localStorage.setItem("wayang-studio-badges", JSON.stringify(nextBadges));
  }, [earnedBadges, isCurrentStepCorrect, isFinalStep, scene.id]);

  const handleSceneChange = (id) => {
    const nextScene = studioScenes.find((item) => item.id === id) || studioScenes[0];
    if (isFinalStep && isCurrentStepCorrect && !earnedBadges.includes(scene.id)) {
      setEarnedBadges((badges) => [...badges, scene.id]);
    }
    setSceneId(nextScene.id);
    setStepIndex(0);
    setSelectedCharacterId(nextScene.steps[0]?.focus || nextScene.characters[0]);
    setPositions(nextScene.initialPositions);
    setActiveMood(nextScene.defaultMood);
    setDecisions({});
  };

  const handlePuppetDown = (event, id) => {
    if (!stageRef.current) return;
    event.preventDefault();
    setSelectedCharacterId(id);

    const point = getStagePoint(event, stageRef.current);
    const position = positions[id];
    dragging.current = {
      id,
      offsetX: position.x - point.x,
      offsetY: position.y - point.y,
    };
  };

  const moveSelected = (dx, dy) => {
    if (!selectedCharacterId) return;
    setPositions((prev) => ({
      ...prev,
      [selectedCharacterId]: {
        ...prev[selectedCharacterId],
        x: clamp(prev[selectedCharacterId].x + dx, 8, 92),
        y: clamp(prev[selectedCharacterId].y + dy, 8, 58),
      },
    }));
  };

  const flipSelected = () => {
    if (!selectedCharacterId) return;
    setPositions((prev) => ({
      ...prev,
      [selectedCharacterId]: {
        ...prev[selectedCharacterId],
        flip: !prev[selectedCharacterId].flip,
      },
    }));
  };

  const resetScene = () => {
    setPositions(scene.initialPositions);
    setStepIndex(0);
    setSelectedCharacterId(scene.steps[0]?.focus || scene.characters[0]);
    setActiveMood(scene.defaultMood);
    setDecisions({});
  };

  const goToStep = (direction) => {
    if (direction > 0 && !isCurrentStepCorrect) return;

    const nextIndex = clamp(stepIndex + direction, 0, scene.steps.length - 1);
    setStepIndex(nextIndex);
    setActiveMood(scene.steps[nextIndex]?.mood || scene.defaultMood);
    setSelectedCharacterId(scene.steps[nextIndex]?.focus || scene.characters[0]);
  };

  return (
    <div className="page-container studio-page">
      <Nav />

      <header className="page-header studio-header animate-fade-in-up">
        <span className="badge">Interactive Feature</span>
        <h1>Dalang Studio</h1>
        <p className="page-subtitle">
          Step behind the kelir. Choose a scene, move real wayang character
          images, control the mood, and learn how a dalang turns movement into
          meaning.
        </p>
      </header>

      <section className="studio-shell animate-fade-in-up delay-1">
        <aside className="studio-sidebar">
          <div className="studio-panel">
            <span className="panel-kicker">Choose a lakon</span>
            <div className="scene-options">
              {studioScenes.map((item) => (
                <button
                  key={item.id}
                  className={`scene-option ${item.id === scene.id ? "active" : ""}`}
                  onClick={() => handleSceneChange(item.id)}
                >
                  {typeImages[item.typeId] && (
                    <img src={typeImages[item.typeId]} alt="" loading="lazy" />
                  )}
                  <span>
                    <strong>{item.title}</strong>
                    <small>{item.epic}</small>
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="studio-panel">
            <span className="panel-kicker">Cast</span>
            <div className="cast-list">
              {scene.characters.map((id) => {
                const character = charactersById[id];
                return (
                  <button
                    key={id}
                    className={`cast-card ${selectedCharacterId === id ? "active" : ""}`}
                    onClick={() => setSelectedCharacterId(id)}
                  >
                    {characterImages[id] && !failedImages[id] ? (
                      <img
                        src={characterImages[id]}
                        alt={character.name}
                        loading="lazy"
                        onError={() =>
                          setFailedImages((prev) => ({ ...prev, [id]: true }))
                        }
                      />
                    ) : (
                      <span className="cast-fallback">{character.name.charAt(0)}</span>
                    )}
                    <span>
                      <strong>{character.name}</strong>
                      <small>{character.title}</small>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        <main className="studio-main">
          <div className="studio-toolbar">
            <div>
              <span className="studio-eyebrow">{scene.epic}</span>
              <h2>{scene.title}</h2>
              <p>{scene.setting}</p>
            </div>
            <button
              className={`shadow-toggle ${shadowMode ? "active" : ""}`}
              onClick={() => setShadowMode((value) => !value)}
            >
              {shadowMode ? "Shadow Play On" : "Normal Photo Mode"}
            </button>
          </div>

          <div className="studio-achievements">
            <span className="panel-kicker">Dalang journey</span>
            <div>
              {studioScenes.map((item) => (
                <span key={item.id} className={visibleBadges.includes(item.id) ? "earned" : ""}>
                  <b>{visibleBadges.includes(item.id) ? "Mastered" : "Locked"}</b>
                  {item.title}
                </span>
              ))}
            </div>
          </div>

          <div
            ref={stageRef}
            className={`studio-stage mood-${activeMood} ${shadowMode ? "shadow-mode" : ""}`}
          >
            <div className="stage-lamp" />
            <div className="stage-embers" aria-hidden="true">
              {Array.from({ length: 12 }, (_, index) => (
                <span key={index} style={{ "--ember-index": index }} />
              ))}
            </div>
            <div className="stage-screen">
              {stageImage && (
                <img
                  className="stage-texture"
                  src={stageImage}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                />
              )}
              <div className="stage-floor" />
              <div className="gunungan-marker">
                <span>Gunungan</span>
              </div>

              {targetChecks.map(({ target, complete }) => {
                const targetCharacter = charactersById[target.character];

                return (
                  <div
                    key={`${currentStep.title}-${target.character}`}
                    className={`stage-target ${complete ? "complete" : ""}`}
                    style={{
                      left: `${target.x}%`,
                      bottom: `${target.y}%`,
                    }}
                    aria-hidden="true"
                  >
                    <span className="target-ring" />
                    <span className="target-label">
                      {complete ? "Correct" : target.label || targetCharacter?.name}
                    </span>
                  </div>
                );
              })}

              {scene.characters.map((id) => {
                const character = charactersById[id];
                const position = positions[id];
                const isSelected = selectedCharacterId === id;
                const isFocused = currentStep?.focus === id;
                const hasImage = characterImages[id] && !failedImages[id];

                return (
                  <button
                    key={id}
                    className={`stage-puppet ${isSelected ? "selected" : ""} ${isFocused ? "focused" : ""} ${position.flip ? "flip" : ""}`}
                    style={{
                      left: `${position.x}%`,
                      bottom: `${position.y}%`,
                      "--puppet-scale": position.scale,
                    }}
                    onPointerDown={(event) => handlePuppetDown(event, id)}
                    onClick={() => setSelectedCharacterId(id)}
                    aria-label={`Move ${character.name}`}
                  >
                    <span className="puppet-frame">
                      {hasImage ? (
                        <img
                          src={characterImages[id]}
                          alt={character.name}
                          draggable="false"
                          loading="lazy"
                          decoding="async"
                          onError={() =>
                            setFailedImages((prev) => ({ ...prev, [id]: true }))
                          }
                        />
                      ) : (
                        <span className="puppet-fallback">{character.name}</span>
                      )}
                    </span>
                    <span className="puppet-label">{character.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="studio-controls-grid">
            <section className="studio-panel cue-panel">
              <div className="cue-topline">
                <span>Scene {stepIndex + 1} of {scene.steps.length}</span>
                <div className="cue-progress">
                  <span style={{ width: `${progress}%` }} />
                </div>
              </div>
              <h3>{currentStep.title}</h3>
              <p className="dalang-script">{currentStep.narration}</p>
              <div className="cue-note">
                <strong>Dalang cue:</strong> {currentStep.cue}
              </div>
              {(targetChecks.length > 0 ||
                typeof currentStep.requiresShadowMode === "boolean") && (
                <div className={`target-status ${isCurrentStepCorrect ? "complete" : ""}`}>
                  <strong>
                    {isCurrentStepCorrect ? "Challenge complete" : "Challenge locked"}
                  </strong>
                  <span>{challengeStatus}</span>
                </div>
              )}
              <p className="learning-point">{currentStep.learningPoint}</p>

              {currentStep.decision && (
                <div className="story-decision">
                  <span className="panel-kicker">Direct the meaning</span>
                  <h4>{currentStep.decision.question}</h4>
                  <div className="decision-options">
                    {currentStep.decision.choices.map((choice) => (
                      <button
                        key={choice.id}
                        className={selectedDecisionId === choice.id ? "active" : ""}
                        onClick={() =>
                          setDecisions((previous) => ({
                            ...previous,
                            [decisionKey]: choice.id,
                          }))
                        }
                      >
                        {choice.label}
                      </button>
                    ))}
                  </div>
                  {selectedDecision && (
                    <div className="decision-result">
                      <strong>{selectedDecision.result}</strong>
                      <span>{selectedDecision.insight}</span>
                    </div>
                  )}
                </div>
              )}

              {isFinalStep && (
                <div className="reflection-card">
                  <strong>Audience reflection</strong>
                  <p>{scene.reflection}</p>
                  {isCurrentStepCorrect && (
                    <div className="badge-unlock">
                      <span>Performance badge earned</span>
                      <strong>{scene.title} · Master Dalang</strong>
                    </div>
                  )}
                </div>
              )}

              <div className="cue-actions">
                <button className="control-btn" onClick={() => goToStep(-1)} disabled={stepIndex === 0}>
                  Previous
                </button>
                {isFinalStep ? (
                  <button className="btn-primary" onClick={resetScene}>
                    Replay Scene
                  </button>
                ) : (
                  <button
                    className="btn-primary"
                    onClick={() => goToStep(1)}
                    disabled={!isCurrentStepCorrect}
                    title={!isCurrentStepCorrect ? challengeInstruction : undefined}
                  >
                    Next Cue
                  </button>
                )}
              </div>
            </section>

            <section className="studio-panel director-panel">
              <span className="panel-kicker">Director controls</span>
              <h3>{selectedCharacter?.name || "Select a puppet"}</h3>
              <p>
                {selectedCharacter
                  ? `${selectedCharacter.title} from ${selectedCharacter.typeName}`
                  : "Choose a character from the cast or stage."}
              </p>

              {selectedPosition && (
                <>
                  <div className="nudge-grid" aria-label="Move selected puppet">
                    <button onClick={() => moveSelected(0, 6)}>Up</button>
                    <button onClick={() => moveSelected(-6, 0)}>Left</button>
                    <button onClick={flipSelected}>Flip</button>
                    <button onClick={() => moveSelected(6, 0)}>Right</button>
                    <button onClick={() => moveSelected(0, -6)}>Down</button>
                  </div>

                  <div className="mood-list">
                    {Object.entries(studioMoods).map(([mood, moodInfo]) => (
                      <button
                        key={mood}
                        className={`mood-chip ${activeMood === mood ? "active" : ""}`}
                        onClick={() => setActiveMood(mood)}
                      >
                        <strong>{moodInfo.label}</strong>
                        <span>{moodInfo.description}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </section>
          </div>

          <section className="studio-moral">
            <span className="panel-kicker">Moral focus</span>
            <p>{scene.moral}</p>
          </section>
        </main>
      </section>

      <p className="studio-source-note">
        Character and type images are sourced from Wikimedia Commons where
        available. Shadow mode stylizes the same real images into a kelir-style
        performance view.
      </p>
    </div>
  );
}
