import { View, StyleSheet } from 'react-native';

type Props = { size?: 'sm' | 'md' };

export default function PlayIcon({ size = 'md' }: Props) {
  const s = size === 'sm'
    ? { borderTopWidth: 6, borderBottomWidth: 6, borderLeftWidth: 10, marginLeft: 2 }
    : { borderTopWidth: 9, borderBottomWidth: 9, borderLeftWidth: 16, marginLeft: 3 };

  return <View style={[styles.base, s]} />;
}

const styles = StyleSheet.create({
  base: {
    width: 0, height: 0,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: '#fff',
  },
});