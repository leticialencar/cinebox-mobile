import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { ClipPath, Defs, Path, Rect } from 'react-native-svg';
import type { Movie, Filter, Sort } from '@/types/collection';

const PURPLE = '#7c3aed';
const STAR_PATH = "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z";

function Star({ filled, half }: { filled: boolean; half: boolean }) {
  return (
    <Svg width={14} height={14} viewBox="0 0 24 24">
      <Defs>
        <ClipPath id="sl"><Rect x="0" y="0" width="12" height="24" /></ClipPath>
        <ClipPath id="sr"><Rect x="12" y="0" width="12" height="24" /></ClipPath>
      </Defs>
      <Path d={STAR_PATH} fill="rgba(255,255,255,0.1)" />
      {(filled || half) && <Path d={STAR_PATH} fill={PURPLE} clipPath="url(#sl)" />}
      {filled && <Path d={STAR_PATH} fill={PURPLE} clipPath="url(#sr)" />}
    </Svg>
  );
}

function StarRow({ rating }: { rating: number }) {
  const starValue = rating / 2;
  return (
    <View style={{ flexDirection: 'row', gap: 2 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} filled={starValue >= i} half={!(starValue >= i) && starValue >= i - 0.5} />
      ))}
    </View>
  );
}

type Props = {
  data: Movie[];
  onPress: (item: Movie) => void;
};

export function CollectionList({ data, onPress }: Props) {
  return (
    <View style={s.list}>
      {data.map((item) => (
        <TouchableOpacity key={item.id} style={s.item} onPress={() => onPress(item)} activeOpacity={0.8}>
          <View style={s.poster}>
            {item.poster && <Image source={{ uri: item.poster }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />}
          </View>
          <View style={s.info}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Text style={s.title} numberOfLines={1}>{item.title}</Text>
              {item.is_favorite && <Text style={{ color: '#e85d7a', fontSize: 10 }}>♥</Text>}
            </View>
            <Text style={s.year}>{item.release_year ?? '—'}</Text>
            {item.user_rating ? (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 }}>
                <StarRow rating={item.user_rating} />
                <Text style={s.rating}>
                  {Number.isInteger(item.user_rating / 2)
                    ? `${item.user_rating / 2}/5`
                    : `${(item.user_rating / 2).toFixed(1)}/5`}
                </Text>
              </View>
            ) : (
              <Text style={s.noRating}>Sem nota</Text>
            )}
          </View>
          <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
            <Path d="M9 18l6-6-6-6" stroke="rgba(255,255,255,0.2)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const s = StyleSheet.create({
  list:     { paddingHorizontal: 16, gap: 10 },
  item:     { flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', padding: 12 },
  poster:   { width: 44, height: 64, borderRadius: 8, overflow: 'hidden', backgroundColor: 'rgba(255,255,255,0.05)', flexShrink: 0 },
  info:     { flex: 1 },
  title:    { color: '#fff', fontSize: 14, fontWeight: '600' },
  year:     { color: 'rgba(255,255,255,0.35)', fontSize: 12, marginTop: 2 },
  rating:   { color: '#a78bfa', fontSize: 12, fontWeight: '600' },
  noRating: { color: 'rgba(255,255,255,0.2)', fontSize: 12, marginTop: 4 },
});