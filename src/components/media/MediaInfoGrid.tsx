import { StyleSheet, Text, View } from 'react-native';

type Props = {
  description: string;
  director: string;
  writer: string;
  studios: string;
  genres: string;
};

export function MediaInfoGrid({ description, director, writer, studios, genres }: Props) {
  return (
    <>
      <Text style={styles.sectionLabel}>Sinopse</Text>
      <Text style={styles.description}>{description || 'Sinopse não disponível.'}</Text>
      <View style={styles.grid}>
        {[
          { label: 'Gênero',  value: genres },
          { label: 'Diretor', value: director },
          { label: 'Roteiro', value: writer },
          { label: 'Estúdio', value: studios },
        ].map(({ label, value }) => (
          <View key={label} style={styles.card}>
            <Text style={styles.cardLabel}>{label}</Text>
            <Text style={styles.cardValue}>{value || '—'}</Text>
          </View>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  sectionLabel: { color: '#8b5cf6', fontSize: 14, fontWeight: '700', marginBottom: 10, marginTop: 20 },
  description: { color: 'rgba(255,255,255,0.6)', fontSize: 14, lineHeight: 22, marginBottom: 8 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 4 },
  card: { flex: 1, minWidth: '45%', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', padding: 14 },
  cardLabel: { color: 'rgba(255,255,255,0.4)', fontSize: 11, marginBottom: 4 },
  cardValue: { color: '#fff', fontSize: 13, fontWeight: '600' },
});