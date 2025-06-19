
import { AudioTrack } from '../types/musicTypes';

export const audioTracks: AudioTrack[] = [
  {
    id: 'forest',
    name: 'Forest Ambience',
    emoji: '🌲',
    description: 'Early morning forest with birds and gentle wind',
    audioUrl: '' // Generated procedurally
  },
  {
    id: 'rain',
    name: 'Gentle Rain',
    emoji: '🌧️',
    description: 'Soft rainfall sounds for deep focus',
    audioUrl: '' // Generated procedurally
  },
  {
    id: 'cozy-cafe',
    name: 'Cozy Coffee Shop',
    emoji: '☕',
    description: 'Warm café atmosphere with gentle chatter',
    audioUrl: '' // Generated procedurally
  },
  {
    id: 'fireplace',
    name: 'Crackling Fireplace',
    emoji: '🔥',
    description: 'Warm, cozy fire sounds for comfort',
    audioUrl: '' // Generated procedurally
  },
  {
    id: 'lofi',
    name: 'Lofi Study Beats',
    emoji: '🎵',
    description: 'Chill hip-hop beats perfect for concentration',
    audioUrl: '' // Generated procedurally
  },
  {
    id: 'silence',
    name: 'Peaceful Silence',
    emoji: '🔇',
    description: 'Quiet room tone for pure focus',
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
    id: 'rainy-forest-cabin',
    name: 'Rainy Forest Cabin',
    emoji: '🏡',
    description: 'Perfect storm sounds with crackling fire',
    tracks: ['rain', 'fireplace'],
    volumes: { rain: 0.6, fireplace: 0.4 }
  },
  {
    id: 'cozy-study-night',
    name: 'Cozy Study Night',
    emoji: '📚',
    description: 'Gentle rain with soft lofi beats',
    tracks: ['rain', 'lofi'],
    volumes: { rain: 0.3, lofi: 0.5 }
  },
  {
    id: 'morning-cafe',
    name: 'Morning Café',
    emoji: '🌅',
    description: 'Coffee shop vibes with gentle background',
    tracks: ['cozy-cafe'],
    volumes: { 'cozy-cafe': 0.6 }
  }
];

// Audio attribution for legal compliance
export const audioCredits = {
  main: 'All audio generated procedurally using Web Audio API - 100% original and royalty-free',
  licensing: 'Procedurally generated audio is safe for commercial and open-source use',
  technical: 'Built with Tone.js and Web Audio API for high-quality, browser-native sound synthesis'
};
