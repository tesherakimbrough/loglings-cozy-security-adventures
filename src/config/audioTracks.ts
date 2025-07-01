
import { AudioTrack } from '../types/musicTypes';

export const audioTracks: AudioTrack[] = [
  {
    id: 'forest',
    name: 'Forest Ambience',
    emoji: '🌲',
    description: 'Early morning forest with birds and gentle wind',
    audioUrl: '/forest-ambience.wav'
  },
  {
    id: 'rain',
    name: 'Gentle Rain',
    emoji: '🌧️',
    description: 'Soft rainfall sounds for deep focus',
    audioUrl: '/gentle-rain.wav'
  },
  {
    id: 'cozy-cafe',
    name: 'Cozy Coffee Shop',
    emoji: '☕',
    description: 'Warm café atmosphere with gentle chatter',
    audioUrl: '/cozy-cafe.mp3'
  },
  {
    id: 'fireplace',
    name: 'Crackling Fireplace',
    emoji: '🔥',
    description: 'Warm, cozy fire sounds for comfort',
    audioUrl: '/fireplace.mp3'
  },
  {
    id: 'lofi',
    name: 'Lofi Study Beats',
    emoji: '🎵',
    description: 'Chill hip-hop beats perfect for concentration',
    audioUrl: '/lofi-beats.mp3'
  },
  {
    id: 'lofi-beats',
    name: 'Lofi Hip Hop',
    emoji: '🎶',
    description: 'Modern lofi beats for productivity',
    audioUrl: '' // Will fall back to silence mode
  },
  {
    id: 'forest-ambience',
    name: 'Deep Forest',
    emoji: '🌿',
    description: 'Rich forest soundscape with wildlife',
    audioUrl: '' // Will fall back to silence mode
  },
  {
    id: 'silence',
    name: 'Peaceful Silence',
    emoji: '🔇',
    description: 'Quiet room tone for pure focus',
    audioUrl: '/silence.wav'
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
  main: 'Ambient sounds by InspectorJ, klankbeeld, Benboncan (freesound.org), and yniprint (opengameart.org)',
  licensing: 'Licensed under CC BY 3.0 or CC0',
  technical: 'High-quality audio files with seamless looping and crossfade technology'
};
