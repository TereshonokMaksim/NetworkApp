import { COLORS } from "../../../constants/colors"
import Svg, { Path, SvgProps } from "react-native-svg"

export function HomeIcon(props: SvgProps) {
  return (
        <Svg
            width={20}
            height={20}
            viewBox="0 0 20 20"
            fill="none"
            {...props}
        >
            <Path
                d="M17.133 8.625L11.07 2.564a1.515 1.515 0 00-2.143 0L2.867 8.625a1.505 1.505 0 00-.444 1.072v7.274a.91.91 0 00.91.91h13.334a.91.91 0 00.91-.91V9.697a1.506 1.506 0 00-.445-1.072zm-1.375 7.437H4.241v-6.24L10 4.064l5.758 5.758v6.24z"
                fill={COLORS.blue}
                fillOpacity={1}
            />
        </Svg>
    )
}