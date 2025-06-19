
import { AudioTrack } from '../types/musicTypes';

export const audioTracks: AudioTrack[] = [
  {
    id: 'forest',
    name: 'Forest Ambience',
    emoji: '🌲',
    description: 'Birds chirping with gentle wind through leaves',
    audioUrl: ''
  },
  {
    id: 'rain',
    name: 'Gentle Rain',
    emoji: '🌧️',
    description: 'Soft rainfall for deep focus and relaxation',
    audioUrl: ''
  },
  {
    id: 'cozy-cafe',
    name: 'Cozy Coffee Shop',
    emoji: '☕',
    description: 'Warm café atmosphere with gentle ambience',
    audioUrl: ''
  },
  {
    id: 'fireplace',
    name: 'Crackling Fireplace',
    emoji: '🔥',
    description: 'Warm, cozy fire crackling sounds',
    audioUrl: ''
  },
  {
    id: 'lofi',
    name: 'Lofi Study Beats',
    emoji: '🎵',
    description: 'Soft synthesized beats for concentration',
    audioUrl: ''
  },
  {
    id: 'silence',
    name: 'Peaceful Silence',
    emoji: '🔇',
    description: 'Subtle room tone for pure focus',
    audioUrl: ''
  },
  {
    id: 'external',
    name: 'Your Music',
    emoji: '🎧',
    description: 'Use Apple Music, Spotify, or your own playlist',
    audioUrl: ''
  }
];

// Preset combinations for enhanced user experience
export const audioPresets = [
  {
    id: 'rainy-forest',
    name: 'Rainy Forest Cabin',
    emoji: '🌲🌧️',
    description: 'Rain with forest ambience',
    tracks: ['rain', 'forest'],
    volumes: { rain: 0.7, forest: 0.4 }
  },
  {
    id: 'cozy-study',
    name: 'Cozy Study Night',
    emoji: '☕🎵',
    description: 'Coffee shop with lo-fi beats',
    tracks: ['cozy-cafe', 'lofi'],
    volumes: { 'cozy-cafe': 0.5, lofi: 0.6 }
  },
  {
    id: 'fireside-rain',
    name: 'Fireside Evening',
    emoji: '🔥🌧️',
    description: 'Fireplace with gentle rain outside',
    tracks: ['fireplace', 'rain'],
    volumes: { fireplace: 0.8, rain: 0.3 }
  }
];

export const audioCredits = {
  main: 'Ambient audio generated using Web Audio API for legal, high-quality soundscapes',
  note: 'All sounds are procedurally generated or synthesized using browser technology',
  licensing: 'Generated audio is royalty-free and safe for all uses',
  technology: 'Powered by Web Audio API, Tone.js, and custom sound synthesis'
};
