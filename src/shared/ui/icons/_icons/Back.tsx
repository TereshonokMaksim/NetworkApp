import Svg, { Path, type SvgProps } from "react-native-svg"

export function BackIcon(props: SvgProps) {
    return (
        <Svg
        width={20}
        height={20}
        viewBox="0 0 20 20"
        {...props}
        >
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.333 16.004a.992.992 0 01-1.402 0l-5.29-5.29a.992.992 0 010-1.402l5.29-5.29a.992.992 0 111.402 1.402l-4.59 4.589 4.59 4.589a.991.991 0 010 1.402z"
                fillOpacity={1}
            />
        </Svg>
    )
}
