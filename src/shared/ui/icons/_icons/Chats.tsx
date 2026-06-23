import { COLORS } from "../../../constants/colors"
import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

export function ChatsIcon(props: SvgProps) {
    return (
        <Svg
            width={20}
            height={20}
            viewBox="0 0 20 20"
            fill="none"
            {...props}
        >
            <Path
                d="M2.485 10a7.515 7.515 0 0115.03 0v4.781c0 .797 0 1.194-.118 1.512a1.879 1.879 0 01-1.103 1.104c-.319.118-.716.118-1.512.118h-4.781A7.515 7.515 0 012.485 10z"
                stroke={props.color ? props.color : COLORS.blue}
                strokeWidth={1.66667}
                strokeOpacity={1}
            />
            <Path
                d="M7.183 9.06h5.636m-2.818 3.758h2.818"
                stroke={props.color ? props.color : COLORS.blue}
                strokeWidth={1.66667}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeOpacity={1}
            />
        </Svg>
    )
}