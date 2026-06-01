import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  visible: boolean;
  title: string;
  onConfirm: () => void;
  onClose: () => void;
};

export function DeleteModal({ visible, title, onConfirm, onClose }: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.title}>Remover da coleção?</Text>
          <Text style={styles.description}>
            Você perderá sua avaliação e comentários de{' '}
            <Text style={{ color: '#fff', fontWeight: '700' }}>{title}</Text>.
            Essa ação não pode ser desfeita.
          </Text>
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.btnOutline} onPress={onClose}>
              <Text style={styles.btnOutlineText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnDanger} onPress={onConfirm}>
              <Text style={styles.btnDangerText}>Sim, remover</Text>
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
  description: { color: 'rgba(255,255,255,0.6)', fontSize: 14, lineHeight: 22, marginBottom: 8 },
  buttons: { flexDirection: 'row', gap: 12, marginTop: 20 },
  btnOutline: { flex: 1, paddingVertical: 14, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: '#8b5cf6' },
  btnOutlineText: { color: '#8b5cf6', fontSize: 14, fontWeight: '600' },
  btnDanger: { flex: 1, paddingVertical: 14, borderRadius: 12, alignItems: 'center', backgroundColor: 'rgba(239,68,68,0.1)' },
  btnDangerText: { color: '#f87171', fontSize: 14, fontWeight: '600' },
});