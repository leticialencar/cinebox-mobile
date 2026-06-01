import { Image, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import type { SearchResult } from '@/types/media';

const HDR_TOP = Platform.OS === 'ios' ? 54 : 36;

type Props = {
  results: SearchResult[];
  onPress: (id: number, type: 'movie' | 'tv') => void;
};

export function SearchDropdown({ results, onPress }: Props) {
  if (!results.length) return null;
  return (
    <View style={s.dropdown}>
      {results.map((item) => (
        <TouchableOpacity
          key={`${item.media_type}-${item.id}`}
          style={s.item}
          onPress={() => onPress(item.id, item.media_type)}
        >
          {item.poster
            ? <Image source={{ uri: item.poster }} style={s.thumb} />
            : <View style={[s.thumb, { backgroundColor: '#1a1330' }]} />}
          <View style={{ flex: 1 }}>
            <Text style={s.title} numberOfLines={1}>{item.title}</Text>
            <Text style={s.meta}>{item.year} · {item.media_type === 'tv' ? 'Série' : 'Filme'}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const s = StyleSheet.create({
  dropdown: {
    position: 'absolute',
    top: HDR_TOP + 52,
    left: 20, right: 20,
    zIndex: 60,
    backgroundColor: '#0d0a1a',
    borderRadius: 14,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)',
    overflow: 'hidden',
    shadowColor: '#000', shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5, shadowRadius: 20, elevation: 16,
  },
  item: {
    flexDirection: 'row', alignItems: 'center', gap: 12, padding: 11,
    borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.04)',
  },
  thumb: { width: 32, height: 48, borderRadius: 6 },
  title: { color: '#fff', fontSize: 13.5, fontWeight: '600' },
  meta:  { color: 'rgba(255,255,255,0.33)', fontSize: 11.5, marginTop: 2 },
});