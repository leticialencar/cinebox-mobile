import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { MediaItem } from '../../types/media';

type Props = {
  item: MediaItem;
  onPress: () => void;
};

export function PosterCard({ item, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={s.wrap}>
      <View style={s.imgWrap}>
        {item.poster
          ? <Image source={{ uri: item.poster }} style={s.img} resizeMode="cover" />
          : <View style={s.img} />}
      </View>
      <Text style={s.title} numberOfLines={1}>{item.title}</Text>
      <Text style={s.sub}>{item.media_type === 'tv' ? 'Série' : 'Filme'} · {item.vote_average}</Text>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  wrap:   { width: 108 },
  imgWrap:{ borderRadius: 10, overflow: 'hidden', marginBottom: 8 },
  img:    { width: 108, height: 160, backgroundColor: '#1a1330' },
  title:  { color: 'rgba(255,255,255,0.9)', fontSize: 12, fontWeight: '600', marginBottom: 3 },
  sub:    { color: 'rgba(255,255,255,0.32)', fontSize: 11 },
});