import { Image, type ImageProps } from "expo-image"
export function LogoImage(props: ImageProps){
    return (
        <Image source = {require("../../../../assets/images/logo.png")} {...props}></Image>
    )
}