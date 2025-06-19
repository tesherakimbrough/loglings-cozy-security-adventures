
import { MusicType } from '../types/musicTypes';
import { createWhiteNoise, createPinkNoise } from './audioGeneration';

export const generateFallbackAudio = (trackId: MusicType, audioContext: AudioContext) => {
  const masterGain = audioContext.createGain();
  masterGain.connect(audioContext.destination);
  masterGain.gain.setValueAtTime(0.3, audioContext.currentTime);

  const sources: AudioScheduledSourceNode[] = [];
  let noiseSource: AudioBufferSourceNode | null = null;

  let cleanup = () => {
    sources.forEach(source => {
      try { 
        source.stop(); 
        source.disconnect();
      } catch (e) { /* already stopped */ }
    });
    if (noiseSource) {
      try {
        noiseSource.stop();
        noiseSource.disconnect();
      } catch (e) { /* already stopped */ }
    }
  };

  // Create realistic soundscapes based on track type
  switch (trackId) {
    case 'forest':
      // Create wind-like sound using filtered white noise
      const windNoise = createWhiteNoise(audioContext);
      noiseSource = audioContext.createBufferSource();
      noiseSource.buffer = windNoise;
      noiseSource.loop = true;
      
      const windFilter = audioContext.createBiquadFilter();
      windFilter.type = 'lowpass';
      windFilter.frequency.setValueAtTime(400, audioContext.currentTime);
      windFilter.Q.setValueAtTime(0.5, audioContext.currentTime);
      
      const windGain = audioContext.createGain();
      windGain.gain.setValueAtTime(0.15, audioContext.currentTime);
      
      noiseSource.connect(windFilter);
      windFilter.connect(windGain);
      windGain.connect(masterGain);
      
      sources.push(noiseSource);
      break;

    case 'rain':
      // Rain sound using high-frequency filtered white noise
      const rainNoise = createWhiteNoise(audioContext);
      noiseSource = audioContext.createBufferSource();
      noiseSource.buffer = rainNoise;
      noiseSource.loop = true;
      
      const rainFilter = audioContext.createBiquadFilter();
      rainFilter.type = 'highpass';
      rainFilter.frequency.setValueAtTime(1000, audioContext.currentTime);
      rainFilter.Q.setValueAtTime(0.3, audioContext.currentTime);
      
      const rainGain = audioContext.createGain();
      rainGain.gain.setValueAtTime(0.2, audioContext.currentTime);
      
      // Add modulation for rain effect
      const rainLfo = audioContext.createOscillator();
      const rainLfoGain = audioContext.createGain();
      rainLfo.frequency.setValueAtTime(0.5, audioContext.currentTime);
      rainLfoGain.gain.setValueAtTime(0.05, audioContext.currentTime);
      
      rainLfo.connect(rainLfoGain);
      rainLfoGain.connect(rainGain.gain);
      
      noiseSource.connect(rainFilter);
      rainFilter.connect(rainGain);
      rainGain.connect(masterGain);
      
      sources.push(noiseSource, rainLfo);
      break;

    case 'fireplace':
      // Crackling fire using pink noise with low-pass filtering
      const fireNoise = createPinkNoise(audioContext);
      noiseSource = audioContext.createBufferSource();
      noiseSource.buffer = fireNoise;
      noiseSource.loop = true;
      
      const fireFilter = audioContext.createBiquadFilter();
      fireFilter.type = 'lowpass';
      fireFilter.frequency.setValueAtTime(800, audioContext.currentTime);
      fireFilter.Q.setValueAtTime(2, audioContext.currentTime);
      
      const fireGain = audioContext.createGain();
      fireGain.gain.setValueAtTime(0.25, audioContext.currentTime);
      
      noiseSource.connect(fireFilter);
      fireFilter.connect(fireGain);
      fireGain.connect(masterGain);
      
      sources.push(noiseSource);
      break;

    case 'lofi':
      // Simple bass drum pattern
      const createDrum = (time: number) => {
        const drumOsc = audioContext.createOscillator();
        const drumGain = audioContext.createGain();
        
        drumOsc.frequency.setValueAtTime(60, audioContext.currentTime + time);
        drumOsc.frequency.exponentialRampToValueAtTime(40, audioContext.currentTime + time + 0.1);
        
        drumGain.gain.setValueAtTime(0, audioContext.currentTime + time);
        drumGain.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + time + 0.01);
        drumGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + time + 0.3);
        
        drumOsc.connect(drumGain);
        drumGain.connect(masterGain);
        
        drumOsc.start(audioContext.currentTime + time);
        drumOsc.stop(audioContext.currentTime + time + 0.3);
      };
      
      // Create a simple beat pattern
      const beatInterval = setInterval(() => {
        createDrum(0);
        createDrum(0.5);
      }, 1000);
      
      // Clean up interval
      const originalCleanup = cleanup;
      cleanup = () => {
        clearInterval(beatInterval);
        originalCleanup();
      };
      break;

    case 'cozy-cafe':
      // Coffee shop ambience using filtered pink noise
      const cafeNoise = createPinkNoise(audioContext);
      noiseSource = audioContext.createBufferSource();
      noiseSource.buffer = cafeNoise;
      noiseSource.loop = true;
      
      const cafeFilter = audioContext.createBiquadFilter();
      cafeFilter.type = 'bandpass';
      cafeFilter.frequency.setValueAtTime(600, audioContext.currentTime);
      cafeFilter.Q.setValueAtTime(1, audioContext.currentTime);
      
      const cafeGain = audioContext.createGain();
      cafeGain.gain.setValueAtTime(0.1, audioContext.currentTime);
      
      noiseSource.connect(cafeFilter);
      cafeFilter.connect(cafeGain);
      cafeGain.connect(masterGain);
      
      sources.push(noiseSource);
      break;
  }

  return {
    start: () => {
      sources.forEach(source => {
        try {
          source.start();
        } catch (e) {
          console.warn('Source already started:', e);
        }
      });
    },
    stop: cleanup,
    setVolume: (volume: number) => {
      masterGain.gain.setValueAtTime(volume, audioContext.currentTime);
    }
  };
};
