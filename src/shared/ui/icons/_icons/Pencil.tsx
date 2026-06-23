import Svg, { Path, SvgProps } from "react-native-svg"

export function PencilIcon(props: SvgProps) {
    return (
        <Svg
        width={15}
        height={15}
        viewBox="0 0 15 15"
        fill="none"
        {...props}
        >
        <Path
            d="M1.667 13.333h1.187L11 5.187 9.812 4l-8.145 8.146v1.187zM0 15v-3.542L11 .48c.167-.153.35-.27.553-.354.201-.083.413-.125.634-.125.222 0 .437.042.646.125.21.083.39.208.542.375l1.146 1.167c.166.152.288.333.365.541a1.783 1.783 0 010 1.261 1.542 1.542 0 01-.365.552L3.54 15H0zM10.396 4.604L9.812 4 11 5.188l-.604-.584z"
            fill="#543D52"
            fillOpacity={1}
        />
        </Svg>
    )
}
