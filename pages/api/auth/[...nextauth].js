import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GitHubProvider from "next-auth/providers/github";
import axios from "axios";

export default NextAuth({
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: {  label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                // You can also use the `req` object to obtain additional parameters
                // (i.e., the request IP address)
                // const res = await fetch("http://127.0.0.1:4005/api/v1/users/admin/login", {
                //     method: 'POST',
                //     body: JSON.stringify(credentials),
                //     headers: { "Content-Type": "application/json" }
                // })
                // const response = await res.json()
                if(credentials.username === 'admin' && credentials.password==='admin'){
                    return {
                        user: 'hanif',
                        token: 'tessss123123'
                    }
                }
                // Return null if user data could not be retrieved
                return null
            }
        }),
        // GitHubProvider({
        //     clientId: process.env.GITHUB_CLIENT_ID,
        //     clientSecret: process.env.GITHUB_CLIENT_SECRET
        // })
    ],
    callbacks: {
        jwt: ({ token, user }) => {
            // first time jwt callback is run, user object is available
            console.log(token)
            if (user) {
                token.user = user.user;
                token.token = user.token;
            }

            return token;
        },
        session: ({ session, token }) => {
            if (token) {
                session.user = token.user;
                session.token = token.token;
            }

            return session;
        },
    },
    secret: "test",
    jwt: {
        secret: "test",
        encryption: true,
    },
    // pages: {
    //     signIn: '/anggota/tambah'
    // }
})
