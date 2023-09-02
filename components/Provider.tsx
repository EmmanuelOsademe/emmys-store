"use client"

import {SessionProvider} from "next-auth/react"
import type { Session } from "next-auth"

const Provider: React.FC<Prop> = ({children, session}) => {

    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    )
}

interface Prop {
    children: React.ReactNode;
    session?: Session
}

export default Provider;