import Svg, { Circle, Path } from 'react-native-svg';

const INACTIVE = 'rgba(255,255,255,0.35)';

export function ProfileIcon({ active }: { active: boolean }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={8} r={4} stroke={active ? '#fff' : INACTIVE} strokeWidth={1.8} />
      <Path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke={active ? '#fff' : INACTIVE} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}