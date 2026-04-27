import Svg, { Path, SvgProps } from "react-native-svg"
import { COLORS } from "../../../constants/colors"


export function TrashIcon(props: SvgProps) {
    return (
        <Svg
        width={15}
        height={17}
        viewBox="0 0 15 17"
        fill = "none"
        {...props}
        >
        <Path
            d="M.834 4.167h13.333M5.834 7.5v5m3.333-5v5m-7.5-8.333l.834 10a1.666 1.666 0 001.666 1.667h6.667a1.667 1.667 0 001.667-1.667l.833-10m-8.333 0v-2.5a.833.833 0 01.833-.834h3.333a.833.833 0 01.834.834v2.5"
            strokeWidth={1.66667}
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke={COLORS.blue}
            strokeOpacity={1}
        />
        </Svg>
    )
}
