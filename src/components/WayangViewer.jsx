import { useState, useRef, useCallback, useEffect } from "react";
import "./WayangViewer.css";

const SKELETON = {
  body:          { parent: null,             length: 0,  defaultAngle: 0 },
  torso:         { parent: "body",           length: 70, defaultAngle: -90 },
  head:          { parent: "torso",          length: 45, defaultAngle: 0 },
  upperArmLeft:  { parent: "torso",          length: 55, defaultAngle: 120 },
  lowerArmLeft:  { parent: "upperArmLeft",   length: 50, defaultAngle: 30 },
  upperArmRight: { parent: "torso",          length: 55, defaultAngle: -120 },
  lowerArmRight: { parent: "upperArmRight",  length: 50, defaultAngle: -30 },
  upperLegLeft:  { parent: "body",           length: 55, defaultAngle: 100 },
  lowerLegLeft:  { parent: "upperLegLeft",   length: 50, defaultAngle: 10 },
  upperLegRight: { parent: "body",           length: 55, defaultAngle: 80 },
  lowerLegRight: { parent: "upperLegRight",  length: 50, defaultAngle: -10 },
};

const BONE_LABELS = {
  torso: "Torso", head: "Head",
  upperArmLeft: "Left Upper Arm", lowerArmLeft: "Left Forearm",
  upperArmRight: "Right Upper Arm", lowerArmRight: "Right Forearm",
  upperLegLeft: "Left Thigh", lowerLegLeft: "Left Shin",
  upperLegRight: "Right Thigh", lowerLegRight: "Right Shin",
};

const BONE_STYLE = {
  torso:         { width: 30, color: "#8b6b2e", shadow: "#2c2418" },
  head:          { width: 22, color: "#a0783c", shadow: "#2c2418", isHead: true },
  upperArmLeft:  { width: 10, color: "#9a7a3a", shadow: "#2c2418" },
  lowerArmLeft:  { width: 8,  color: "#a0783c", shadow: "#2c2418" },
  upperArmRight: { width: 10, color: "#9a7a3a", shadow: "#2c2418" },
  lowerArmRight: { width: 8,  color: "#a0783c", shadow: "#2c2418" },
  upperLegLeft:  { width: 12, color: "#7a5e28", shadow: "#2c2418" },
  lowerLegLeft:  { width: 10, color: "#8a6e38", shadow: "#2c2418" },
  upperLegRight: { width: 12, color: "#7a5e28", shadow: "#2c2418" },
  lowerLegRight: { width: 10, color: "#8a6e38", shadow: "#2c2418" },
};

const RENDER_ORDER = [
  "upperArmLeft", "lowerArmLeft",
  "upperLegLeft", "lowerLegLeft",
  "torso",
  "upperLegRight", "lowerLegRight",
  "head",
  "upperArmRight", "lowerArmRight",
];

const ROOT = { x: 200, y: 200 };

function deg(d) { return (d * Math.PI) / 180; }

function getDefaultAngles() {
  const a = {};
  for (const [name, bone] of Object.entries(SKELETON)) {
    a[name] = deg(bone.defaultAngle);
  }
  return a;
}

function fk(angles) {
  const pos = {};
  const wa = {};
  pos.body = { ...ROOT };
  wa.body = angles.body;

  const order = [
    "torso", "head",
    "upperArmLeft", "lowerArmLeft",
    "upperArmRight", "lowerArmRight",
    "upperLegLeft", "lowerLegLeft",
    "upperLegRight", "lowerLegRight",
  ];

  for (const name of order) {
    const bone = SKELETON[name];
    const pp = pos[bone.parent];
    const pw = wa[bone.parent] || 0;
    const w = pw + angles[name];
    wa[name] = w;
    pos[name] = {
      x: pp.x + Math.cos(w) * bone.length,
      y: pp.y + Math.sin(w) * bone.length,
    };
  }
  return { pos, wa };
}

function parentPos(name, positions) {
  const bone = SKELETON[name];
  return bone.parent ? positions[bone.parent] : positions[name];
}

export default function WayangViewer({ character, onClose }) {
  const [angles, setAngles] = useState(getDefaultAngles);
  const [activeBone, setActiveBone] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [shadowMode, setShadowMode] = useState(false);
  const [hint, setHint] = useState("Click and drag any limb to pose the puppet.");

  const svgRef = useRef(null);
  const dragging = useRef(null);

  const getSvgPt = useCallback((e) => {
    const svg = svgRef.current;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    return pt.matrixTransform(svg.getScreenCTM().inverse());
  }, []);

  const onDown = useCallback((e, boneName) => {
    e.stopPropagation();
    e.preventDefault();
    const p = getSvgPt(e);
    const { pos } = fk(angles);
    const pp = parentPos(boneName, pos);
    const mouseAngle = Math.atan2(p.y - pp.y, p.x - pp.x);
    dragging.current = { bone: boneName, offset: angles[boneName] - mouseAngle };
    setActiveBone(boneName);
    setHint(`Dragging: ${BONE_LABELS[boneName] || boneName}`);
  }, [angles, getSvgPt]);

  const onMove = useCallback((e) => {
    if (!dragging.current) return;
    e.preventDefault();
    const { bone, offset } = dragging.current;
    const p = getSvgPt(e);
    setAngles((prev) => {
      const next = { ...prev };
      const { pos } = fk(next);
      const pp = parentPos(bone, pos);
      const mouseAngle = Math.atan2(p.y - pp.y, p.x - pp.x);
      next[bone] = mouseAngle + offset;
      return next;
    });
  }, [getSvgPt]);

  const onUp = useCallback(() => {
    if (dragging.current) {
      dragging.current = null;
      setActiveBone(null);
      setHint("Click and drag any limb to pose the puppet.");
    }
  }, []);

  useEffect(() => {
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [onMove, onUp]);

  const resetPose = () => {
    setAngles(getDefaultAngles());
    setHint("Pose reset.");
  };

  const { pos, wa } = fk(angles);

  const renderBone = (name) => {
    const bone = SKELETON[name];
    const style = BONE_STYLE[name];
    if (!style) return null;

    const start = parentPos(name, pos);
    const end = pos[name];
    const active = activeBone === name;
    const fill = shadowMode ? style.shadow : style.color;
    const strokeColor = active ? (shadowMode ? "#555" : "var(--accent)") : "transparent";

    if (style.isHead) {
      return (
        <g key={name} onPointerDown={(e) => onDown(e, name)} style={{ cursor: "grab", touchAction: "none" }}>
          <ellipse cx={end.x} cy={end.y} rx={style.width} ry={style.width * 1.2}
            fill={fill} stroke={strokeColor} strokeWidth={active ? 2 : 0} />
          {!shadowMode && (
            <>
              <polygon points={`${end.x - 10},${end.y - style.width * 1.1} ${end.x},${end.y - style.width * 1.8} ${end.x + 10},${end.y - style.width * 1.1}`} fill="#b8922e" />
              <circle cx={end.x - 6} cy={end.y - 2} r="2" fill="#3a2a10" />
              <circle cx={end.x + 6} cy={end.y - 2} r="2" fill="#3a2a10" />
            </>
          )}
          {shadowMode && (
            <polygon points={`${end.x - 10},${end.y - style.width * 1.1} ${end.x},${end.y - style.width * 1.8} ${end.x + 10},${end.y - style.width * 1.1}`} fill={fill} />
          )}
          <circle cx={start.x} cy={start.y} r={3} fill={shadowMode ? "#333" : "#b8922e"} stroke={shadowMode ? "none" : "#5a4420"} strokeWidth={0.8} className="joint" />
        </g>
      );
    }

    const angle = wa[name] || 0;
    const px = Math.cos(angle + Math.PI / 2);
    const py = Math.sin(angle + Math.PI / 2);
    const hw = style.width / 2;
    const hw2 = hw * 0.7;

    const points = [
      `${start.x + px * hw},${start.y + py * hw}`,
      `${end.x + px * hw2},${end.y + py * hw2}`,
      `${end.x - px * hw2},${end.y - py * hw2}`,
      `${start.x - px * hw},${start.y - py * hw}`,
    ].join(" ");

    return (
      <g key={name} onPointerDown={(e) => onDown(e, name)} style={{ cursor: "grab", touchAction: "none" }}>
        <polygon points={points} fill={fill}
          stroke={strokeColor} strokeWidth={active ? 2 : 0} />
        {name === "torso" && !shadowMode && (
          <line x1={start.x} y1={start.y + 12} x2={end.x} y2={end.y - 5}
            stroke="#c4a24e" strokeWidth="0.6" opacity="0.4" />
        )}
        <circle cx={start.x} cy={start.y} r={Math.min(3, hw)}
          fill={shadowMode ? "#333" : "#b8922e"} stroke={shadowMode ? "none" : "#5a4420"} strokeWidth={0.8} className="joint" />
        <circle cx={end.x} cy={end.y} r={Math.min(2.5, hw * 0.7)}
          fill={shadowMode ? "#333" : "#b8922e"} stroke={shadowMode ? "none" : "#5a4420"} strokeWidth={0.8} className="joint" />
      </g>
    );
  };

  return (
    <div className="viewer-overlay" onClick={onClose}>
      <div className="viewer-modal" onClick={(e) => e.stopPropagation()}>
        <div className="viewer-header">
          <div>
            <h2>{character.name}</h2>
            <span className="viewer-char-name">{character.title}</span>
          </div>
          <button className="viewer-close" onClick={onClose}>&times;</button>
        </div>

        <div className="viewer-hint">{hint}</div>

        <div className="viewer-mode-toggle">
          <button className={`mode-btn ${!shadowMode ? "active" : ""}`} onClick={() => setShadowMode(false)}>
            Normal
          </button>
          <button className={`mode-btn ${shadowMode ? "active" : ""}`} onClick={() => setShadowMode(true)}>
            Shadow Play
          </button>
        </div>

        <div className="viewer-canvas" style={{ transform: `scale(${zoom})` }}>
          <svg ref={svgRef} viewBox="0 0 400 420" className="viewer-svg"
            style={{ background: shadowMode ? "#fdf8ed" : "transparent", borderRadius: "8px" }}>
            {shadowMode && (
              <>
                <defs>
                  <radialGradient id="lampGlow" cx="50%" cy="30%" r="60%">
                    <stop offset="0%" stopColor="rgba(255,220,140,0.2)" />
                    <stop offset="100%" stopColor="transparent" />
                  </radialGradient>
                </defs>
                <rect width="400" height="420" fill="#fdf8ed" rx="8" />
                <circle cx="200" cy="100" r="200" fill="url(#lampGlow)" />
              </>
            )}

            {/* Decorative rod */}
            {!shadowMode && (
              <line x1={ROOT.x} y1={ROOT.y + 100} x2={ROOT.x} y2="415"
                stroke="#8b4513" strokeWidth="2.5" opacity="0.15" />
            )}

            {RENDER_ORDER.map(renderBone)}
          </svg>
        </div>

        <div className="viewer-controls">
          <div className="zoom-controls">
            <button className="control-btn" onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))}>-</button>
            <span className="zoom-level">{Math.round(zoom * 100)}%</span>
            <button className="control-btn" onClick={() => setZoom((z) => Math.min(2, z + 0.1))}>+</button>
          </div>
          <button className="control-btn" onClick={resetPose}>Reset</button>
        </div>

        <div className="viewer-edu-note">
          <strong>{shadowMode ? "Shadow Play (Pertunjukan Bayangan):" : "How it works:"}</strong>{" "}
          {shadowMode
            ? "In a real Wayang Kulit performance, the audience sits on the shadow side of a white screen (kelir). An oil lamp (blencong) behind the screen casts the puppet's shadow, creating the dramatic silhouettes you see here."
            : "A dalang manipulates puppets using rods attached to the body and arms. Gentle movements convey calm characters, while rapid movements depict battles."}
        </div>
      </div>
    </div>
  );
}
