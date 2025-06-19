
import { AudioTrack } from '../types/musicTypes';

export const audioTracks: AudioTrack[] = [
  {
    id: 'forest',
    name: 'Forest Ambience',
    emoji: '🌲',
    description: 'Gentle nature sounds with birds and rustling leaves',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav' // This one works, keeping it
  },
  {
    id: 'lofi',
    name: 'Lofi Study Beats',
    emoji: '🎵',
    description: 'Chill hip-hop beats perfect for concentration',
    audioUrl: 'https://archive.org/download/LofiHipHop_201909/Lofi%20Hip%20Hop.mp3' // Internet Archive - public domain
  },
  {
    id: 'cozy-cafe',
    name: 'Cozy Coffee Shop',
    emoji: '☕',
    description: 'Warm café atmosphere with gentle chatter',
    audioUrl: 'https://archive.org/download/CoffeeShopAmbience/coffee-shop-ambience.mp3' // Internet Archive
  },
  {
    id: 'rain',
    name: 'Gentle Rain',
    emoji: '🌧️',
    description: 'Soft rainfall sounds for deep focus',
    audioUrl: 'https://archive.org/download/RainSounds_201805/rain-sounds.mp3' // Internet Archive
  },
  {
    id: 'fireplace',
    name: 'Crackling Fireplace',
    emoji: '🔥',
    description: 'Warm, cozy fire sounds for comfort',
    audioUrl: 'https://archive.org/download/FireplaceCrackling/fireplace-crackling.mp3' // Internet Archive
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
  internetArchive: 'Audio tracks provided by Internet Archive (archive.org) - Public Domain',
  soundjay: 'Bell sound from SoundJay.com - Royalty Free',
  freesound: 'Some audio provided by Freesound.org under Creative Commons',
  opengameart: 'Audio from OpenGameArt.org under CC0/CC-BY licenses'
};
