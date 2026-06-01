import Svg, { Circle, Path } from 'react-native-svg';

type Props = { size?: number; opacity?: number };

export function SearchIcon({ size = 18, opacity = 0.35 }: Props) {
  const stroke = `rgba(255,255,255,${opacity})`;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={11} cy={11} r={8} stroke={stroke} strokeWidth={2} />
      <Path d="M21 21l-4.35-4.35" stroke={stroke} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}