import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { Movie } from '@/types/collection';

type Props = {
  data: Movie[];
  onPress: (item: Movie) => void;
};

export function CollectionGrid({ data, onPress }: Props) {
  return (
    <View style={s.grid}>
      {data.map((item) => (
        <TouchableOpacity key={item.id} style={s.item} onPress={() => onPress(item)} activeOpacity={0.8}>
          <View style={s.poster}>
            {item.poster
              ? <Image source={{ uri: item.poster }} style={s.img} resizeMode="cover" />
              : <View style={s.placeholder} />}
            {item.is_favorite && (
              <View style={s.favBadge}>
                <Text style={s.favHeart}>♥</Text>
              </View>
            )}
            {item.user_rating && (
              <View style={s.ratingBadge}>
                <Text style={s.ratingText}>
                  {Number.isInteger(item.user_rating / 2)
                    ? `${item.user_rating / 2}`
                    : (item.user_rating / 2).toFixed(1)}
                </Text>
              </View>
            )}
          </View>
          <Text style={s.title} numberOfLines={1}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const s = StyleSheet.create({
  grid:        { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, gap: 10 },
  item:        { width: '30%' },
  poster:      { aspectRatio: 2 / 3, borderRadius: 10, overflow: 'hidden', backgroundColor: 'rgba(255,255,255,0.05)', marginBottom: 6 },
  img:         { width: '100%', height: '100%' },
  placeholder: { flex: 1, backgroundColor: 'rgba(255,255,255,0.05)' },
  favBadge:    { position: 'absolute', top: 6, right: 6, width: 20, height: 20, borderRadius: 10, backgroundColor: 'rgba(0,0,0,0.6)', alignItems: 'center', justifyContent: 'center' },
  favHeart:    { fontSize: 9, color: '#ef4444' },
  ratingBadge: { position: 'absolute', bottom: 6, left: 6, backgroundColor: 'rgba(0,0,0,0.55)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  ratingText:  { color: '#fff', fontSize: 10, fontWeight: '700' },
  title:       { color: 'rgba(255,255,255,0.7)', fontSize: 11, fontWeight: '500' },
});