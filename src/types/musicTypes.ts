
export type MusicType = 'forest' | 'rain' | 'cozy-cafe' | 'fireplace' | 'lofi' | 'silence' | 'external';

export interface AudioTrack {
  id: MusicType;
  name: string;
  emoji: string;
  description: string;
  audioUrl: string;
}

export interface AudioPreset {
  id: string;
  name: string;
  emoji: string;
  description: string;
  tracks: MusicType[];
  volumes: Record<string, number>;
}
