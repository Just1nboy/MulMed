import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { AudioContext } from "./AudioContext";

const STORAGE_KEY = "wayang-audio-enabled";
const MUSIC_PATH = "/audio/bonang-bbpl3.mp3";

function createAudioEngine() {
  const NativeAudioContext = window.AudioContext || window.webkitAudioContext;
  if (!NativeAudioContext) return null;

  const context = new NativeAudioContext();
  const master = context.createGain();
  const effects = context.createGain();

  master.gain.value = 0.7;
  effects.gain.value = 0.22;
  effects.connect(master);
  master.connect(context.destination);

  return { context, master, effects };
}

function playEffect(engine, type) {
  const { context, effects } = engine;
  const now = context.currentTime;
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.connect(gain);
  gain.connect(effects);

  if (type === "correct") {
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(392, now);
    oscillator.frequency.setValueAtTime(523.25, now + 0.11);
    oscillator.frequency.setValueAtTime(659.25, now + 0.22);
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.75);
    oscillator.start(now);
    oscillator.stop(now + 0.75);
    return;
  }

  if (type === "wrong") {
    oscillator.type = "triangle";
    oscillator.frequency.setValueAtTime(196, now);
    oscillator.frequency.exponentialRampToValueAtTime(146.83, now + 0.28);
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.42);
    oscillator.start(now);
    oscillator.stop(now + 0.42);
    return;
  }

  if (type === "navigate") {
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(293.66, now);
    oscillator.frequency.exponentialRampToValueAtTime(440, now + 0.18);
    gain.gain.setValueAtTime(0.11, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);
    oscillator.start(now);
    oscillator.stop(now + 0.45);
    return;
  }

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(440, now);
  oscillator.frequency.exponentialRampToValueAtTime(360, now + 0.07);
  gain.gain.setValueAtTime(0.08, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
  oscillator.start(now);
  oscillator.stop(now + 0.12);
}

export default function AudioSystem({ children }) {
  const { pathname } = useLocation();
  const engineRef = useRef(null);
  const musicRef = useRef(null);
  const previousPath = useRef(pathname);
  const [enabled, setEnabled] = useState(
    () => localStorage.getItem(STORAGE_KEY) === "true"
  );

  const getEngine = useCallback(() => {
    if (!engineRef.current) engineRef.current = createAudioEngine();
    return engineRef.current;
  }, []);

  const playSfx = useCallback(
    (type = "click") => {
      if (!enabled) return;
      const engine = getEngine();
      if (!engine) return;
      if (engine.context.state === "suspended") engine.context.resume();
      playEffect(engine, type);
    },
    [enabled, getEngine]
  );

  const toggleAudio = useCallback(() => {
    setEnabled((current) => !current);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(enabled));
    const engine = enabled ? getEngine() : engineRef.current;
    if (!musicRef.current) {
      musicRef.current = new Audio(MUSIC_PATH);
      musicRef.current.loop = true;
      musicRef.current.volume = 0.18;
      musicRef.current.preload = "auto";
    }

    if (enabled) {
      musicRef.current.play().catch(() => {});
      if (engine) {
        engine.context.resume();
        playEffect(engine, "navigate");
      }
    } else {
      musicRef.current.pause();
      if (engine) engine.context.suspend();
    }
  }, [enabled, getEngine]);

  useEffect(() => {
    if (previousPath.current !== pathname) playSfx("navigate");
    previousPath.current = pathname;
  }, [pathname, playSfx]);

  useEffect(() => {
    const handlePointerDown = (event) => {
      const button = event.target.closest("button");
      const isAudioToggle = Boolean(button?.dataset.audioToggle);

      if (enabled && !isAudioToggle && musicRef.current?.paused) {
        musicRef.current.play().catch(() => {});
      }
      if (button && !button.disabled && !isAudioToggle) playSfx("click");
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [enabled, playSfx]);

  useEffect(
    () => () => {
      musicRef.current?.pause();
    },
    []
  );

  const value = useMemo(
    () => ({ enabled, toggleAudio, playSfx }),
    [enabled, playSfx, toggleAudio]
  );

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
}
