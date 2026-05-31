import { FormField } from '@/components/FormField';
import { BrandLogo } from '@/components/logo/BrandLogo';
import PrimaryButton from '../../components/PrimaryButton';
import { useRouter } from 'expo-router';
import Storage from '@/utils/storage';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !password) {
      Alert.alert('Atenção', 'Preencha e-mail e senha.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        Alert.alert('Erro', data.message ?? 'Credenciais inválidas.');
        return;
      }

      await Storage.set('token', data.token);
      await Storage.set('user', JSON.stringify(data.user));

      router.replace('/(protected)/home');
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

        <View style={styles.logoWrapper}>
          <BrandLogo />
        </View>

        <Text style={styles.title}>Entrar</Text>
        <Text style={styles.subtitle}>Que bom te ver de novo!</Text>

        <FormField
          label="E-mail"
          value={email}
          onChangeText={setEmail}
          placeholder="seuemail@exemplo.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <FormField
          label="Senha"
          value={password}
          onChangeText={setPassword}
          placeholder="••••••••••••"
          secureTextEntry
        />

        <TouchableOpacity
          onPress={() => router.push('/(auth)/forgot-password')}
          style={styles.forgotWrapper}
        >
          <Text style={styles.forgotText}>Esqueceu sua senha?</Text>
        </TouchableOpacity>

        <PrimaryButton
          label={loading ? 'Entrando...' : 'Entrar'}
          onPress={handleLogin}
        />

        <TouchableOpacity onPress={() => router.push('/(auth)/register')} style={styles.bottomLink}>
          <Text style={styles.bottomLinkText}>
            Ainda não tem conta?{' '}
            <Text style={styles.bottomLinkAccent}>Cadastre-se</Text>
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0612' },
  scroll: { paddingHorizontal: 28, paddingBottom: 40 },
  logoWrapper: { alignItems: 'center', paddingTop: 56, paddingBottom: 36 },
  title: { fontSize: 26, fontWeight: '800', color: '#fff', marginBottom: 6 },
  subtitle: { fontSize: 14, color: 'rgba(255,255,255,0.4)', marginBottom: 32 },
  forgotWrapper: { alignItems: 'flex-end', marginBottom: 24 },
  forgotText: { color: '#8b5cf6', fontSize: 13 },
  bottomLink: { alignItems: 'center', marginTop: 16 },
  bottomLinkText: { color: 'rgba(255,255,255,0.35)', fontSize: 13 },
  bottomLinkAccent: { color: '#8b5cf6', fontWeight: '600' },
});