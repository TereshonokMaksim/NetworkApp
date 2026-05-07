import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

export function LikeIcon(props: SvgProps) {
    return (
        <Svg
        width={20}
        height={20}
        viewBox="0 0 20 20"
        {...props}
        >
        <Path
            d="M18.516 6.99a2.187 2.187 0 00-1.641-.74h-4.063v-.938a3.441 3.441 0 00-3.437-3.437.937.937 0 00-.838.518L5.67 8.125H2.5A1.562 1.562 0 00.937 9.688v6.874A1.563 1.563 0 002.5 18.125h13.438a2.188 2.188 0 002.17-1.916l.937-7.5a2.187 2.187 0 00-.53-1.72zM2.813 10h2.5v6.25h-2.5V10zm14.374-1.523l-.937 7.5a.313.313 0 01-.313.273h-8.75V9.284l2.72-5.44a1.562 1.562 0 011.03 1.469v1.875a.938.938 0 00.938.937h5a.313.313 0 01.313.352z"
            fillOpacity={1}
        />
        </Svg>
    )
}
