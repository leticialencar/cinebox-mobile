import Storage from '@/utils/storage';
import { api } from '@/services/api';
import * as ImagePicker from 'expo-image-picker';
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
  View,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { ProfileAvatar }      from '@/components/profile/ProfileAvatar';
import { ProfileMenuItem }    from '@/components/profile/ProfileMenuItem';
import { ProfileMenuSection } from '@/components/profile/ProfileMenuSection';

const BG      = '#080511';
const PURPLE  = '#7c3aed';
const HDR_TOP = Platform.OS === 'ios' ? 54 : 36;

type User = {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
};

export default function ProfileScreen() {
  const router = useRouter();
  const [user,            setUser]            = useState<User | null>(null);
  const [loading,         setLoading]         = useState(true);
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
      const token    = await Storage.get('token');
      const formData = new FormData();

      if (Platform.OS === 'web') {
        const response = await fetch(asset.uri);
        const blob     = await response.blob();
        formData.append('avatar', blob, 'avatar.jpg');
      } else {
        formData.append('avatar', { uri: asset.uri, name: 'avatar.jpg', type: 'image/jpeg' } as any);
      }

      const { data } = await api.post('/user/avatar', formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
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
        await api.post('/logout', {}, { headers: { Authorization: `Bearer ${token}` } });
      } catch {}
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

  return (
    <View style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={s.header}>
          <Text style={s.headerTitle}>Perfil</Text>
        </View>

        <View style={s.profileCard}>
          <ProfileAvatar
            name={user?.name ?? 'U'}
            avatar={user?.avatar ?? null}
            uploading={uploadingAvatar}
            onPress={handlePickAvatar}
          />
          <Text style={s.profileName}>{user?.name ?? '—'}</Text>
          <Text style={s.profileEmail}>{user?.email ?? '—'}</Text>
        </View>

        <ProfileMenuSection label="Conta">
          <ProfileMenuItem
            label="Redefinir senha"
            onPress={() => router.push('/(auth)/forgot-password' as any)}
            icon={
              <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                <Path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={PURPLE} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
              </Svg>
            }
          />
        </ProfileMenuSection>

        <ProfileMenuSection label="Sessão">
          <ProfileMenuItem
            label="Sair da conta"
            onPress={handleLogout}
            danger
            icon={
              <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                <Path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="#f87171" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
                <Path d="M16 17l5-5-5-5M21 12H9" stroke="#f87171" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
              </Svg>
            }
          />
        </ProfileMenuSection>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root:         { flex: 1, backgroundColor: BG },
  center:       { flex: 1, backgroundColor: BG, alignItems: 'center', justifyContent: 'center' },
  header:       { paddingTop: HDR_TOP, paddingHorizontal: 20, paddingBottom: 8 },
  headerTitle:  { color: '#fff', fontSize: 22, fontWeight: '800' },
  profileCard:  { alignItems: 'center', paddingVertical: 32, paddingHorizontal: 20 },
  profileName:  { color: '#fff', fontSize: 20, fontWeight: '800', marginBottom: 4 },
  profileEmail: { color: 'rgba(255,255,255,0.4)', fontSize: 14 },
});