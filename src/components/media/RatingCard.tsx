import { StyleSheet, Text, View } from 'react-native';
import Svg, { ClipPath, Defs, Path, Rect } from 'react-native-svg';

type UserData = {
  user_rating: number | null;
} | null;

type Props = { userData: UserData };

const STAR = "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z";

function Star({ filled, half }: { filled: boolean; half: boolean }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24">
      <Defs>
        <ClipPath id={`left-rc`}>
          <Rect x="0" y="0" width="12" height="24" />
        </ClipPath>
        <ClipPath id={`right-rc`}>
          <Rect x="12" y="0" width="12" height="24" />
        </ClipPath>
      </Defs>
      <Path d={STAR} fill="rgba(255,255,255,0.15)" />
      {(filled || half) && (
        <Path d={STAR} fill="#8b5cf6" clipPath="url(#left-rc)" />
      )}
      {filled && (
        <Path d={STAR} fill="#8b5cf6" clipPath="url(#right-rc)" />
      )}
    </Svg>
  );
}

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
              <Star
                key={i}
                filled={starValue >= i}
                half={!( starValue >= i) && starValue >= i - 0.5}
              />
            ))}
          </View>
          <Text style={styles.meta}>{Number.isInteger(starValue) ? `${starValue}/5` : `${starValue.toFixed(1)}/5`}</Text>
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