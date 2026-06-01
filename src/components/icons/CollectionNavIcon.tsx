import Svg, { Rect } from 'react-native-svg';

const INACTIVE = 'rgba(255,255,255,0.35)';

export function CollectionNavIcon({ active }: { active: boolean }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Rect x={3} y={3} width={7} height={7} rx={1} stroke={active ? '#fff' : INACTIVE} strokeWidth={1.8} />
      <Rect x={14} y={3} width={7} height={7} rx={1} stroke={active ? '#fff' : INACTIVE} strokeWidth={1.8} />
      <Rect x={3} y={14} width={7} height={7} rx={1} stroke={active ? '#fff' : INACTIVE} strokeWidth={1.8} />
      <Rect x={14} y={14} width={7} height={7} rx={1} stroke={active ? '#fff' : INACTIVE} strokeWidth={1.8} />
    </Svg>
  );
}