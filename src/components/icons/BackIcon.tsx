import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';

type Props = {
  label?: string;
};

export function BackButton({ label = 'Voltar' }: Props) {
  const router = useRouter();
  return (
    <TouchableOpacity style={styles.btn} onPress={() => router.back()} activeOpacity={0.7}>
      <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
        <Path
          d="M15 18L9 12L15 6"
          stroke="#8b5cf6"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingTop: 64,
    paddingBottom: 16,
    gap: 4,
  },
  label: {
    color: '#8b5cf6',
    fontSize: 15,
    fontWeight: '600',
  },
});