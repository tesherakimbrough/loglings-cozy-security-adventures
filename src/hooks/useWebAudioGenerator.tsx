
import { useState, useEffect, useRef, useCallback } from 'react';

interface AudioNode {
  oscillator?: OscillatorNode;
  gainNode?: GainNode;
  filterNode?: BiquadFilterNode;
  noiseNode?: AudioBufferSourceNode;
}

export const useWebAudioGenerator = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const audioContext = useRef<AudioContext | null>(null);
  const audioNodes = useRef<Map<string, AudioNode[]>>(new Map());

  const initAudioContext = useCallback(() => {
    if (!audioContext.current) {
      audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContext.current;
  }, []);

  const createNoiseBuffer = useCallback((context: AudioContext, type: 'white' | 'pink' | 'brown' = 'pink') => {
    const bufferSize = context.sampleRate * 2;
    const buffer = context.createBuffer(1, bufferSize, context.sampleRate);
    const output = buffer.getChannelData(0);

    if (type === 'white') {
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
    } else if (type === 'pink') {
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        output[i] *= 0.11;
        b6 = white * 0.115926;
      }
    } else if (type === 'brown') {
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5;
      }
    }

    return buffer;
  }, []);

  const generateForestAmbience = useCallback((context: AudioContext) => {
    const nodes: AudioNode[] = [];

    // Wind through trees (filtered noise)
    const windNoise = context.createBufferSource();
    windNoise.buffer = createNoiseBuffer(context, 'pink');
    windNoise.loop = true;
    
    const windFilter = context.createBiquadFilter();
    windFilter.type = 'lowpass';
    windFilter.frequency.setValueAtTime(800, context.currentTime);
    windFilter.Q.setValueAtTime(0.5, context.currentTime);
    
    const windGain = context.createGain();
    windGain.gain.setValueAtTime(0.1, context.currentTime);
    
    windNoise.connect(windFilter);
    windFilter.connect(windGain);
    windGain.connect(context.destination);
    
    nodes.push({ noiseNode: windNoise, filterNode: windFilter, gainNode: windGain });

    // Bird calls (oscillators with modulation)
    for (let i = 0; i < 3; i++) {
      const birdOsc = context.createOscillator();
      const birdGain = context.createGain();
      const birdFilter = context.createBiquadFilter();
      
      birdOsc.type = 'sine';
      birdOsc.frequency.setValueAtTime(800 + Math.random() * 1200, context.currentTime);
      birdFilter.type = 'bandpass';
      birdFilter.frequency.setValueAtTime(1000 + Math.random() * 500, context.currentTime);
      birdGain.gain.setValueAtTime(0, context.currentTime);
      
      // Random bird chirps
      const chirpInterval = 3000 + Math.random() * 5000;
      setInterval(() => {
        if (birdGain.gain.value !== undefined) {
          birdGain.gain.setValueAtTime(0.05, context.currentTime);
          birdGain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.5);
        }
      }, chirpInterval);
      
      birdOsc.connect(birdFilter);
      birdFilter.connect(birdGain);
      birdGain.connect(context.destination);
      
      nodes.push({ oscillator: birdOsc, gainNode: birdGain, filterNode: birdFilter });
    }

    return nodes;
  }, [createNoiseBuffer]);

  const generateRainSound = useCallback((context: AudioContext) => {
    const nodes: AudioNode[] = [];

    // Rain (filtered white noise)
    const rainNoise = context.createBufferSource();
    rainNoise.buffer = createNoiseBuffer(context, 'white');
    rainNoise.loop = true;
    
    const rainFilter = context.createBiquadFilter();
    rainFilter.type = 'highpass';
    rainFilter.frequency.setValueAtTime(2000, context.currentTime);
    rainFilter.Q.setValueAtTime(0.5, context.currentTime);
    
    const rainGain = context.createGain();
    rainGain.gain.setValueAtTime(0.15, context.currentTime);
    
    rainNoise.connect(rainFilter);
    rainFilter.connect(rainGain);
    rainGain.connect(context.destination);
    
    nodes.push({ noiseNode: rainNoise, filterNode: rainFilter, gainNode: rainGain });

    return nodes;
  }, [createNoiseBuffer]);

  const generateFireplaceSound = useCallback((context: AudioContext) => {
    const nodes: AudioNode[] = [];

    // Fire crackling (filtered brown noise with random pops)
    const fireNoise = context.createBufferSource();
    fireNoise.buffer = createNoiseBuffer(context, 'brown');
    fireNoise.loop = true;
    
    const fireFilter = context.createBiquadFilter();
    fireFilter.type = 'lowpass';
    fireFilter.frequency.setValueAtTime(1500, context.currentTime);
    
    const fireGain = context.createGain();
    fireGain.gain.setValueAtTime(0.1, context.currentTime);
    
    fireNoise.connect(fireFilter);
    fireFilter.connect(fireGain);
    fireGain.connect(context.destination);
    
    nodes.push({ noiseNode: fireNoise, filterNode: fireFilter, gainNode: fireGain });

    // Random pops
    const popGain = context.createGain();
    popGain.gain.setValueAtTime(0, context.currentTime);
    popGain.connect(context.destination);
    
    const createPop = () => {
      const popOsc = context.createOscillator();
      popOsc.type = 'square';
      popOsc.frequency.setValueAtTime(100 + Math.random() * 200, context.currentTime);
      popOsc.connect(popGain);
      
      popGain.gain.setValueAtTime(0.03, context.currentTime);
      popGain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.1);
      
      popOsc.start();
      popOsc.stop(context.currentTime + 0.1);
      
      setTimeout(createPop, 2000 + Math.random() * 8000);
    };
    
    createPop();
    nodes.push({ gainNode: popGain });

    return nodes;
  }, [createNoiseBuffer]);

  const generateCoffeShopAmbience = useCallback((context: AudioContext) => {
    const nodes: AudioNode[] = [];

    // Background chatter (filtered pink noise)
    const chatterNoise = context.createBufferSource();
    chatterNoise.buffer = createNoiseBuffer(context, 'pink');
    chatterNoise.loop = true;
    
    const chatterFilter = context.createBiquadFilter();
    chatterFilter.type = 'bandpass';
    chatterFilter.frequency.setValueAtTime(500, context.currentTime);
    chatterFilter.Q.setValueAtTime(2, context.currentTime);
    
    const chatterGain = context.createGain();
    chatterGain.gain.setValueAtTime(0.08, context.currentTime);
    
    chatterNoise.connect(chatterFilter);
    chatterFilter.connect(chatterGain);
    chatterGain.connect(context.destination);
    
    nodes.push({ noiseNode: chatterNoise, filterNode: chatterFilter, gainNode: chatterGain });

    return nodes;
  }, [createNoiseBuffer]);

  const generateLofiBeats = useCallback((context: AudioContext) => {
    const nodes: AudioNode[] = [];

    // Simple kick drum (low sine wave)
    const kickGain = context.createGain();
    kickGain.gain.setValueAtTime(0, context.currentTime);
    kickGain.connect(context.destination);
    
    const createKick = () => {
      const kickOsc = context.createOscillator();
      kickOsc.type = 'sine';
      kickOsc.frequency.setValueAtTime(60, context.currentTime);
      kickOsc.connect(kickGain);
      
      kickGain.gain.setValueAtTime(0.3, context.currentTime);
      kickGain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.3);
      
      kickOsc.start();
      kickOsc.stop(context.currentTime + 0.3);
    };
    
    // Simple melody
    const melodyGain = context.createGain();
    melodyGain.gain.setValueAtTime(0.1, context.currentTime);
    melodyGain.connect(context.destination);
    
    const notes = [220, 246.94, 277.18, 293.66, 329.63]; // A, B, C#, D, E
    let noteIndex = 0;
    
    const playNote = () => {
      const noteOsc = context.createOscillator();
      noteOsc.type = 'triangle';
      noteOsc.frequency.setValueAtTime(notes[noteIndex], context.currentTime);
      noteOsc.connect(melodyGain);
      
      noteOsc.start();
      noteOsc.stop(context.currentTime + 0.5);
      
      noteIndex = (noteIndex + 1) % notes.length;
    };
    
    // Start patterns
    const kickInterval = setInterval(createKick, 800);
    const melodyInterval = setInterval(playNote, 1600);
    
    nodes.push({ 
      gainNode: kickGain,
      oscillator: undefined // Store intervals for cleanup
    });

    return nodes;
  }, []);

  const playTrack = useCallback(async (trackId: string, volume: number = 0.3) => {
    const context = initAudioContext();
    
    if (context.state === 'suspended') {
      await context.resume();
    }

    // Stop current track
    if (currentTrack && audioNodes.current.has(currentTrack)) {
      const nodes = audioNodes.current.get(currentTrack)!;
      nodes.forEach(node => {
        if (node.oscillator) {
          node.oscillator.stop();
        }
        if (node.noiseNode) {
          node.noiseNode.stop();
        }
      });
      audioNodes.current.delete(currentTrack);
    }

    if (trackId === 'silence' || trackId === 'external') {
      setCurrentTrack(trackId);
      setIsPlaying(true);
      return;
    }

    let nodes: AudioNode[] = [];

    switch (trackId) {
      case 'forest':
        nodes = generateForestAmbience(context);
        break;
      case 'rain':
        nodes = generateRainSound(context);
        break;
      case 'fireplace':
        nodes = generateFireplaceSound(context);
        break;
      case 'cozy-cafe':
        nodes = generateCoffeShopAmbience(context);
        break;
      case 'lofi':
        nodes = generateLofiBeats(context);
        break;
    }

    // Start all nodes and adjust volume
    nodes.forEach(node => {
      if (node.gainNode) {
        node.gainNode.gain.setValueAtTime(node.gainNode.gain.value * volume, context.currentTime);
      }
      if (node.oscillator) {
        node.oscillator.start();
      }
      if (node.noiseNode) {
        node.noiseNode.start();
      }
    });

    audioNodes.current.set(trackId, nodes);
    setCurrentTrack(trackId);
    setIsPlaying(true);
  }, [currentTrack, initAudioContext, generateForestAmbience, generateRainSound, generateFireplaceSound, generateCoffeShopAmbience, generateLofiBeats]);

  const stopMusic = useCallback(() => {
    if (currentTrack && audioNodes.current.has(currentTrack)) {
      const nodes = audioNodes.current.get(currentTrack)!;
      nodes.forEach(node => {
        try {
          if (node.oscillator) {
            node.oscillator.stop();
          }
          if (node.noiseNode) {
            node.noiseNode.stop();
          }
        } catch (error) {
          // Node might already be stopped
        }
      });
      audioNodes.current.delete(currentTrack);
    }
    
    setCurrentTrack(null);
    setIsPlaying(false);
  }, [currentTrack]);

  const updateVolume = useCallback((volume: number) => {
    if (currentTrack && audioNodes.current.has(currentTrack)) {
      const nodes = audioNodes.current.get(currentTrack)!;
      nodes.forEach(node => {
        if (node.gainNode) {
          node.gainNode.gain.setValueAtTime(volume, audioContext.current!.currentTime);
        }
      });
    }
  }, [currentTrack]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      audioNodes.current.forEach(nodes => {
        nodes.forEach(node => {
          try {
            if (node.oscillator) {
              node.oscillator.stop();
            }
            if (node.noiseNode) {
              node.noiseNode.stop();
            }
          } catch (error) {
            // Ignore cleanup errors
          }
        });
      });
      
      if (audioContext.current) {
        audioContext.current.close();
      }
    };
  }, []);

  return {
    isPlaying,
    currentTrack,
    playTrack,
    stopMusic,
    updateVolume
  };
};
