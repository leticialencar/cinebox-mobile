import { TouchableOpacity, View } from 'react-native';
import Svg, { ClipPath, Defs, Path, Rect } from 'react-native-svg';

type Props = {
  value: number;
  onChange: (v: number) => void;
};

const STAR = "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z";

function Star({ filled, half }: { filled: boolean; half: boolean }) {
  return (
    <Svg width={32} height={32} viewBox="0 0 24 24">
      <Defs>
        <ClipPath id="leftHalf">
          <Rect x="0" y="0" width="12" height="24" />
        </ClipPath>
        <ClipPath id="rightHalf">
          <Rect x="12" y="0" width="12" height="24" />
        </ClipPath>
      </Defs>

      <Path d={STAR} fill="rgba(255,255,255,0.15)" />

      {(filled || half) && (
        <Path d={STAR} fill="#8b5cf6" clipPath="url(#leftHalf)" />
      )}

      {filled && (
        <Path d={STAR} fill="#8b5cf6" clipPath="url(#rightHalf)" />
      )}
    </Svg>
  );
}

export function StarRating({ value, onChange }: Props) {
  return (
    <View style={{ flexDirection: 'row', gap: 6 }}>
      {[2, 4, 6, 8, 10].map((v) => {
        const filled = value >= v;
        const half = !filled && value === v - 1;

        return (
          <View key={v} style={{ width: 32, height: 32 }}>
            <Star filled={filled} half={half} />
            <TouchableOpacity
              style={{ position: 'absolute', left: 0, top: 0, width: 16, height: 32 }}
              onPress={() => onChange(v - 1)}
            />
            <TouchableOpacity
              style={{ position: 'absolute', right: 0, top: 0, width: 16, height: 32 }}
              onPress={() => onChange(v)}
            />
          </View>
        );
      })}
    </View>
  );
}