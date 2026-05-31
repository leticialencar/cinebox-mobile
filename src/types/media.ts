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

export type CastMember = {
  id: number;
  name: string;
  character: string | null;
  profile: string | null;
};

export type UserData = {
  id: number;
  is_favorite: boolean;
  user_rating: number | null;
  review: string | null;
} | null;

export type MediaDetail = {
  type: string;
  title: string;
  description: string;
  poster: string | null;
  backdrop: string | null;
  rating: string;
  release: string | null;
  genres: string;
  director: string;
  writer: string;
  studios: string;
  trailer: string | null;
  hours: number | null;
  minutes: number | null;
  cast: CastMember[];
  userData: UserData;
};