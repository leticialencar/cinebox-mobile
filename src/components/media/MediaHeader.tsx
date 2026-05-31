import { Image, StyleSheet, Text, View } from 'react-native';

type Props = {
  title: string;
  poster: string | null;
  rating: string;
  release: string | null;
  hours: number | null;
  minutes: number | null;
  badge?: string;
};

export function MediaHeader({ title, poster, rating, release, hours, minutes, badge }: Props) {
  return (
    <View style={styles.header}>
      <Image source={{ uri: poster ?? '' }} style={styles.poster} resizeMode="cover" />
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.metaText}>★ {rating}</Text>
          {release && <Text style={styles.metaText}>{release.slice(0, 4)}</Text>}
          {hours != null && <Text style={styles.metaText}>{hours}h {minutes}min</Text>}
          {badge && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{badge}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', gap: 16, padding: 20, marginTop: -60 },
  poster: { width: 110, height: 165, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  info: { flex: 1, justifyContent: 'flex-end', paddingBottom: 4 },
  title: { color: '#fff', fontSize: 20, fontWeight: '900', marginBottom: 8, lineHeight: 26 },
  metaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, alignItems: 'center' },
  metaText: { color: 'rgba(255,255,255,0.5)', fontSize: 12 },
  badge: { backgroundColor: 'rgba(139,92,246,0.2)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  badgeText: { color: '#8b5cf6', fontSize: 11, fontWeight: '600' },
});