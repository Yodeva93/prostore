import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compareSync } from 'bcrypt-ts-edge';
import type { NextAuthConfig } from 'next-auth';

const prisma = new PrismaClient();
export const config = {
    pages: {
        signIn: '/sing-in',
        error: '/sing-in'
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60 // 30 days
    },
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            credentials: {
                email: {type: 'email'},
                password: {type: 'password'},
            },
            async authorize (credentials) {
                if (credentials == null) return null;

                const user = await prisma.user.findFirst({
                    where: {
                        email: credentials.email as string                        
                    }
                });

                if(user && user.password){
                    const isMatch = compareSync(credentials.password as string, user.password);
                    if (isMatch) {
                        return {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            role: user.role
                        };
                    }
                }
                // If no user or password does not match, return null
                return null;
            },
        }),
    ],
    callbacks: {
        async session({ session, user, trigger, token }: any) {

            session.user.id = token.sub;
            session.user.role = token.role;
            session.user.name = token.name;

            

            if (trigger === 'update' ) {
                session.user.name = user.name;
            }

            return session;
        },
        async jwt({token, user, trigger, session}: any) {
            //Assign user fields to token
            if(user) {
                token.role = user.role;
               // if user han no name then use the email
               if (user.name === 'NO_NAME'){
                token.name = user.email!.split('@')[0];

                //Update the database to reflect the token name
                await prisma.user.update({
                    where: {id: user.id},
                    data: {name: token.name}
                })
               }
            }

            return token;
        }
    },
} satisfies NextAuthConfig;

export const {handlers, auth, signIn, signOut} = NextAuth(config);