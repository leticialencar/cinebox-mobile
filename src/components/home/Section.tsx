import { FlatList, StyleSheet, Text, View } from 'react-native';
import type { MediaItem } from '@/types/media';
import { PosterCard } from './PosterCard';

type Props = {
  title: string;
  data: MediaItem[];
  onPress: (id: number, type: 'movie' | 'tv') => void;
};

export function Section({ title, data, onPress }: Props) {
  if (!data.length) return null;
  return (
    <View style={s.wrap}>
      <Text style={s.title}>{title}</Text>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => `${item.media_type}-${item.id}`}
        contentContainerStyle={s.list}
        renderItem={({ item }) => (
          <PosterCard item={item} onPress={() => onPress(item.id, item.media_type)} />
        )}
      />
    </View>
  );
}

const s = StyleSheet.create({
  wrap:  { marginTop: 36 },
  title: { color: '#fff', fontSize: 15, fontWeight: '700', letterSpacing: -0.1, paddingHorizontal: 20, marginBottom: 14 },
  list:  { paddingHorizontal: 20, gap: 12 },
});