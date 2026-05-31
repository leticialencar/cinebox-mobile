import Svg, { Circle, Path } from 'react-native-svg';

const INACTIVE = 'rgba(255,255,255,0.35)';

export function ExploreIcon({ active }: { active: boolean }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Circle cx={11} cy={11} r={8} stroke={active ? '#fff' : INACTIVE} strokeWidth={1.8} />
      <Path d="M21 21l-4.35-4.35" stroke={active ? '#fff' : INACTIVE} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}