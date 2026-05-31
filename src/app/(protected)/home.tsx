import { BrandLogo } from '@/components/logo/BrandLogo';
import { HomeHero }   from '@/components/home/HomeHero';
import { Section }    from '@/components/home/Section';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Platform, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import type { MediaItem } from '../../types/media';

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const BG      = '#080511';
const PURPLE  = '#7c3aed';
const HDR_TOP = Platform.OS === 'ios' ? 54 : 36;

export default function HomeScreen() {
  const router = useRouter();
  const [popular, setPopular]   = useState<MediaItem[]>([]);
  const [featured, setFeatured] = useState<MediaItem | null>(null);
  const [loading, setLoading]   = useState(true);

  useEffect(() => { fetchPopular(); }, []);

  async function fetchPopular() {
    try {
      const res  = await fetch(`${API_URL}/media/popular`);
      const data: MediaItem[] = await res.json();
      setPopular(data);
      setFeatured(data.find((m) => m.backdrop) ?? data[0] ?? null);
    } catch {
    } finally { setLoading(false); }
  }

  function goToDetail(id: number, type: 'movie' | 'tv') {
    router.push(`/(protected)/${type}/${id}` as any);
  }

  const movies = popular.filter((m) => m.media_type === 'movie');
  const shows  = popular.filter((m) => m.media_type === 'tv');

  if (loading) return (
    <View style={s.center}><ActivityIndicator color={PURPLE} size="large" /></View>
  );

  return (
    <View style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <View style={s.logoWrapper}>
        <BrandLogo size="sm" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {featured && (
          <HomeHero
            item={featured}
            onPress={() => goToDetail(featured.id, featured.media_type)}
          />
        )}

        <Section title="Mais assistidos agora" data={popular} onPress={goToDetail} />
        <Section title="Talvez você curta"      data={movies}  onPress={goToDetail} />
        <Section title="Séries em alta"          data={shows}   onPress={goToDetail} />

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root:        { flex: 1, backgroundColor: BG },
  center:      { flex: 1, backgroundColor: BG, alignItems: 'center', justifyContent: 'center' },
  logoWrapper: { position: 'absolute', top: HDR_TOP, left: 20, zIndex: 50 },
});