import { useEffect, useRef } from 'react';
import FROG_SOUND_B64 from './frogSound';

const AUDIO_SRC = `data:audio/mpeg;base64,${FROG_SOUND_B64}`;

export default function useFrogSound(soundOn) {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audio.volume = 0.28;      // Fix 6: much quieter / slower feel
    audio.playbackRate = 0.82; // Fix 6: slow down playback speed
    audio.preload = 'auto';
    audioRef.current = audio;
  }, []);

  useEffect(() => {
    const play = () => {
      if (!soundOn) return;
      try {
        const a = audioRef.current;
        if (!a) return;
        a.currentTime = 0;
        a.play().catch(() => {});
      } catch(e) {}
    };
    const t1 = setTimeout(play, 1500);
    const t2 = setInterval(play, 10000);
    return () => { clearTimeout(t1); clearInterval(t2); };
  }, [soundOn]);
}
