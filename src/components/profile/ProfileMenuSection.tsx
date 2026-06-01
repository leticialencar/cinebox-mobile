import { StyleSheet, Text, View } from 'react-native';

type Props = {
  label: string;
  children: React.ReactNode;
};

export function ProfileMenuSection({ label, children }: Props) {
  return (
    <View style={s.section}>
      <Text style={s.label}>{label}</Text>
      <View style={s.card}>{children}</View>
    </View>
  );
}

const s = StyleSheet.create({
  section: { paddingHorizontal: 20, marginBottom: 8 },
  label:   { color: 'rgba(255,255,255,0.35)', fontSize: 12, fontWeight: '600', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 },
  card:    { backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', overflow: 'hidden' },
});