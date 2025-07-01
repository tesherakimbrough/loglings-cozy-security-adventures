
/**
 * CANONICAL SOURCE OF TRUTH FOR MUSIC TYPES
 * 
 * When adding new music tracks:
 * 1. Add the ID to the MusicType union below
 * 2. Add the track configuration to audioTracks.ts
 * 3. Ensure all hooks and components import and use this MusicType
 * 
 * This file is the single source of truth for all audio track IDs.
 * Never use raw string literals for track IDs elsewhere in the codebase.
 */

export type MusicType = 
  | 'forest' 
  | 'rain' 
  | 'cozy-cafe' 
  | 'fireplace' 
  | 'lofi' 
  | 'lofi-beats' 
  | 'forest-ambience' 
  | 'silence' 
  | 'external';

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

/**
 * Type guard to check if a string is a valid MusicType
 * Use this when validating user input or API responses
 */
export const isMusicType = (value: string): value is MusicType => {
  const validTypes: MusicType[] = [
    'forest', 'rain', 'cozy-cafe', 'fireplace', 'lofi', 
    'lofi-beats', 'forest-ambience', 'silence', 'external'
  ];
  return validTypes.includes(value as MusicType);
};

/**
 * Default music type for new users or fallback scenarios
 */
export const DEFAULT_MUSIC_TYPE: MusicType = 'silence';
