import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import type { MediaItem } from '../../types/media';

const { width: W, height: H } = Dimensions.get('window');
const BG = '#080511';
export const HERO_H = H * 0.68;

type Props = {
  item: MediaItem;
  onPress: () => void;
};

export function HomeHero({ item, onPress }: Props) {
  return (
    <View style={s.hero}>
      <Image
        source={{ uri: item.backdrop ?? item.poster ?? '' }}
        style={s.img}
        resizeMode="cover"
      />

      <LinearGradient
        colors={['rgba(8,5,17,0.55)', 'transparent']}
        style={s.gradTop}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
      <LinearGradient
        colors={['transparent', 'rgba(8,5,17,0.5)', BG]}
        locations={[0, 0.5, 1]}
        style={s.gradBottom}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />

      <View style={s.content}>
        <Text style={s.title} numberOfLines={2}>{item.title}</Text>
        <View style={s.row}>
          <Text style={s.meta}>{item.media_type === 'tv' ? 'Série' : 'Filme'}</Text>
          <View style={s.dot} />
          <Text style={s.meta}>★ {item.vote_average}</Text>
        </View>
        <View style={s.btns}>
          <TouchableOpacity style={s.btnPrimary} onPress={onPress} activeOpacity={0.85}>
            <Text style={s.btnPrimaryTxt}>+  Salvar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.btnSecondary} onPress={onPress} activeOpacity={0.85}>
            <Text style={s.btnSecondaryTxt}>Saiba mais</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  hero:       { width: W, height: HERO_H, position: 'relative' },
  img:        { position: 'absolute', width: '100%', height: '100%' },
  gradTop:    { position: 'absolute', top: 0, left: 0, right: 0, height: 160 },
  gradBottom: { position: 'absolute', bottom: 0, left: 0, right: 0, height: HERO_H * 0.55 },
  content:    { position: 'absolute', bottom: 0.2, left: 20, right: 20, alignItems: 'center' },
  title: {
    color: '#fff', fontSize: 26, fontWeight: '800',
    letterSpacing: -0.5, lineHeight: 31, marginBottom: 8,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.9)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 12,
    },
  row:  { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  dot:  { width: 3, height: 3, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.22)' },
  meta: { color: 'rgba(255,255,255,0.5)', fontSize: 13 },
  btns: { flexDirection: 'row', gap: 10, justifyContent: 'center' },
  btnPrimary: {
    backgroundColor: '#7c3aed',
    paddingVertical: 9,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
    },
  btnPrimaryTxt: { color: '#fff', fontSize: 14, fontWeight: '700' },
  btnSecondary: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.2)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnSecondaryTxt: { color: 'rgba(255,255,255,0.85)', fontSize: 14, fontWeight: '600' },
});