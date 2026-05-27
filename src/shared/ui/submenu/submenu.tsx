import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SubmenuProps } from "./submenu.types";
import { Link, usePathname } from "expo-router";
import { styles } from "./submenu.styles";


export function Submenu(props: SubmenuProps){
    const currentLink = usePathname()
    const {links, reversed} = props
    return (
        <View style = {!reversed ? styles.submenu : styles.submenuReversed}>
            {links.map((el) => {
                let processed = currentLink.slice(1, currentLink.length)
                if (reversed) return <Link href = {el.href} key = {el.href} asChild>
                    <TouchableOpacity style = {StyleSheet.flatten([processed == el.href ? [styles.reversedLink, styles.reversedActiveLink] : [styles.reversedLink]])}>
                        {!!el.icon && el.icon}
                        {/* <Text style = {StyleSheet.flatten([processed != el.href ? styles.textBaseReversed : styles.textActivatedReversed])}>{el.name}</Text> */}
                        <Text style = {StyleSheet.flatten([true ? styles.textBaseReversed : styles.textActivatedReversed])}>{el.name}</Text>
                    </TouchableOpacity>
                </Link>
                return <Link href = {el.href} key = {el.href} asChild>
                    <Text style = {StyleSheet.flatten([processed != el.href ? styles.textBase : styles.textActivated])}>{el.name}</Text>
                </Link>
            })}
        </View>
    )
}