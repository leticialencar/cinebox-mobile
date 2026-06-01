import { api } from '@/services/api';
import { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH * 0.78;
const CARD_HEIGHT = Math.round(CARD_WIDTH * 9 / 16);

type UpcomingItem = {
  id: number;
  title: string;
  overview: string;
  backdrop: string;
  release_date: string;
};

type Props = { onPress: (id: number) => void };

export function UpcomingSection({ onPress }: Props) {
  const [items, setItems] = useState<UpcomingItem[]>([]);

  useEffect(() => {
    api.get('/media/upcoming').then(({ data }) => setItems(data)).catch(() => {});
  }, []);

  if (items.length === 0) return null;

  function formatDate(date: string) {
    const d = new Date(date);
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  }

  return (
    <View style={s.wrapper}>
      <Text style={s.title}>Em breve nos cinemas</Text>
      <FlatList
        data={items}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => String(item.id)}
        snapToInterval={CARD_WIDTH + 12}
        decelerationRate="fast"
        contentContainerStyle={s.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={s.card}
            activeOpacity={0.9}
            onPress={() => onPress(item.id)}
          >
            <Image source={{ uri: item.backdrop }} style={s.backdrop} resizeMode="cover" />
            <View style={s.overlay} />
            <View style={s.content}>
              <View style={s.dateBadge}>
                <Text style={s.dateText}>{formatDate(item.release_date)}</Text>
              </View>
              <Text style={s.movieTitle} numberOfLines={1}>{item.title}</Text>
              <Text style={s.overview} numberOfLines={2}>{item.overview}</Text>
              <TouchableOpacity style={s.detailBtn} onPress={() => onPress(item.id)}>
                <Text style={s.detailBtnText}>Mais detalhes</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const s = StyleSheet.create({
  wrapper: { marginBottom: 28 },
  title: { color: '#fff', fontSize: 16, fontWeight: '800', marginBottom: 14, paddingHorizontal: 20 },
  list: { paddingHorizontal: 20, gap: 12 },
  card: { width: CARD_WIDTH, height: CARD_HEIGHT, borderRadius: 16, overflow: 'hidden' },
  backdrop: { ...StyleSheet.absoluteFill },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(8,4,16,0.5)',
  },
  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  dateBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#7c3aed',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 6,
  },
  dateText: { color: '#fff', fontSize: 9, fontWeight: '700' },
  movieTitle: { color: '#fff', fontSize: 14, fontWeight: '900', marginBottom: 4 },
  overview: { color: 'rgba(255,255,255,0.55)', fontSize: 11, lineHeight: 16, marginBottom: 10 },
  detailBtn: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  detailBtnText: { color: '#fff', fontSize: 11, fontWeight: '600' },
});