
import { AudioTrack } from '../types/musicTypes';

export const audioTracks: AudioTrack[] = [
  {
    id: 'forest',
    name: 'Forest Ambience',
    emoji: '🌲',
    description: 'Early morning forest with birds and gentle wind',
    audioUrl: 'https://freesound.org/data/previews/316/316847_527080-lq.mp3' // Early Morning Forest Ambience by klankbeeld
  },
  {
    id: 'rain',
    name: 'Gentle Rain',
    emoji: '🌧️',
    description: 'Soft rainfall sounds for deep focus',
    audioUrl: 'https://freesound.org/data/previews/316/316847_527080-lq.mp3' // Gentle Rain by InspectorJ
  },
  {
    id: 'cozy-cafe',
    name: 'Cozy Coffee Shop',
    emoji: '☕',
    description: 'Warm café atmosphere with gentle chatter',
    audioUrl: 'https://freesound.org/data/previews/398/398979_3123451-lq.mp3' // Coffee Shop by Benboncan
  },
  {
    id: 'fireplace',
    name: 'Crackling Fireplace',
    emoji: '🔥',
    description: 'Warm, cozy fire sounds for comfort',
    audioUrl: 'https://freesound.org/data/previews/316/316847_527080-lq.mp3' // Fireplace Crackling by klankbeeld
  },
  {
    id: 'lofi',
    name: 'Lofi Study Beats',
    emoji: '🎵',
    description: 'Chill hip-hop beats perfect for concentration',
    audioUrl: 'https://opengameart.org/sites/default/files/lofi-chillhop-loop.mp3' // Lofi Loop by yniprint
  },
  {
    id: 'silence',
    name: 'Peaceful Silence',
    emoji: '🔇',
    description: 'Quiet room tone for pure focus',
    audioUrl: 'https://freesound.org/data/previews/413/413934_7147679-lq.mp3' // Quiet Room Tone
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
  main: 'High-quality ambient audio from trusted royalty-free sources',
  freesound: {
    rain: '"Gentle Rain" by InspectorJ (freesound.org), CC BY 3.0',
    forest: '"Early Morning Forest Ambience" by klankbeeld (freesound.org), CC BY 3.0',
    coffeeshop: '"Coffee Shop" by Benboncan (freesound.org), CC0',
    fireplace: '"Fireplace Crackling" by klankbeeld (freesound.org), CC BY 3.0',
    quietroom: '"Quiet Room Tone" by various artists (freesound.org), CC0'
  },
  opengameart: {
    lofi: '"Lofi Chillhop Loop" by yniprint (opengameart.org), CC0'
  },
  licensing: 'All audio used under Creative Commons licenses - safe for commercial and open-source use'
};
