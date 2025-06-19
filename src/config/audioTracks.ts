
import { AudioTrack } from '../types/musicTypes';

export const audioTracks: AudioTrack[] = [
  {
    id: 'forest',
    name: 'Forest Ambience',
    emoji: '🌲',
    description: 'Early morning forest with birds and gentle wind',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav' // Temporary working URL for testing
  },
  {
    id: 'rain',
    name: 'Gentle Rain',
    emoji: '🌧️',
    description: 'Soft rainfall sounds for deep focus',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav' // Temporary working URL for testing
  },
  {
    id: 'cozy-cafe',
    name: 'Cozy Coffee Shop',
    emoji: '☕',
    description: 'Warm café atmosphere with gentle chatter',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav' // Temporary working URL for testing
  },
  {
    id: 'fireplace',
    name: 'Crackling Fireplace',
    emoji: '🔥',
    description: 'Warm, cozy fire sounds for comfort',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav' // Temporary working URL for testing
  },
  {
    id: 'lofi',
    name: 'Lofi Study Beats',
    emoji: '🎵',
    description: 'Chill hip-hop beats perfect for concentration',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav' // Temporary working URL for testing
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

// Audio attribution credits for royalty-free sources
export const audioCredits = {
  main: 'Audio temporarily using test sounds - working on implementing proper ambient tracks',
  note: 'We are working on integrating high-quality ambient audio from trusted royalty-free sources',
  licensing: 'All audio will be used under Creative Commons licenses - safe for commercial and open-source use',
  freesound: {
    rain: 'Rain: "Gentle Rain" by InspectorJ (freesound.org), CC BY 3.0',
    forest: 'Forest: "Early Morning Forest Ambience" by klankbeeld (freesound.org), CC BY 3.0',
    coffeeshop: 'Coffee Shop: "Coffee Shop" by Benboncan (freesound.org), CC0',
    fireplace: 'Fireplace: "Fireplace Crackling" by klankbeeld (freesound.org), CC BY 3.0'
  },
  opengameart: {
    lofi: 'Lo-fi Loop: "Lofi Chillhop Loop" by user yniprint (opengameart.org), CC0'
  }
};
