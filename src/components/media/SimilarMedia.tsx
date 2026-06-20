import { colors, radius, spacing, typography } from '@/constants/theme';
import { api } from '@/services/api';
import { SimilarMediaItem } from '@/types/media';
import Storage from '@/utils/storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface SimilarMediaProps {
  type: 'movie' | 'tv';
  id: number | string;
}

const CARD_WIDTH = 132;

export function SimilarMedia({ type, id }: SimilarMediaProps) {
  const router = useRouter();
  const [items, setItems] = useState<SimilarMediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSimilar();
  }, [type, id]);

  async function fetchSimilar() {
    try {
      const token = await Storage.get('token');
      const { data } = await api.get<SimilarMediaItem[]>(`/movies/${type}/${id}/similar`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(data ?? []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  function handlePress(item: SimilarMediaItem) {
    router.push(`/${item.media_type}/${item.id}` as never);
  }

  function getYear(release: string | null) {
    return release ? release.slice(0, 4) : '—';
  }

  if (loading) {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Similares</Text>
        <View style={styles.loadingBox}>
          <ActivityIndicator color={colors.accent} size="small" />
        </View>
      </View>
    );
  }

  if (items.length === 0) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.sectionLabel}>Similares</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {items.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => handlePress(item)}
          >
            <View style={styles.posterWrapper}>
              {item.poster ? (
                <Image source={{ uri: item.poster }} style={styles.poster} resizeMode="cover" />
              ) : (
                <View style={[styles.poster, styles.posterPlaceholder]}>
                  <Text style={styles.posterPlaceholderText}>{item.title.charAt(0)}</Text>
                </View>
              )}
            </View>

            <Text style={styles.cardTitle} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={styles.cardYear}>{getYear(item.release)}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionLabel: { color: '#8b5cf6', fontSize: 14, fontWeight: '700', marginBottom: 10, marginTop: 20 },
  section: {
    marginTop: spacing.xxl + spacing.xs,
  },
  loadingBox: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    gap: spacing.lg,
    paddingRight: spacing.md,
  },
  card: {
    width: CARD_WIDTH,
  },
  posterWrapper: {
    marginBottom: spacing.md,
    borderRadius: radius.lg,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  poster: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 1.5,
    borderRadius: radius.lg,
    backgroundColor: colors.bgCard,
  },
  posterPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  posterPlaceholderText: {
    color: colors.textMuted,
    fontSize: typography.xxl,
    fontWeight: '700',
  },
  cardTitle: {
    color: colors.textPrimary,
    fontSize: typography.sm,
    fontWeight: '600',
    lineHeight: typography.sm + 5,
  },
  cardYear: {
    color: colors.textMuted,
    fontSize: typography.xs,
    marginTop: 3,
  },
});