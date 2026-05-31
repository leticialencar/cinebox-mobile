import { BrandLogo } from '@/components/logo/BrandLogo';
import { FormField } from '@/components/FormField';
import PrimaryButton from '@/components/PrimaryButton';
import Storage from '@/utils/storage';
import { router, useRouter } from 'expo-router';
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

export default function RegisterScreen() {
  const localRouter = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Atenção', 'As senhas não coincidem.');
      return;
    }
    if (!agreed) {
      Alert.alert('Atenção', 'Você precisa aceitar os Termos de Uso.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          password_confirmation: confirmPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        const firstError = data.errors
          ? (Object.values(data.errors) as string[][])[0][0]
          : data.message ?? 'Erro ao cadastrar.';
        Alert.alert('Erro', firstError);
        return;
      }

      await Storage.set('token', data.token);
      await Storage.set('user', JSON.stringify(data.user));

      router.dismissAll();
      router.replace('/(protected)/home' as any);
    } catch (err) {
      console.log('CATCH:', err);
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

        <Text style={styles.title}>Criar conta</Text>
        <Text style={styles.subtitle}>É rápido e fácil!</Text>

        <FormField
          label="Nome"
          value={name}
          onChangeText={setName}
          placeholder="Seu nome"
        />

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

        <FormField
          label="Confirmar senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="••••••••••••"
          secureTextEntry
        />

        <TouchableOpacity style={styles.checkboxRow} onPress={() => setAgreed(!agreed)}>
          <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
            {agreed && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.checkboxText}>
            Eu concordo com os{' '}
            <Text style={styles.linkText}>Termos de Uso</Text> e{' '}
            <Text style={styles.linkText}>Política de Privacidade</Text>
          </Text>
        </TouchableOpacity>

        <PrimaryButton
          label={loading ? 'Cadastrando...' : 'Cadastrar'}
          onPress={handleRegister}
        />

        <TouchableOpacity onPress={() => localRouter.push('/(auth)/login')} style={styles.bottomLink}>
          <Text style={styles.bottomLinkText}>
            Já tem conta?{' '}
            <Text style={styles.bottomLinkAccent}>Entrar</Text>
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0612' },
  scroll: { paddingHorizontal: 28, paddingBottom: 40 },
  logoWrapper: { alignItems: 'center', paddingTop: 64, paddingBottom: 32 },
  title: { fontSize: 28, fontWeight: '800', color: '#fff', marginBottom: 6 },
  subtitle: { fontSize: 14, color: 'rgba(255,255,255,0.45)', marginBottom: 32 },
  checkboxRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 28, marginTop: 4 },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  checkboxChecked: { backgroundColor: '#7c3aed', borderColor: '#7c3aed' },
  checkmark: { color: '#fff', fontSize: 12, fontWeight: '700' },
  checkboxText: { flex: 1, color: 'rgba(255,255,255,0.5)', fontSize: 13, lineHeight: 20 },
  linkText: { color: '#8b5cf6' },
  bottomLink: { alignItems: 'center', marginTop: 16 },
  bottomLinkText: { color: 'rgba(255,255,255,0.4)', fontSize: 13 },
  bottomLinkAccent: { color: '#8b5cf6', fontWeight: '600' },
});