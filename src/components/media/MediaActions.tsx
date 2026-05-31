import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type UserData = {
  id: number;
  is_favorite: boolean;
  user_rating: number | null;
  review: string | null;
} | null;

type Props = {
  userData: UserData;
  onAddToCollection: () => void;
  onToggleFavorite: () => void;
  onEditReview: () => void;
  onDelete: () => void;
};

export function MediaActions({ userData, onAddToCollection, onToggleFavorite, onEditReview, onDelete }: Props) {
  if (!userData) {
    return (
      <TouchableOpacity style={styles.btnPurpleFull} onPress={onAddToCollection}>
        <Text style={styles.btnText}>+ Adicionar à coleção</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={[styles.btn, userData.is_favorite ? styles.btnRed : styles.btnPurple]}
        onPress={onToggleFavorite}
      >
        <Text style={styles.btnText}>
          {userData.is_favorite ? '♥ Remover dos favoritos' : '♡ Adicionar aos favoritos'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnOutline} onPress={onEditReview}>
        <Text style={styles.btnOutlineText}>✏️ Editar avaliação</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnDanger} onPress={onDelete}>
        <Text style={styles.btnDangerText}>🗑 Remover da coleção</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { gap: 10, marginTop: 4 },
  btn: { paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  btnText: { color: '#fff', fontSize: 14, fontWeight: '700' },
  btnPurple: { backgroundColor: '#7c3aed' },
  btnPurpleFull: { backgroundColor: '#7c3aed', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  btnRed: { backgroundColor: '#dc2626' },
  btnOutline: { paddingVertical: 14, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: '#8b5cf6' },
  btnOutlineText: { color: '#8b5cf6', fontSize: 14, fontWeight: '600' },
  btnDanger: { paddingVertical: 14, borderRadius: 12, alignItems: 'center', backgroundColor: 'rgba(239,68,68,0.1)' },
  btnDangerText: { color: '#f87171', fontSize: 14, fontWeight: '600' },
});