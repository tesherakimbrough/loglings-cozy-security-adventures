
import { MusicType } from '../types/musicTypes';
import { createWhiteNoise, createPinkNoise } from './audioGeneration';

export const generateFallbackAudio = (trackId: MusicType, audioContext: AudioContext) => {
  const masterGain = audioContext.createGain();
  masterGain.connect(audioContext.destination);
  masterGain.gain.setValueAtTime(0.3, audioContext.currentTime);

  const sources: AudioScheduledSourceNode[] = [];
  const intervals: NodeJS.Timeout[] = [];
  let cleanup = () => {
    sources.forEach(source => {
      try { 
        source.stop(); 
        source.disconnect();
      } catch (e) { /* already stopped */ }
    });
    intervals.forEach(interval => clearInterval(interval));
  };

  // Create realistic soundscapes based on track type
  switch (trackId) {
    case 'forest':
      // Enhanced forest ambience with layered sounds
      const windNoise = createWhiteNoise(audioContext);
      const windSource = audioContext.createBufferSource();
      windSource.buffer = windNoise;
      windSource.loop = true;
      
      const windFilter = audioContext.createBiquadFilter();
      windFilter.type = 'lowpass';
      windFilter.frequency.setValueAtTime(400, audioContext.currentTime);
      windFilter.Q.setValueAtTime(0.7, audioContext.currentTime);
      
      const windGain = audioContext.createGain();
      windGain.gain.setValueAtTime(0.12, audioContext.currentTime);
      
      // Add gentle frequency modulation for wind movement
      const windLfo = audioContext.createOscillator();
      const windLfoGain = audioContext.createGain();
      windLfo.frequency.setValueAtTime(0.1, audioContext.currentTime);
      windLfoGain.gain.setValueAtTime(50, audioContext.currentTime);
      
      windLfo.connect(windLfoGain);
      windLfoGain.connect(windFilter.frequency);
      
      windSource.connect(windFilter);
      windFilter.connect(windGain);
      windGain.connect(masterGain);
      
      sources.push(windSource, windLfo);
      
      // Add random bird chirps
      const createBirdChirp = () => {
        const chirpOsc = audioContext.createOscillator();
        const chirpGain = audioContext.createGain();
        const chirpFilter = audioContext.createBiquadFilter();
        
        chirpOsc.type = 'sine';
        chirpOsc.frequency.setValueAtTime(800 + Math.random() * 1200, audioContext.currentTime);
        chirpOsc.frequency.exponentialRampToValueAtTime(600 + Math.random() * 800, audioContext.currentTime + 0.2);
        
        chirpFilter.type = 'highpass';
        chirpFilter.frequency.setValueAtTime(600, audioContext.currentTime);
        
        chirpGain.gain.setValueAtTime(0, audioContext.currentTime);
        chirpGain.gain.linearRampToValueAtTime(0.05, audioContext.currentTime + 0.02);
        chirpGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
        
        chirpOsc.connect(chirpFilter);
        chirpFilter.connect(chirpGain);
        chirpGain.connect(masterGain);
        
        chirpOsc.start();
        chirpOsc.stop(audioContext.currentTime + 0.3);
      };
      
      const birdInterval = setInterval(() => {
        if (Math.random() < 0.3) createBirdChirp();
      }, 2000 + Math.random() * 3000);
      
      intervals.push(birdInterval);
      break;

    case 'rain':
      // Enhanced rain with multiple layers
      const rainNoise = createWhiteNoise(audioContext);
      const rainSource = audioContext.createBufferSource();
      rainSource.buffer = rainNoise;
      rainSource.loop = true;
      
      const rainFilter = audioContext.createBiquadFilter();
      rainFilter.type = 'bandpass';
      rainFilter.frequency.setValueAtTime(2000, audioContext.currentTime);
      rainFilter.Q.setValueAtTime(0.5, audioContext.currentTime);
      
      const rainGain = audioContext.createGain();
      rainGain.gain.setValueAtTime(0.15, audioContext.currentTime);
      
      // Add gentle modulation for rain intensity
      const rainLfo = audioContext.createOscillator();
      const rainLfoGain = audioContext.createGain();
      rainLfo.frequency.setValueAtTime(0.3, audioContext.currentTime);
      rainLfoGain.gain.setValueAtTime(0.03, audioContext.currentTime);
      
      rainLfo.connect(rainLfoGain);
      rainLfoGain.connect(rainGain.gain);
      
      rainSource.connect(rainFilter);
      rainFilter.connect(rainGain);
      rainGain.connect(masterGain);
      
      sources.push(rainSource, rainLfo);
      break;

    case 'fireplace':
      // Enhanced crackling fire with random pops
      const fireNoise = createPinkNoise(audioContext);
      const fireSource = audioContext.createBufferSource();
      fireSource.buffer = fireNoise;
      fireSource.loop = true;
      
      const fireFilter = audioContext.createBiquadFilter();
      fireFilter.type = 'lowpass';
      fireFilter.frequency.setValueAtTime(600, audioContext.currentTime);
      fireFilter.Q.setValueAtTime(1.5, audioContext.currentTime);
      
      const fireGain = audioContext.createGain();
      fireGain.gain.setValueAtTime(0.18, audioContext.currentTime);
      
      fireSource.connect(fireFilter);
      fireFilter.connect(fireGain);
      fireGain.connect(masterGain);
      
      sources.push(fireSource);
      
      // Add random crackling pops
      const createCrackle = () => {
        const crackleOsc = audioContext.createOscillator();
        const crackleGain = audioContext.createGain();
        const crackleFilter = audioContext.createBiquadFilter();
        
        crackleOsc.type = 'square';
        crackleOsc.frequency.setValueAtTime(100 + Math.random() * 200, audioContext.currentTime);
        
        crackleFilter.type = 'bandpass';
        crackleFilter.frequency.setValueAtTime(400 + Math.random() * 600, audioContext.currentTime);
        crackleFilter.Q.setValueAtTime(2, audioContext.currentTime);
        
        crackleGain.gain.setValueAtTime(0, audioContext.currentTime);
        crackleGain.gain.linearRampToValueAtTime(0.08, audioContext.currentTime + 0.01);
        crackleGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.15);
        
        crackleOsc.connect(crackleFilter);
        crackleFilter.connect(crackleGain);
        crackleGain.connect(masterGain);
        
        crackleOsc.start();
        crackleOsc.stop(audioContext.currentTime + 0.15);
      };
      
      const crackleInterval = setInterval(() => {
        if (Math.random() < 0.4) createCrackle();
      }, 800 + Math.random() * 1200);
      
      intervals.push(crackleInterval);
      break;

    case 'lofi':
      // Enhanced lofi with bass, drums, and vinyl crackle
      const createDrum = (time: number, freq: number = 60) => {
        const drumOsc = audioContext.createOscillator();
        const drumGain = audioContext.createGain();
        
        drumOsc.frequency.setValueAtTime(freq, audioContext.currentTime + time);
        drumOsc.frequency.exponentialRampToValueAtTime(freq * 0.7, audioContext.currentTime + time + 0.1);
        
        drumGain.gain.setValueAtTime(0, audioContext.currentTime + time);
        drumGain.gain.linearRampToValueAtTime(0.25, audioContext.currentTime + time + 0.01);
        drumGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + time + 0.3);
        
        drumOsc.connect(drumGain);
        drumGain.connect(masterGain);
        
        drumOsc.start(audioContext.currentTime + time);
        drumOsc.stop(audioContext.currentTime + time + 0.3);
      };
      
      const createBass = (time: number, freq: number) => {
        const bassOsc = audioContext.createOscillator();
        const bassGain = audioContext.createGain();
        const bassFilter = audioContext.createBiquadFilter();
        
        bassOsc.type = 'sawtooth';
        bassOsc.frequency.setValueAtTime(freq, audioContext.currentTime + time);
        
        bassFilter.type = 'lowpass';
        bassFilter.frequency.setValueAtTime(200, audioContext.currentTime + time);
        bassFilter.Q.setValueAtTime(1, audioContext.currentTime + time);
        
        bassGain.gain.setValueAtTime(0, audioContext.currentTime + time);
        bassGain.gain.linearRampToValueAtTime(0.15, audioContext.currentTime + time + 0.05);
        bassGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + time + 0.8);
        
        bassOsc.connect(bassFilter);
        bassFilter.connect(bassGain);
        bassGain.connect(masterGain);
        
        bassOsc.start(audioContext.currentTime + time);
        bassOsc.stop(audioContext.currentTime + time + 0.8);
      };
      
      // Add vinyl crackle
      const vinylNoise = createPinkNoise(audioContext);
      const vinylSource = audioContext.createBufferSource();
      vinylSource.buffer = vinylNoise;
      vinylSource.loop = true;
      
      const vinylFilter = audioContext.createBiquadFilter();
      vinylFilter.type = 'highpass';
      vinylFilter.frequency.setValueAtTime(3000, audioContext.currentTime);
      
      const vinylGain = audioContext.createGain();
      vinylGain.gain.setValueAtTime(0.03, audioContext.currentTime);
      
      vinylSource.connect(vinylFilter);
      vinylFilter.connect(vinylGain);
      vinylGain.connect(masterGain);
      
      sources.push(vinylSource);
      
      // Create beat pattern
      let beatCount = 0;
      const beatInterval = setInterval(() => {
        createDrum(0, 60); // Kick
        createDrum(0.5, 120); // Snare
        
        // Bass pattern (every 4th beat)
        if (beatCount % 4 === 0) {
          createBass(0, 65);
          createBass(0.75, 55);
        }
        
        beatCount++;
      }, 1000);
      
      intervals.push(beatInterval);
      break;

    case 'cozy-cafe':
      // Enhanced café ambience with subtle chatter simulation
      const cafeNoise = createPinkNoise(audioContext);
      const cafeSource = audioContext.createBufferSource();
      cafeSource.buffer = cafeNoise;
      cafeSource.loop = true;
      
      const cafeFilter = audioContext.createBiquadFilter();
      cafeFilter.type = 'bandpass';
      cafeFilter.frequency.setValueAtTime(800, audioContext.currentTime);
      cafeFilter.Q.setValueAtTime(0.8, audioContext.currentTime);
      
      const cafeGain = audioContext.createGain();
      cafeGain.gain.setValueAtTime(0.08, audioContext.currentTime);
      
      // Add gentle modulation for conversation murmur
      const cafeLfo = audioContext.createOscillator();
      const cafeLfoGain = audioContext.createGain();
      cafeLfo.frequency.setValueAtTime(0.2, audioContext.currentTime);
      cafeLfoGain.gain.setValueAtTime(0.02, audioContext.currentTime);
      
      cafeLfo.connect(cafeLfoGain);
      cafeLfoGain.connect(cafeGain.gain);
      
      cafeSource.connect(cafeFilter);
      cafeFilter.connect(cafeGain);
      cafeGain.connect(masterGain);
      
      sources.push(cafeSource, cafeLfo);
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
