import { Stack } from 'expo-router';
import { View } from 'react-native';
import { NavBar } from '@/components/navigation/NavBar';

export default function ProtectedLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false, animation: 'fade' }} />
      <NavBar />
    </View>
  );
}