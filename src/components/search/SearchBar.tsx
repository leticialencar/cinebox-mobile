import { ActivityIndicator, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { SearchIcon } from '@/components/icons/SearchIcon';

const PURPLE = '#7c3aed';

type Props = {
  value: string;
  searching: boolean;
  onChangeText: (text: string) => void;
  onClear: () => void;
  inputRef: React.RefObject<TextInput | null>;
};

export function SearchBar({ value, searching, onChangeText, onClear, inputRef }: Props) {
  return (
    <View style={s.searchPill}>
      <SearchIcon />
      <TextInput
        ref={inputRef}
        style={s.input}
        placeholder="Busque séries, filmes..."
        placeholderTextColor="rgba(255,255,255,0.3)"
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
      />
      {searching
        ? <ActivityIndicator size="small" color={PURPLE} />
        : value.length > 0
          ? (
            <TouchableOpacity onPress={onClear} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                <Path d="M18 6L6 18M6 6l12 12" stroke="rgba(255,255,255,0.5)" strokeWidth={2} strokeLinecap="round" />
              </Svg>
            </TouchableOpacity>
          )
          : null}
    </View>
  );
}

const s = StyleSheet.create({
  searchPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  input: { flex: 1, color: '#fff', fontSize: 15 },
});