import { COLORS } from "../../../constants/colors"
import Svg, { Path, SvgProps } from "react-native-svg"

export function GaleryIcon(props: SvgProps) {
  return (
        <Svg
            width={20}
            height={20}
            viewBox="0 0 20 20"
            fill="none"
            {...props}
        >
            <Path
                d="M1.666 5a3.333 3.333 0 013.333-3.333h10A3.334 3.334 0 0118.333 5v10a3.333 3.333 0 01-3.334 3.333H5A3.333 3.333 0 011.666 15V5z"
                stroke={COLORS.blue}
                strokeWidth={1.66667}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeOpacity={1}
            />
            <Path
                d="M7.082 9.167a2.083 2.083 0 100-4.167 2.083 2.083 0 000 4.167zM12.104 10.518l-7.105 7.815h10.11a3.223 3.223 0 003.223-3.222V15c0-.39-.146-.538-.408-.826l-3.358-3.662a1.665 1.665 0 00-2.462.005z"
                stroke={COLORS.blue}
                strokeWidth={1.66667}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeOpacity={1}
            />
        </Svg>
    )
}