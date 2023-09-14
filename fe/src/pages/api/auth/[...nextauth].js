import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export default NextAuth({
  providers: [
    CredentialsProvider({
      session: {
        strategy: 'jwt'
      },
      pages: {
        signIn: '/login'
      },
      async authorize(credentials) {
        const authResponse = await fetch(`${process.env.BE_HOST}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        })

        if (!authResponse.ok) {
          const err = await authResponse.json();
          throw new Error(err?.error || err?.message)
        }

        const user = await authResponse.json()

        return user
      },
    }),
  ],
})