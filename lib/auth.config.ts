import { NextAuthConfig } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { getUserAuthByEmail } from '@/src/queries/select';
import { compare } from 'bcryptjs';

const authConfig = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
        }),
        CredentialProvider({
            credentials: {
                email: {
                    type: 'email'
                },
                password: {
                    type: 'password'
                }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = await getUserAuthByEmail(credentials.email.toString());

                if (!user) {
                    return null;
                }

                const isPasswordValid = await compare(credentials.password.toString(), user.password.toString());

                if (!isPasswordValid) {
                    return null;
                }

                return {
                    id: user.id.toString(),
                    email: user.email,
                    name: user.name,
                };
            }
        })
    ],
    pages: {
        signIn: '/login' //sigin page
    }
} satisfies NextAuthConfig;

export default authConfig;
