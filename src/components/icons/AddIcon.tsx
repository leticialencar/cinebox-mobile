import Svg, { Path } from 'react-native-svg';

type Props = { size?: number; opacity?: number };

export function AddIcon({ size = 16, opacity = 0.7 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 5v14M5 12h14"
        stroke={`rgba(255,255,255,${opacity})`}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}