import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AddIcon } from '@/components/icons/AddIcon';

type Props = {
  id: number;
  title: string;
  media_type: 'movie' | 'tv';
  poster: string | null;
  year?: string;
  onPress: (id: number, type: 'movie' | 'tv') => void;
};

export function MediaRow({ id, title, media_type, poster, year, onPress }: Props) {
  return (
    <TouchableOpacity style={s.row} activeOpacity={0.75} onPress={() => onPress(id, media_type)}>
      {poster
        ? <Image source={{ uri: poster }} style={s.thumb} />
        : <View style={[s.thumb, s.thumbFallback]} />}

      <View style={s.rowInfo}>
        <Text style={s.rowTitle} numberOfLines={2}>{title}</Text>
        <Text style={s.rowLabel}>
          {media_type === 'movie' ? 'Filme' : 'Série'}
          {year ? `  ·  ${year}` : ''}
        </Text>
      </View>

      <View style={s.addBtn}>
        <AddIcon />
      </View>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  thumb:         { width: 60, height: 90, borderRadius: 8, backgroundColor: '#1a1a2e' },
  thumbFallback: { backgroundColor: '#1a1a2e' },
  rowInfo:       { flex: 1, gap: 4 },
  rowTitle:      { color: '#fff', fontSize: 15, fontWeight: '600' },
  rowLabel:      { color: 'rgba(255,255,255,0.4)', fontSize: 12 },
  addBtn: {
    width: 34, height: 34,
    borderRadius: 17,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});