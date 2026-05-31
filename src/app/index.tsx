import Storage from '@/utils/storage';
import { useEffect, useRef } from 'react';
import {
  Animated,
  ImageBackground,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import CineBoxLogo from '../components/logo/CineBoxLogo';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import { useRouter } from 'expo-router';

export default function CineBoxSplash() {
  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const btnAnim   = useRef(new Animated.Value(0)).current;
  const router    = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    const token = await Storage.get('token');
    if (token) {
      router.replace('/(protected)/home');
      return;
    }

    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim,  { toValue: 1, duration: 900, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 900, useNativeDriver: true }),
      ]),
      Animated.timing(btnAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
    ]).start();
  }

  return (
    <ImageBackground
      source={require('../../assets/images/home-bg.jpg')}
      style={styles.container}
      resizeMode="contain"
      imageStyle={{ width: '100%', height: '100%' }}
    >
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <View style={styles.overlay} pointerEvents="none" />

      <View style={styles.content}>
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          <CineBoxLogo />
        </Animated.View>
      </View>

      <Animated.View style={[styles.buttonsContainer, { opacity: btnAnim }]}>
        <PrimaryButton
          label="Entrar"
          onPress={() => router.push('/(auth)/login')}
        />
        <SecondaryButton
          label="Criar conta"
          onPress={() => router.push('/(auth)/register')}
        />
      </Animated.View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0612',
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(8, 4, 16, 0.92)',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  buttonsContainer: {
    paddingHorizontal: 28,
    paddingBottom: 52,
    gap: 12,
  },
});