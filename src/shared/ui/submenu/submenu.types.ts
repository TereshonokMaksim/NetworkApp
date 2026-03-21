import { ReactNode } from "react"

export interface SubmenuProps {
    reversed?: boolean,
    links: {
        name: string,
        href: string,
        icon?: ReactNode
    }[]
}