import Storage from '@/utils/storage';
import { api } from '@/services/api';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { FlatList, Platform, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';

import { MediaRow } from '@/components/search/MediaRow';
import { SearchBar } from '@/components/search/SearchBar';
import { SearchEmptyState } from '@/components/search/SearchEmptyState';

const BG = '#080511';
const HDR_TOP = Platform.OS === 'ios' ? 54 : 36;

type MediaItem = {
  id: number;
  title: string;
  media_type: 'movie' | 'tv';
  poster: string | null;
  year?: string;
};

export default function SearchScreen() {
  const router = useRouter();
  const inputRef = useRef<TextInput>(null) as React.RefObject<TextInput>;
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<MediaItem[]>([]);
  const [searching, setSearching] = useState(false);

  async function handleSearch(text: string) {
    setQuery(text);
    if (timeout.current) clearTimeout(timeout.current);
    if (text.length < 2) { setResults([]); return; }

    timeout.current = setTimeout(async () => {
      setSearching(true);
      try {
        const token = await Storage.get('token');
        const { data } = await api.get('/media/search', {
          params: { q: text },
          headers: { Authorization: `Bearer ${token}` },
        });
        setResults(data);
      } catch {
      } finally { setSearching(false); }
    }, 400);
  }

  function goToDetail(id: number, type: 'movie' | 'tv') {
    router.push(`/(protected)/${type}/${id}` as any);
  }

  function clearSearch() {
    setQuery('');
    setResults([]);
  }

  const showInitial = query.length === 0;
  const showResults = query.length >= 2 && results.length > 0;
  const showNoResults = query.length >= 2 && !searching && results.length === 0;

  return (
    <View style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <View style={s.header}>
        <SearchBar
          value={query}
          searching={searching}
          onChangeText={handleSearch}
          onClear={clearSearch}
          inputRef={inputRef}
        />
      </View>

      {showInitial && <SearchEmptyState type="initial" />}
      {showNoResults && <SearchEmptyState type="no-results" />}

      {showResults && (
        <FlatList
          data={results}
          keyExtractor={(item) => `${item.media_type}-${item.id}`}
          contentContainerStyle={s.list}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <Text style={s.sectionLabel}>
              {results.length} resultado{results.length !== 1 ? 's' : ''}
            </Text>
          }
          renderItem={({ item }) => <MediaRow {...item} onPress={goToDetail} />}
        />
      )}
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: BG },
  header: { paddingTop: HDR_TOP, paddingHorizontal: 16, paddingBottom: 12, backgroundColor: BG },
  list: { paddingHorizontal: 16, paddingBottom: 120 },
  sectionLabel: { color: '#fff', fontSize: 15, fontWeight: '700', marginBottom: 12, marginTop: 4 },
});