import { View, Text, StyleSheet } from 'react-native';
import PlayIcon from '@/components/logo/PlayIcon';

type Props = { size?: 'sm' | 'md' };

export function BrandLogo({ size = 'md' }: Props) {
  const sm = size === 'sm';
  return (
    <View style={styles.logoRow}>
      <View style={[styles.iconBadge, sm && { width: 22, height: 22, borderRadius: 6 }]}>
        <PlayIcon size="sm" />
      </View>
      <Text style={[styles.logoText, sm && { fontSize: 16 }]}>
        CINE<Text style={styles.logoAccent}>BOX</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  logoRow:    { flexDirection: 'row', alignItems: 'center', gap: 8 },
  iconBadge:  { width: 30, height: 30, borderRadius: 8, backgroundColor: '#7c3aed', alignItems: 'center', justifyContent: 'center' },
  logoText:   { fontSize: 22, fontWeight: '900', color: '#fff', letterSpacing: 1.5 },
  logoAccent: { color: '#8b5cf6' },
});