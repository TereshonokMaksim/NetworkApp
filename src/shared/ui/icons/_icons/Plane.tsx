import Svg, { Path, type SvgProps } from "react-native-svg"

export function PlaneIcon(props: SvgProps) {
    return (
        <Svg
            width={20}
            height={20}
            viewBox="0 0 20 20"
            fill="none"
            {...props}
        >
        <Path
            d="M17.33 8.63L4.2 1.138a1.563 1.563 0 00-2.237 1.88l2.357 6.98-2.357 6.982a1.562 1.562 0 002.239 1.88l.007-.005 13.125-7.505a1.562 1.562 0 000-2.72h-.003zM3.998 16.816l1.986-5.88h4.327a.938.938 0 000-1.875H5.983L3.996 3.18l11.935 6.81-11.934 6.826z"
            fill="#fff"
            fillOpacity={1}
        />
        </Svg>
    )
}
