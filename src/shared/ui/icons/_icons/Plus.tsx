import Svg, { Path, SvgProps } from "react-native-svg"

export function PlusIcon(props: SvgProps) {
  return (
        <Svg
            width={20}
            height={20}
            viewBox="0 0 20 20"
            fill="none"
        >
            <Path
                d="M16.49 11.08h-5.408v5.409a1.082 1.082 0 11-2.164 0V11.08H3.51a1.082 1.082 0 010-2.163h5.41V3.508a1.082 1.082 0 012.163 0v5.409h5.408a1.082 1.082 0 010 2.163z"
                fill="#543C52"
                fillOpacity={1}
            />
        </Svg>
  )
}