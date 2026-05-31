import { TouchableOpacity, View, Text } from 'react-native';

type Props = {
  value: number;
  onChange: (v: number) => void;
};

export function StarRating({ value, onChange }: Props) {
  return (
    <View style={{ flexDirection: 'row', gap: 8 }}>
      {[2, 4, 6, 8, 10].map((v) => (
        <TouchableOpacity key={v} onPress={() => onChange(v)}>
          <Text style={{ fontSize: 32, color: value >= v ? '#8b5cf6' : 'rgba(255,255,255,0.15)' }}>★</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}