import { CollectionBoxIcon } from '@/components/icons/CollectionBoxIcon';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  isEmpty: boolean;
  onClear: () => void;
};

export function CollectionEmpty({ isEmpty, onClear }: Props) {
  const router = useRouter();

  return (
    <View style={s.container}>
      <View style={s.icon}>
        <CollectionBoxIcon size={32} />
      </View>
      <Text style={s.title}>{isEmpty ? 'Sua coleção está vazia' : 'Nenhum resultado'}</Text>
      <Text style={s.sub}>
        {isEmpty
          ? 'Adicione filmes e séries que você já assistiu ou deseja assistir.'
          : 'Tente outros filtros ou termos de busca.'}
      </Text>
      {isEmpty ? (
        <TouchableOpacity style={s.btn} onPress={() => router.push('/(protected)/home' as any)}>
          <Text style={s.btnText}>Explorar títulos</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onClear}>
          <Text style={s.clearText}>Limpar filtros</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  container: { alignItems: 'center', paddingTop: 80, paddingHorizontal: 40 },
  icon:      { width: 72, height: 72, borderRadius: 36, backgroundColor: 'rgba(124,58,237,0.1)', borderWidth: 1, borderColor: 'rgba(124,58,237,0.2)', alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  title:     { color: '#fff', fontSize: 18, fontWeight: '700', marginBottom: 8 },
  sub:       { color: 'rgba(255,255,255,0.35)', fontSize: 13, textAlign: 'center', lineHeight: 20, marginBottom: 24 },
  btn:       { backgroundColor: '#7c3aed', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12 },
  btnText:   { color: '#fff', fontSize: 14, fontWeight: '700' },
  clearText: { color: '#a78bfa', fontSize: 13 },
});