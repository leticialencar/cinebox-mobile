import { Image } from 'expo-image';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const PURPLE = '#7c3aed';
const BG     = '#080511';

type Props = {
  name: string;
  avatar: string | null;
  uploading: boolean;
  onPress: () => void;
};

export function ProfileAvatar({ name, avatar, uploading, onPress }: Props) {
  const initials = name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();

  return (
    <TouchableOpacity style={s.wrapper} onPress={onPress} activeOpacity={0.8}>
      {avatar ? (
        <Image source={{ uri: avatar }} style={s.img} contentFit="cover" />
      ) : (
        <View style={s.placeholder}>
          <Text style={s.initials}>{initials}</Text>
        </View>
      )}
      <View style={s.editBtn}>
        {uploading
          ? <ActivityIndicator size="small" color="#fff" />
          : (
            <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
              <Path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              <Path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
          )}
      </View>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  wrapper:     { position: 'relative', marginBottom: 16 },
  placeholder: { width: 90, height: 90, borderRadius: 45, backgroundColor: PURPLE, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: 'rgba(124,58,237,0.3)' },
  img:         { width: 90, height: 90, borderRadius: 45, borderWidth: 3, borderColor: 'rgba(124,58,237,0.3)' },
  initials:    { color: '#fff', fontSize: 32, fontWeight: '800' },
  editBtn:     { position: 'absolute', bottom: 0, right: 0, width: 28, height: 28, borderRadius: 14, backgroundColor: '#5b21b6', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: BG },
});