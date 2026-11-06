export const PHOTO_RATIOS = {
  '1x1': { width: 800, height: 800 },
} as const;

export type PhotoRatio = keyof typeof PHOTO_RATIOS;

export const eventPhotos: Record<string, string[]> = {
  'scary-things': ['masks', 'skeleton', 'pumpkins', 'poster'],
  'experimental-cinema-day': ['notes', 'audience', 'screen', 'table'],
  'animation-workshop': ['poster', 'talk'],
  housewarming: ['clay', 'apples', 'room'],
};

export function eventPhotoSrc(eventId: string, name: string, ratio: PhotoRatio) {
  return `${import.meta.env.BASE_URL}images/events/past/${eventId}-${name}-${ratio}.webp`;
}
