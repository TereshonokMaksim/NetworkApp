import Svg, { Path, SvgProps } from "react-native-svg"

export function LogoutIcon(props: SvgProps) {
    return (
        <Svg
            width={20}
            height={20}
            viewBox="0 0 20 20"
            fill="none"
            {...props}
        >
            <Path
                d="M3.124 2.228h5a.898.898 0 110 1.794H4.021v11.956h4.103a.898.898 0 110 1.795h-5a.898.898 0 01-.897-.898V3.125a.898.898 0 01.897-.897zm10.624 3.749a.9.9 0 01.636.263l3.125 3.125a.897.897 0 010 1.272h-.001l-3.125 3.125a.9.9 0 11-1.272-1.272l1.526-1.524.068-.068H8.124a.898.898 0 110-1.795h6.581l-.068-.069-1.525-1.522a.9.9 0 01.636-1.535z"
                fill="#543C52"
                stroke="#543C52"
                strokeWidth={0.08}
                fillOpacity={1}
                strokeOpacity={1}
            />
        </Svg>
    )
}