import { StyleSheet, Text, View } from 'react-native';

type UserData = {
  user_rating: number | null;
} | null;

type Props = { userData: UserData };

export function RatingCard({ userData }: Props) {
  if (!userData) return null;

  const starValue = (userData.user_rating ?? 0) / 2;

  return (
    <View style={styles.card}>
      <Text style={styles.label}>Sua avaliação</Text>
      {userData.user_rating ? (
        <>
          <View style={{ flexDirection: 'row', gap: 4 }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <Text key={i} style={{ fontSize: 22, color: starValue >= i ? '#8b5cf6' : 'rgba(255,255,255,0.15)' }}>★</Text>
            ))}
          </View>
          <Text style={styles.meta}>{starValue.toFixed(1)}/5</Text>
        </>
      ) : (
        <Text style={styles.muted}>Ainda não avaliado</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', padding: 16, gap: 8, marginTop: 16 },
  label: { color: '#8b5cf6', fontSize: 14, fontWeight: '700' },
  meta: { color: 'rgba(255,255,255,0.5)', fontSize: 12 },
  muted: { color: 'rgba(255,255,255,0.35)', fontSize: 13 },
});