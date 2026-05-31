import { StarRating } from '@/components/ui/StarRating';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type Props = {
  visible: boolean;
  rating: number;
  review: string;
  saving: boolean;
  onChangeRating: (v: number) => void;
  onChangeReview: (v: string) => void;
  onSave: () => void;
  onClose: () => void;
  placeholder?: string;
};

export function ReviewModal({ visible, rating, review, saving, onChangeRating, onChangeReview, onSave, onClose, placeholder = 'O que você achou?' }: Props) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.title}>Sua Avaliação</Text>
          <Text style={styles.muted}>Compartilhe sua experiência.</Text>
          <Text style={styles.label}>Nota</Text>
          <StarRating value={rating} onChange={onChangeRating} />
          <Text style={styles.label}>Comentário</Text>
          <TextInput
            style={styles.textarea}
            multiline
            numberOfLines={5}
            value={review}
            onChangeText={onChangeReview}
            placeholder={placeholder}
            placeholderTextColor="rgba(255,255,255,0.25)"
          />
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.btnOutline} onPress={onClose}>
              <Text style={styles.btnOutlineText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnPurple} onPress={onSave}>
              <Text style={styles.btnText}>{saving ? 'Salvando...' : 'Salvar'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end' },
  box: { backgroundColor: '#120d1e', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 28, gap: 4 },
  title: { color: '#8b5cf6', fontSize: 20, fontWeight: '800', marginBottom: 4 },
  muted: { color: 'rgba(255,255,255,0.35)', fontSize: 13 },
  label: { color: 'rgba(255,255,255,0.4)', fontSize: 11, marginTop: 20, marginBottom: 8 },
  textarea: { backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.09)', padding: 14, color: '#fff', fontSize: 14, textAlignVertical: 'top', minHeight: 120 },
  buttons: { flexDirection: 'row', gap: 12, marginTop: 20 },
  btnOutline: { flex: 1, paddingVertical: 14, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: '#8b5cf6' },
  btnOutlineText: { color: '#8b5cf6', fontSize: 14, fontWeight: '600' },
  btnPurple: { flex: 1, backgroundColor: '#7c3aed', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  btnText: { color: '#fff', fontSize: 14, fontWeight: '700' },
});