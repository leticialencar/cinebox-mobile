import { BrandLogo } from '@/components/logo/BrandLogo';
import Storage from '@/utils/storage';
import { Image } from 'expo-image';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const HDR_TOP = Platform.OS === 'ios' ? 54 : 36;

type User = {
  name: string;
  avatar: string | null;
};

export function TopBar() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useFocusEffect(
    useCallback(() => {
      Storage.get('user').then((raw) => {
        if (raw) setUser(JSON.parse(raw));
      });
    }, [])
  );

  const initials = (user?.name ?? 'U')
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <View style={s.container}>
      <BrandLogo size="sm" style={{ marginTop: -4 }} />

      <TouchableOpacity
        onPress={() => router.push('/(protected)/profile' as any)}
        activeOpacity={0.8}
        style={s.avatarBtn}
      >
        {user?.avatar ? (
          <Image source={{ uri: user.avatar }} style={s.avatarImg} contentFit="cover" />
        ) : (
          <View style={s.avatarPlaceholder}>
            <Text style={s.initials}>{initials}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    position: 'fixed' as any,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 999,
    elevation: 999,
    paddingHorizontal: 20,
    paddingTop: HDR_TOP - 28,
    paddingBottom: 8,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    backgroundColor: 'rgba(8,5,17,1.0)',
    },
  avatarBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(124,58,237,0.5)',
  },
  avatarImg: {
    width: 34,
    height: 34,
  },
  avatarPlaceholder: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#7c3aed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '800',
  },
});