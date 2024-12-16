import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { cookies as Cookies } from 'next/headers';
// import Cookies from 'js-cookie';
import { User, NextAuthOptions } from 'next-auth';
import { throws } from 'assert';

const authOptions: NextAuthOptions = {
    pages: {
        signIn: '/authentication',
    },
    providers: [
        CredentialsProvider({
            id: 'auth-api',
            name: 'Credentials',
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                if (!credentials) {
                    return null;
                }
                try {
                    const url = process.env.NEXT_PUBLIC_URL + 'users/auth';
                    const options = {
                        userDsEmail: credentials?.email,
                        userCdPassword: credentials?.password,
                    };
                    const response = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                        },
                        body: JSON.stringify(options),
                    });
                    if (response.ok) {
                        const json = await response.json();
                        let userLogin: User = {
                            id: json.user.uid,
                            name: json.user.userNmName,
                            email: json.user.userDsEmail,
                            image: json.user.userTxAvatar,
                            provider: json.user.userCdType,
                            token: json.token,
                        };
                        return userLogin;
                    } else {
                        const errorData = await response.json();
                        return null;
                    }
                } catch (error) {
                    return null;
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code',
                },
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            console.log('ENTREI NO SIGNIN');
            const isAllowedToSignIn = true;
            if (isAllowedToSignIn) {
                if (account.provider === 'auth-api') {
                    console.log('Entrei com a conta do usuário');
                }
                if (account.provider === 'google') {
                    console.log('Entrei com a conta do google');
                    // Gerando Token para acesso
                    const sigla = user.name && user.name.substring(0, 3);
                    const userToken = {
                        uid: user.id,
                        userSgUser: sigla,
                        userNmName: user.name,
                        userTxAvatar: user.image,
                        userDsEmail: user.email,
                        userCdType: 'V',
                    };
                    const url = process.env.NEXT_PUBLIC_URL + 'users/social';
                    try {
                        const result = await fetch(url, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Access-Control-Allow-Origin': '*',
                            },
                            body: JSON.stringify(userToken),
                        });
                        if (result.ok) {
                            const user_token = await result.json();
                            let userLogin: User = {
                                id: user_token.user.uid,
                                name: user_token.user.userNmName,
                                email: user_token.user.userDsEmail,
                                image: user_token.user.userTxAvatar,
                                provider: user_token.user.userCdType,
                                token: user_token.token,
                            };
                            user.provider = userLogin.provider;
                            user.token = userLogin.token;
                        } else {
                            return false;
                        }
                    } catch (error) {
                        return false;
                    }
                }
                return true;
            } else {
                return false;
            }
        },
        async jwt({ token, user }) {
            return { ...user, ...token };
        },
        async session({ session, user, token }) {
            session = token as any;
            const cookiesStore = Cookies();
            await cookiesStore.set('drteeth-user', JSON.stringify(token));
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };
