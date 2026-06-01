export type Movie = {
  id: number;
  tmdb_id: number;
  title: string;
  poster: string | null;
  release_year: number | null;
  user_rating: number | null;
  is_favorite: boolean;
  media_type: 'movie' | 'tv';
};

export type Filter = 'all' | 'rated' | 'unrated' | 'favorite' | 'movie' | 'tv';
export type Sort   = 'recent' | 'title' | 'rating' | 'year';