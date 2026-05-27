import Svg, { Path, SvgProps } from "react-native-svg"

export function CheckMarkIcon(props: SvgProps) {
    return (
        <Svg
            width={10}
            height={10}
            viewBox="0 0 10 10"
            {...props}
        >
            <Path
                d="M8.75 1.875L3.5 8.125l-2.25-2.5"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeOpacity={1}
            />
        </Svg>
    )
}
