import Svg, { Path, SvgProps } from "react-native-svg"
import { COLORS } from "../../../constants/colors"


export function EyeClosedIcon(props: SvgProps) {
  return (
    <Svg
      width={19}
      height={19}
      viewBox="0 0 19 19"
      fill="none"
      {...props}
    >
      <Path
        d="M7.567 7.567A2.5 2.5 0 1011.1 11.1M8.275 3.567A8.69 8.69 0 019.333 3.5c5.834 0 8.334 5.833 8.334 5.833-.373.798-.84 1.548-1.392 2.234M4.842 4.842A11.272 11.272 0 001 9.333s2.5 5.834 8.333 5.834a8.117 8.117 0 004.492-1.342M1 1l16.667 16.667"
        stroke={COLORS.blue}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={1}
      />
    </Svg>
  )
}