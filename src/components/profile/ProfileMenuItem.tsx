import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

function ChevronRight() {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
      <Path d="M9 18l6-6-6-6" stroke="rgba(255,255,255,0.25)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

type Props = {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
  danger?: boolean;
};

export function ProfileMenuItem({ icon, label, onPress, danger }: Props) {
  return (
    <TouchableOpacity style={s.item} onPress={onPress} activeOpacity={0.7}>
      <View style={[s.icon, danger && s.iconDanger]}>{icon}</View>
      <Text style={[s.label, danger && s.labelDanger]}>{label}</Text>
      {!danger && <ChevronRight />}
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  item:        { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16 },
  icon:        { width: 36, height: 36, borderRadius: 10, backgroundColor: 'rgba(124,58,237,0.1)', alignItems: 'center', justifyContent: 'center' },
  iconDanger:  { backgroundColor: 'rgba(239,68,68,0.1)' },
  label:       { flex: 1, color: '#fff', fontSize: 15, fontWeight: '500' },
  labelDanger: { flex: 1, color: '#f87171', fontSize: 15, fontWeight: '500' },
});