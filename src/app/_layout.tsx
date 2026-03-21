import { Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Header } from "../shared/ui/header/Header";


export default function LayoutDef(){
    return (
        <SafeAreaProvider style = {{paddingTop: 36}}>
            <Header></Header>
            <Slot></Slot>
        </SafeAreaProvider>
    )
}