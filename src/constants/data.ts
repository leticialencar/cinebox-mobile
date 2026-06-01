export type Movie = {
  id: number;
  title: string;
  poster: string | null;
  vote_average: string;
  media_type: 'movie' | 'tv';
};

export const FEATURES = [
  {
    id: 'ratings',
    icon: 'star' as const,
    title: 'Avaliações',
    description: '1 a 5 estrelas + resenha',
  },
  {
    id: 'favorites',
    icon: 'heart' as const,
    title: 'Favoritos',
    description: 'Salve o que te marcou',
  },
  {
    id: 'trailers',
    icon: 'player-play' as const,
    title: 'Trailers',
    description: 'Direto na página do filme',
  },
  {
    id: 'info',
    icon: 'database' as const,
    title: 'Info completa',
    description: 'Elenco, direção e mais',
  },
] as const;