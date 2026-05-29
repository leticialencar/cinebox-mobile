import { FormField } from '@/components/FormField';
import { BrandLogo } from '@/components/logo/BrandLogo';
import PrimaryButton from '../../components/Primarybutton';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

        <PrimaryButton label="Entrar" onPress={() => {/* chamar login aqui */}} />

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