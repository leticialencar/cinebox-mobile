import { BackButton } from '@/components/icons/BackIcon';
import { Dimensions, Image, StyleSheet, View } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type Props = {
  backdrop: string | null;
  poster: string | null;
};

export function MediaBackdrop({ backdrop, poster }: Props) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: backdrop ?? poster ?? '' }} style={styles.image} resizeMode="cover" />
      <View style={styles.overlay} />
      <View style={styles.backBtn}>
        <BackButton />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: SCREEN_WIDTH, height: 260, position: 'relative' },
  image: { width: '100%', height: '100%', position: 'absolute' },
  overlay: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(8,4,16,0.6)' },
  backBtn: { position: 'absolute', top: 0, left: 12 },
});