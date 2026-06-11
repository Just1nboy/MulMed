import { createContext, useContext } from "react";

export const AudioContext = createContext({
  enabled: false,
  toggleAudio: () => {},
  playSfx: () => {},
});

export function useAudio() {
  return useContext(AudioContext);
}
