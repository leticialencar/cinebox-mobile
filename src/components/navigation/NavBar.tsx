import { HomeIcon }          from '@/components/icons/HomeIcon';
import { ExploreIcon }       from '@/components/icons/ExploreIcon';
import { CollectionNavIcon } from '@/components/icons/CollectionNavIcon';
import { ProfileIcon }       from '@/components/icons/ProfileIcon';
import { usePathname, useRouter } from 'expo-router';
import { JSX, useEffect, useRef } from 'react';
import { Animated, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const BG      = '#080511';
const PURPLE  = '#7c3aed';
const INACTIVE = 'rgba(255,255,255,0.35)';

const tabs = [
  { label: 'Início',   route: '/home',       Icon: HomeIcon },
  { label: 'Explorar', route: '/search',     Icon: ExploreIcon },
  { label: 'Coleção',  route: '/collection', Icon: CollectionNavIcon },
  { label: 'Perfil',   route: '/profile',    Icon: ProfileIcon },
];

function TabItem({
  label, Icon, active, onPress,
}: {
  label: string;
  route: string;
  Icon: ({ active }: { active: boolean }) => JSX.Element;
  active: boolean;
  onPress: () => void;
}) {
  const pillWidth  = useRef(new Animated.Value(active ? 1 : 0)).current;
  const textOpacity = useRef(new Animated.Value(active ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(pillWidth,   { toValue: active ? 1 : 0, useNativeDriver: false, bounciness: 8 }),
      Animated.timing(textOpacity, { toValue: active ? 1 : 0, duration: 150, useNativeDriver: false }),
    ]).start();
  }, [active]);

  const bgColor = pillWidth.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(124,58,237,0)', 'rgba(124,58,237,1)'],
  });

  const paddingH = pillWidth.interpolate({
    inputRange: [0, 1],
    outputRange: [8, 16],
  });

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Animated.View style={[s.pill, { backgroundColor: bgColor, paddingHorizontal: paddingH }]}>
        <Icon active={active} />
        <Animated.Text style={[s.pillLabel, { opacity: textOpacity, maxWidth: textOpacity.interpolate({ inputRange: [0, 1], outputRange: [0, 80] }) }]}>
          {label}
        </Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

export function NavBar() {
  const router   = useRouter();
  const pathname = usePathname();

  return (
    <View style={s.wrapper}>
      <View style={s.bar}>
        {tabs.map(({ label, route, Icon }) => (
          <TabItem
            key={route}
            label={label}
            route={route}
            Icon={Icon}
            active={pathname === route}
            onPress={() => router.push(route as any)}
          />
        ))}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  wrapper: {
    paddingBottom: Platform.OS === 'ios' ? 24 : 8,
    paddingTop: 8,
    backgroundColor: BG,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 16,
    gap: 4,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    height: 40,
    borderRadius: 20,
    paddingVertical: 8,
    overflow: 'hidden',
  },
  pillLabel: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    overflow: 'hidden',
  },
});