import { BackButton } from '@/components/icons/BackIcon';
import { FormField } from '@/components/FormField';
import PrimaryButton from '@/components/PrimaryButton';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <BackButton />

      <View style={styles.content}>
        <Text style={styles.title}>Esqueceu sua senha?</Text>
        <Text style={styles.subtitle}>
          Sem problemas! Insira seu e-mail para redefinir sua senha.
        </Text>

        <FormField
          label="E-mail"
          value={email}
          onChangeText={setEmail}
          placeholder="seuemail@exemplo.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <PrimaryButton label="Enviar link de redefinição" onPress={() => {}} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0612', paddingHorizontal: 28 },
  content: { flex: 1, paddingTop: 16 },
  title: { fontSize: 28, fontWeight: '800', color: '#fff', marginBottom: 10 },
  subtitle: { fontSize: 14, color: 'rgba(255,255,255,0.45)', marginBottom: 36, lineHeight: 22 },
});