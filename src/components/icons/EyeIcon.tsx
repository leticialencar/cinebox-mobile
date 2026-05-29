import React from 'react';
import Svg, { Path, G } from 'react-native-svg';

type Props = { visible: boolean };

export function EyeIcon({ visible }: Props) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      {visible ? (
        <G stroke="rgba(255,255,255,0.4)" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <Path d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
        </G>
      ) : (
        <G stroke="rgba(255,255,255,0.4)" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <Path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
          <Path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
          <Path d="M1 1l22 22" />
        </G>
      )}
    </Svg>
  );
}