import Storage from '@/utils/storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Platform, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import type { Movie, Filter, Sort } from '@/types/collection';

import { CollectionEmpty }  from '@/components/collection/CollectionEmpty';
import { CollectionGrid }   from '@/components/collection/CollectionGrid';
import { CollectionHeader } from '@/components/collection/CollectionHeader';
import { CollectionList }   from '@/components/collection/CollectionList';

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const BG      = '#080511';
const PURPLE  = '#7c3aed';

export default function CollectionScreen() {
  const router = useRouter();
  const [movies,   setMovies]   = useState<Movie[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [search,   setSearch]   = useState('');
  const [filter,   setFilter]   = useState<Filter>('all');
  const [sort,     setSort]     = useState<Sort>('recent');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => { fetchCollection(); }, []);

  async function fetchCollection() {
    try {
      const token = await Storage.get('token');
      const res   = await fetch(`${API_URL}/movies`, {
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
      });
      const data = await res.json();
      setMovies(data.collection ?? data);
    } catch {
    } finally {
      setLoading(false);
    }
  }

  function goToDetail(item: Movie) {
  console.log('item:', JSON.stringify(item));
  router.push(`/${item.media_type}/${item.tmdb_id}` as any);
}

  const filtered = movies
    .filter((m) => {
      if (search && !m.title.toLowerCase().includes(search.toLowerCase())) return false;
      if (filter === 'favorite') return m.is_favorite;
      if (filter === 'rated')    return !!m.user_rating;
      if (filter === 'unrated')  return !m.user_rating;
      if (filter === 'movie')    return m.media_type === 'movie';
      if (filter === 'tv')       return m.media_type === 'tv';
      return true;
    })
    .sort((a, b) => {
      if (sort === 'title')  return a.title.localeCompare(b.title);
      if (sort === 'rating') return (b.user_rating ?? 0) - (a.user_rating ?? 0);
      if (sort === 'year')   return (b.release_year ?? 0) - (a.release_year ?? 0);
      return b.id - a.id;
    });

  if (loading) return (
    <View style={s.center}><ActivityIndicator color={PURPLE} size="large" /></View>
  );

  return (
    <View style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <ScrollView showsVerticalScrollIndicator={false} stickyHeaderIndices={[0]}>
        <CollectionHeader
          total={movies.length}
          search={search}
          filter={filter}
          sort={sort}
          viewMode={viewMode}
          onSearch={setSearch}
          onFilter={setFilter}
          onSort={setSort}
          onViewMode={setViewMode}
        />

        {filtered.length === 0 && (
          <CollectionEmpty
            isEmpty={movies.length === 0}
            onClear={() => { setFilter('all'); setSearch(''); }}
          />
        )}

        {viewMode === 'grid' && filtered.length > 0 && (
          <CollectionGrid data={filtered} onPress={goToDetail} />
        )}

        {viewMode === 'list' && filtered.length > 0 && (
          <CollectionList data={filtered} onPress={goToDetail} />
        )}

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root:   { flex: 1, backgroundColor: BG },
  center: { flex: 1, backgroundColor: BG, alignItems: 'center', justifyContent: 'center' },
});