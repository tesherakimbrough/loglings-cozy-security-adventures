
import { useRef, useCallback } from 'react';
import * as Tone from 'tone';

export const useWebAudioGenerator = () => {
  const synthsRef = useRef<{ [key: string]: any }>({});
  const noiseRef = useRef<{ [key: string]: any }>({});

  const generateForestAmbience = useCallback(async () => {
    await Tone.start();
    
    // Bird calls with random intervals
    const birdSynth = new Tone.Synth({
      oscillator: { type: 'sine' },
      envelope: { attack: 0.1, decay: 0.3, sustain: 0.1, release: 0.8 }
    }).toDestination();
    
    // Wind sound using filtered noise
    const windNoise = new Tone.Noise('brown').start();
    const windFilter = new Tone.Filter(800, 'lowpass').toDestination();
    windNoise.connect(windFilter);
    windNoise.volume.value = -25;
    
    // Rustling leaves using filtered pink noise
    const leavesNoise = new Tone.Noise('pink').start();
    const leavesFilter = new Tone.Filter(1200, 'bandpass').toDestination();
    leavesNoise.connect(leavesFilter);
    leavesNoise.volume.value = -30;
    
    // Random bird calls
    const birdInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        const note = ['C5', 'D5', 'E5', 'G5'][Math.floor(Math.random() * 4)];
        birdSynth.triggerAttackRelease(note, '0.2');
      }
    }, 2000);
    
    synthsRef.current.forest = { birdSynth, windNoise, leavesNoise, birdInterval };
    return synthsRef.current.forest;
  }, []);

  const generateRainSound = useCallback(async () => {
    await Tone.start();
    
    // Rain using filtered white noise
    const rainNoise = new Tone.Noise('white').start();
    const rainFilter = new Tone.Filter(2000, 'lowpass').toDestination();
    const rainGain = new Tone.Gain(0.3).connect(rainFilter);
    rainNoise.connect(rainGain);
    rainNoise.volume.value = -20;
    
    // Thunder occasionally
    const thunderSynth = new Tone.Synth({
      oscillator: { type: 'sawtooth' },
      envelope: { attack: 0.01, decay: 2, sustain: 0, release: 3 }
    }).toDestination();
    
    const thunderInterval = setInterval(() => {
      if (Math.random() > 0.95) {
        thunderSynth.triggerAttackRelease('C1', '3');
      }
    }, 5000);
    
    synthsRef.current.rain = { rainNoise, thunderSynth, thunderInterval };
    return synthsRef.current.rain;
  }, []);

  const generateFireplaceSound = useCallback(async () => {
    await Tone.start();
    
    // Base fire crackling using filtered brown noise
    const fireNoise = new Tone.Noise('brown').start();
    const fireFilter = new Tone.Filter(800, 'lowpass').toDestination();
    fireNoise.connect(fireFilter);
    fireNoise.volume.value = -22;
    
    // Random pops and crackles
    const popSynth = new Tone.Synth({
      oscillator: { type: 'square' },
      envelope: { attack: 0.001, decay: 0.1, sustain: 0, release: 0.1 }
    }).toDestination();
    
    const popInterval = setInterval(() => {
      if (Math.random() > 0.8) {
        const freq = 100 + Math.random() * 200;
        popSynth.frequency.value = freq;
        popSynth.triggerAttackRelease(freq, '0.05');
      }
    }, 800);
    
    synthsRef.current.fireplace = { fireNoise, popSynth, popInterval };
    return synthsRef.current.fireplace;
  }, []);

  const generateCafeAmbience = useCallback(async () => {
    await Tone.start();
    
    // Coffee machine hiss
    const coffeeMachine = new Tone.Noise('pink').start();
    const coffeeFilter = new Tone.Filter(1500, 'highpass').toDestination();
    coffeeMachine.connect(coffeeFilter);
    coffeeMachine.volume.value = -35;
    
    // Muffled conversations using oscillators
    const chatterOsc = new Tone.Oscillator(120, 'triangle').start();
    const chatterFilter = new Tone.Filter(400, 'lowpass').toDestination();
    const chatterGain = new Tone.Gain(0.1).connect(chatterFilter);
    chatterOsc.connect(chatterGain);
    
    synthsRef.current.cafe = { coffeeMachine, chatterOsc };
    return synthsRef.current.cafe;
  }, []);

  const generateLofiBeats = useCallback(async () => {
    await Tone.start();
    
    // Simple lofi chord progression
    const synth = new Tone.PolySynth().toDestination();
    const reverb = new Tone.Reverb(2).toDestination();
    synth.connect(reverb);
    
    // Low-pass filter for that lofi feel
    const filter = new Tone.Filter(800, 'lowpass').toDestination();
    reverb.connect(filter);
    
    const chords = ['Cmaj7', 'Am7', 'Fmaj7', 'G7'];
    let chordIndex = 0;
    
    const lofiLoop = setInterval(() => {
      const chord = chords[chordIndex];
      synth.triggerAttackRelease([chord], '2n');
      chordIndex = (chordIndex + 1) % chords.length;
    }, 2000);
    
    synthsRef.current.lofi = { synth, lofiLoop };
    return synthsRef.current.lofi;
  }, []);

  const stopAudio = useCallback((trackId: string) => {
    const synths = synthsRef.current[trackId];
    if (synths) {
      Object.values(synths).forEach((synth: any) => {
        if (synth && typeof synth.dispose === 'function') {
          synth.dispose();
        } else if (typeof synth === 'number') {
          clearInterval(synth);
        }
      });
      delete synthsRef.current[trackId];
    }
  }, []);

  const stopAllAudio = useCallback(() => {
    Object.keys(synthsRef.current).forEach(stopAudio);
    Tone.Transport.stop();
  }, [stopAudio]);

  return {
    generateForestAmbience,
    generateRainSound,
    generateFireplaceSound,
    generateCafeAmbience,
    generateLofiBeats,
    stopAudio,
    stopAllAudio
  };
};
