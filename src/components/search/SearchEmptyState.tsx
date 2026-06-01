import { StyleSheet, Text, View } from 'react-native';

type Props = {
  type: 'initial' | 'no-results';
};

export function SearchEmptyState({ type }: Props) {
  if (type === 'no-results') {
    return (
      <View style={s.container}>
        <Text style={s.title}>Nenhum resultado</Text>
        <Text style={s.subtitle}>Tente outro título</Text>
      </View>
    );
  }

  return (
    <View style={s.container}>
      <Text style={s.title}>Expanda seu catálogo!</Text>
      <Text style={s.subtitle}>Encontre seus filmes e séries favoritos</Text>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 6 },
  title:     { color: '#fff', fontSize: 18, fontWeight: '700' },
  subtitle:  { color: 'rgba(255,255,255,0.4)', fontSize: 14 },
});