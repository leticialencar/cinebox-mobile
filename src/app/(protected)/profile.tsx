import Storage from '@/utils/storage';
import { api } from '@/services/api';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

const BG = '#080511';
const PURPLE = '#7c3aed';
const HDR_TOP = Platform.OS === 'ios' ? 54 : 36;

type User = {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
};

function ChevronRight() {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
      <Path d="M9 18l6-6-6-6" stroke="rgba(255,255,255,0.25)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function MenuItem({ icon, label, onPress, danger }: {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
  danger?: boolean;
}) {
  return (
    <TouchableOpacity style={s.menuItem} onPress={onPress} activeOpacity={0.7}>
      <View style={[s.menuIcon, danger && s.menuIconDanger]}>{icon}</View>
      <Text style={[s.menuLabel, danger && s.menuLabelDanger]}>{label}</Text>
      {!danger && <ChevronRight />}
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  useEffect(() => { loadUser(); }, []);

  async function loadUser() {
    try {
      const raw = await Storage.get('user');
      if (raw) setUser(JSON.parse(raw));
    } finally {
      setLoading(false);
    }
  }

  async function handlePickAvatar() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos acessar sua galeria para trocar a foto.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (result.canceled) return;

    const asset = result.assets[0];
    setUploadingAvatar(true);

    try {
      const token = await Storage.get('token');
      const formData = new FormData();

      if (Platform.OS === 'web') {
        const response = await fetch(asset.uri);
        const blob = await response.blob();
        formData.append('avatar', blob, 'avatar.jpg');
      } else {
        formData.append('avatar', {
          uri: asset.uri,
          name: 'avatar.jpg',
          type: 'image/jpeg',
        } as any);
      }

      const { data } = await api.post('/user/avatar', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      const updatedUser = { ...user!, avatar: data.user.avatar };
      setUser(updatedUser);
      await Storage.set('user', JSON.stringify(updatedUser));
    } catch {
      Alert.alert('Erro', 'Não foi possível atualizar a foto.');
    } finally {
      setUploadingAvatar(false);
    }
  }

  async function handleLogout() {
    const doLogout = async () => {
      try {
        const token = await Storage.get('token');
        await api.post('/logout', {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch {
        console.log('Erro logout');
      }
      await Storage.delete('token');
      await Storage.delete('user');
      router.replace('/');
    };

    if (Platform.OS === 'web') {
      if (window.confirm('Tem certeza que deseja sair?')) await doLogout();
    } else {
      Alert.alert('Sair', 'Tem certeza que deseja sair?', [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sair', style: 'destructive', onPress: doLogout },
      ]);
    }
  }

  if (loading) return (
    <View style={s.center}><ActivityIndicator color={PURPLE} size="large" /></View>
  );

  const initials = (user?.name ?? 'U').split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();

  return (
    <View style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={s.header}>
          <Text style={s.headerTitle}>Perfil</Text>
        </View>

        <View style={s.profileCard}>
          <TouchableOpacity style={s.avatarWrapper} onPress={handlePickAvatar} activeOpacity={0.8}>
            {user?.avatar ? (
              <Image source={{ uri: user.avatar }} style={s.avatarImg} contentFit="cover" />
            ) : (
              <View style={s.avatarPlaceholder}>
                <Text style={s.avatarInitials}>{initials}</Text>
              </View>
            )}
            <View style={s.avatarEditBtn}>
              {uploadingAvatar
                ? <ActivityIndicator size="small" color="#fff" />
                : (
                  <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
                    <Path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    <Path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </Svg>
                )}
            </View>
          </TouchableOpacity>

          <Text style={s.profileName}>{user?.name ?? '—'}</Text>
          <Text style={s.profileEmail}>{user?.email ?? '—'}</Text>
        </View>

        <View style={s.section}>
          <Text style={s.sectionLabel}>Conta</Text>
          <View style={s.card}>
            <MenuItem
              onPress={() => router.push('/(auth)/forgot-password' as any)}
              label="Redefinir senha"
              icon={
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                  <Path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={PURPLE} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
                </Svg>
              }
            />
          </View>
        </View>

        <View style={s.section}>
          <Text style={s.sectionLabel}>Sessão</Text>
          <View style={s.card}>
            <MenuItem
              onPress={handleLogout}
              label="Sair da conta"
              danger
              icon={
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                  <Path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="#f87171" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
                  <Path d="M16 17l5-5-5-5M21 12H9" stroke="#f87171" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
                </Svg>
              }
            />
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: BG },
  center: { flex: 1, backgroundColor: BG, alignItems: 'center', justifyContent: 'center' },
  header: { paddingTop: HDR_TOP, paddingHorizontal: 20, paddingBottom: 8 },
  headerTitle: { color: '#fff', fontSize: 22, fontWeight: '800' },
  profileCard: { alignItems: 'center', paddingVertical: 32, paddingHorizontal: 20 },
  avatarWrapper: { position: 'relative', marginBottom: 16 },
  avatarPlaceholder: {
    width: 90, height: 90, borderRadius: 45,
    backgroundColor: PURPLE,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 3, borderColor: 'rgba(124,58,237,0.3)',
  },
  avatarImg: {
    width: 90, height: 90, borderRadius: 45,
    borderWidth: 3, borderColor: 'rgba(124,58,237,0.3)',
  },
  avatarInitials: { color: '#fff', fontSize: 32, fontWeight: '800' },
  avatarEditBtn: {
    position: 'absolute', bottom: 0, right: 0,
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: '#5b21b6',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: BG,
  },
  profileName: { color: '#fff', fontSize: 20, fontWeight: '800', marginBottom: 4 },
  profileEmail: { color: 'rgba(255,255,255,0.4)', fontSize: 14 },
  section: { paddingHorizontal: 20, marginBottom: 8 },
  sectionLabel: { color: 'rgba(255,255,255,0.35)', fontSize: 12, fontWeight: '600', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 },
  card: { backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', overflow: 'hidden' },
  menuItem: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16 },
  menuIcon: { width: 36, height: 36, borderRadius: 10, backgroundColor: 'rgba(124,58,237,0.1)', alignItems: 'center', justifyContent: 'center' },
  menuIconDanger: { backgroundColor: 'rgba(239,68,68,0.1)' },
  menuLabel: { flex: 1, color: '#fff', fontSize: 15, fontWeight: '500' },
  menuLabelDanger: { flex: 1, color: '#f87171', fontSize: 15, fontWeight: '500' },
});