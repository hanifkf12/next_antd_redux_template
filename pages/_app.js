import '../styles/globals.css'
import React from "react";
import 'antd/dist/antd.css';
import {SessionProvider} from 'next-auth/react'
import {useSession} from "next-auth/react";
import {wrapper} from "../redux/store";
import '../utils/Tes.module.css';

function MyApp({Component, pageProps: {session, ...pageProps}}) {
    const getLayout = Component.getLayout || ((page) => page)
    return (
        <SessionProvider session={session}>
            {Component.auth ? (
                <Auth>
                    {getLayout(
                        <Component {...pageProps} />
                    )}
                </Auth>
            ) : getLayout(
                <Component {...pageProps} />
            )
            }
        </SessionProvider>
    )
}

function Auth({children}) {
    const {data: session, status} = useSession({required: true})
    const isUser = !!session?.user

    if (isUser) {
        return children
    }

    // Session is being fetched, or no user.
    // If no user, useEffect() will redirect.
    return <div>Loading Masss...</div>
}

export default wrapper.withRedux(MyApp)
