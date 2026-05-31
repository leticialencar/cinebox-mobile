export type MediaItem = {
  id: number;
  title: string;
  poster: string | null;
  backdrop: string | null;
  vote_average: string;
  media_type: 'movie' | 'tv';
};

export type SearchResult = {
  id: number;
  title: string;
  year: string;
  poster: string | null;
  media_type: 'movie' | 'tv';
};