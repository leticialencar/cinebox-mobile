import { Dimensions, StyleSheet, Text, View } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type Props = { videoId: string | null };

export function TrailerPlayer({ videoId }: Props) {
  if (!videoId) return null;

  const height = Math.round((SCREEN_WIDTH - 40) * 9 / 16);

  return (
    <>
      <Text style={styles.sectionLabel}>Trailer</Text>
      <View style={[styles.container, { height }]}>
        <YoutubePlayer height={height} width={SCREEN_WIDTH - 40} videoId={videoId} play={false} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  sectionLabel: { color: '#8b5cf6', fontSize: 14, fontWeight: '700', marginBottom: 10, marginTop: 24 },
  container: { borderRadius: 12, overflow: 'hidden' },
});