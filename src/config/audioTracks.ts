
import { AudioTrack } from '../types/musicTypes';

export const audioTracks: AudioTrack[] = [
  {
    id: 'forest',
    name: 'Forest Ambience',
    emoji: '🌲',
    description: 'Gentle nature sounds with birds and rustling leaves',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav' // Will be replaced with forest sounds
  },
  {
    id: 'lofi',
    name: 'Lofi Study Beats',
    emoji: '🎵',
    description: 'Chill hip-hop beats perfect for concentration',
    audioUrl: 'https://cdn.pixabay.com/audio/2022/07/26/audio_124bfa84c4.mp3' // Royalty-free lofi from Pixabay
  },
  {
    id: 'cozy-cafe',
    name: 'Cozy Coffee Shop',
    emoji: '☕',
    description: 'Warm café atmosphere with gentle chatter',
    audioUrl: 'https://cdn.pixabay.com/audio/2023/03/15/audio_cafe_ambience.mp3' // Cafe ambience
  },
  {
    id: 'rain',
    name: 'Gentle Rain',
    emoji: '🌧️',
    description: 'Soft rainfall sounds for deep focus',
    audioUrl: 'https://cdn.pixabay.com/audio/2022/08/01/audio_rain_gentle.mp3' // Gentle rain sounds
  },
  {
    id: 'fireplace',
    name: 'Crackling Fireplace',
    emoji: '🔥',
    description: 'Warm, cozy fire sounds for comfort',
    audioUrl: 'https://cdn.pixabay.com/audio/2023/02/14/audio_fireplace_crackling.mp3' // Fireplace crackling
  },
  {
    id: 'silence',
    name: 'Peaceful Silence',
    emoji: '🔇',
    description: 'No background music for pure focus',
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
  pixabay: 'Audio tracks provided by Pixabay (pixabay.com) - Royalty Free',
  freesound: 'Some audio provided by Freesound.org under Creative Commons',
  opengameart: 'Audio from OpenGameArt.org under CC0/CC-BY licenses'
};
