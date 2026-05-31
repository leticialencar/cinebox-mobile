import { HomeHero } from '@/components/home/HomeHero';
import { Section } from '@/components/home/Section';
import { UpcomingSection } from '@/components/home/UpcomingSection';
import { TopBar } from '@/components/navigation/TopBar';
import { api } from '@/services/api';
import Storage from '@/utils/storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import type { MediaItem } from '../../types/media';

const BG = '#080511';
const PURPLE = '#7c3aed';

export default function HomeScreen() {
  const router = useRouter();
  const [popular, setPopular] = useState<MediaItem[]>([]);
  const [featured, setFeatured] = useState<MediaItem | null>(null);
  const [savedIds, setSavedIds] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchData(); }, []);

  async function fetchData() {
    try {
      const token = await Storage.get('token');
      const headers = { Authorization: `Bearer ${token}` };

      const [{ data: popularData }, { data: collection }] = await Promise.all([
        api.get('/media/popular', { headers }),
        api.get('/movies', { headers }),
      ]);

      setPopular(popularData);
      setFeatured(popularData.find((m: MediaItem) => m.backdrop) ?? popularData[0] ?? null);

      const ids = new Set<number>(
        (collection.collection ?? collection).map((m: any) => Number(m.tmdb_id))
      );
      setSavedIds(ids);
    } catch {
    } finally {
      setLoading(false);
    }
  }

  function goToDetail(id: number, type: 'movie' | 'tv') {
    router.push(`/(protected)/${type}/${id}` as any);
  }

  const movies = popular.filter((m) => m.media_type === 'movie');
  const shows = popular.filter((m) => m.media_type === 'tv');

  if (loading) return (
    <View style={s.center}><ActivityIndicator color={PURPLE} size="large" /></View>
  );

  return (
    <View style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <TopBar />

      <ScrollView showsVerticalScrollIndicator={false}>
        {featured && (
          <HomeHero
            item={{ ...featured, inCollection: savedIds.has(featured.id) }}
            onPress={() => goToDetail(featured.id, featured.media_type)}
          />
        )}

        <Section title="Mais assistidos agora" data={popular} onPress={goToDetail} />
        <Section title="Talvez você curta" data={movies} onPress={goToDetail} />
        <Section title="Séries em alta" data={shows} onPress={goToDetail} />
        <View style={{ height: 40 }} />
        <UpcomingSection onPress={(id) => goToDetail(id, 'movie')} />
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: BG },
  center: { flex: 1, backgroundColor: BG, alignItems: 'center', justifyContent: 'center' },
});