import { Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import type { Movie, Filter, Sort } from '@/types/collection';

const PURPLE  = '#7c3aed';
const HDR_TOP = Platform.OS === 'ios' ? 54 : 36;

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all',      label: 'Todos' },
  { key: 'favorite', label: '♥ Favoritos' },
  { key: 'rated',    label: 'Avaliados' },
  { key: 'unrated',  label: 'Sem nota' },
  { key: 'movie',    label: 'Filmes' },
  { key: 'tv',       label: 'Séries' },
];

const SORTS: { key: Sort; label: string }[] = [
  { key: 'recent', label: 'Recentes' },
  { key: 'title',  label: 'A–Z' },
  { key: 'rating', label: 'Nota' },
  { key: 'year',   label: 'Ano' },
];

type Props = {
  total: number;
  search: string;
  filter: Filter;
  sort: Sort;
  viewMode: 'grid' | 'list';
  onSearch: (text: string) => void;
  onFilter: (f: Filter) => void;
  onSort: (s: Sort) => void;
  onViewMode: (v: 'grid' | 'list') => void;
};

export function CollectionHeader({ total, search, filter, sort, viewMode, onSearch, onFilter, onSort, onViewMode }: Props) {
  return (
    <View style={s.header}>
      <View style={s.top}>
        <View>
          <Text style={s.title}>Minha Coleção</Text>
          <Text style={s.sub}>{total} {total === 1 ? 'título' : 'títulos'}</Text>
        </View>
        <View style={s.toggle}>
          <TouchableOpacity style={[s.toggleBtn, viewMode === 'grid' && s.toggleBtnActive]} onPress={() => onViewMode('grid')}>
            <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
              <Path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z" stroke={viewMode === 'grid' ? '#fff' : 'rgba(255,255,255,0.4)'} strokeWidth={1.8} strokeLinejoin="round" />
            </Svg>
          </TouchableOpacity>
          <TouchableOpacity style={[s.toggleBtn, viewMode === 'list' && s.toggleBtnActive]} onPress={() => onViewMode('list')}>
            <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
              <Path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" stroke={viewMode === 'list' ? '#fff' : 'rgba(255,255,255,0.4)'} strokeWidth={1.8} strokeLinecap="round" />
            </Svg>
          </TouchableOpacity>
        </View>
      </View>

      <View style={s.searchWrapper}>
        <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" style={s.searchIcon}>
          <Path d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" stroke="rgba(255,255,255,0.3)" strokeWidth={2} strokeLinecap="round" />
        </Svg>
        <TextInput
          style={s.searchInput}
          placeholder="Buscar na coleção..."
          placeholderTextColor="rgba(255,255,255,0.25)"
          value={search}
          onChangeText={onSearch}
        />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.filtersRow}>
        {FILTERS.map((f) => (
          <TouchableOpacity key={f.key} style={[s.filterBtn, filter === f.key && s.filterBtnActive]} onPress={() => onFilter(f.key)}>
            <Text style={[s.filterText, filter === f.key && s.filterTextActive]}>{f.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.sortRow}>
        {SORTS.map((so) => (
          <TouchableOpacity key={so.key} style={[s.sortBtn, sort === so.key && s.sortBtnActive]} onPress={() => onSort(so.key)}>
            <Text style={[s.sortText, sort === so.key && s.sortTextActive]}>{so.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  header:          { backgroundColor: '#080511', paddingTop: HDR_TOP, paddingBottom: 8 },
  top:             { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', paddingHorizontal: 20, marginBottom: 16 },
  title:           { color: '#fff', fontSize: 22, fontWeight: '800' },
  sub:             { color: 'rgba(255,255,255,0.35)', fontSize: 12, marginTop: 2 },
  toggle:          { flexDirection: 'row', gap: 8 },
  toggleBtn:       { width: 36, height: 36, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', alignItems: 'center', justifyContent: 'center' },
  toggleBtnActive: { backgroundColor: 'rgba(124,58,237,0.2)', borderColor: PURPLE },
  searchWrapper:   { flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', paddingHorizontal: 14, marginBottom: 12 },
  searchIcon:      { marginRight: 8 },
  searchInput:     { flex: 1, color: '#fff', fontSize: 14, paddingVertical: 12 },
  filtersRow:      { paddingHorizontal: 20, gap: 8, paddingBottom: 8 },
  filterBtn:       { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  filterBtnActive: { backgroundColor: 'rgba(124,58,237,0.2)', borderColor: PURPLE },
  filterText:      { color: 'rgba(255,255,255,0.4)', fontSize: 13, fontWeight: '500' },
  filterTextActive:{ color: '#c4b5fd', fontWeight: '700' },
  sortRow:         { paddingHorizontal: 20, gap: 6, paddingBottom: 12 },
  sortBtn:         { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.03)' },
  sortBtnActive:   { backgroundColor: 'rgba(124,58,237,0.15)' },
  sortText:        { color: 'rgba(255,255,255,0.3)', fontSize: 12 },
  sortTextActive:  { color: '#a78bfa', fontWeight: '600' },
});