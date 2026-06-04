import Svg, { Path, SvgProps } from "react-native-svg"

export function CheckMarkIcon(props: SvgProps) {
    return (
        <Svg
            width={20}
            height={20}
            viewBox="0 0 10 10"
            {...props}
        >
            <Path
        d="M8.75 1.875L3.5 8.125L1.25 5.625"
        stroke="color(display-p3 .5059 .5059 .5529)"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={1}
            />
        </Svg>
    )
}

