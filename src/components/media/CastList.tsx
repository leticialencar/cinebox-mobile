import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

type CastMember = {
  id: number;
  name: string;
  character: string | null;
  profile: string | null;
};

type Props = { cast: CastMember[] };

export function CastList({ cast }: Props) {
  return (
    <>
      <Text style={styles.sectionLabel}>Elenco Principal</Text>
      <FlatList
        data={cast}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ gap: 16, paddingBottom: 8 }}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image
              source={{ uri: item.profile ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=7c3aed&color=fff&size=185` }}
              style={styles.photo}
            />
            <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
            <Text style={styles.char} numberOfLines={1}>{item.character}</Text>
          </View>
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  sectionLabel: { color: '#8b5cf6', fontSize: 14, fontWeight: '700', marginBottom: 10, marginTop: 20 },
  item: { width: 72, alignItems: 'center' },
  photo: { width: 56, height: 56, borderRadius: 28, marginBottom: 6, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  name: { color: '#fff', fontSize: 11, fontWeight: '600', textAlign: 'center' },
  char: { color: 'rgba(255,255,255,0.35)', fontSize: 10, textAlign: 'center' },
});