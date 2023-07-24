import NextAuth from 'next-auth/next';
import Credentials from 'next-auth/providers/credentials';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { NextAuthOptions } from 'next-auth';
import { FirestoreAdapter } from '@next-auth/firebase-adapter';
import { firestore, auth } from '@/lib/firestore';

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password required');
        }

        const { email, password } = credentials;

        try {
          const userCred = await signInWithEmailAndPassword(
            auth,
            email,
            password,
          );
          const user = userCred.user;
          console.log('success to login =D', JSON.stringify(user, null, 2));
          return user;
        } catch (error) {
          console.error('Error signing in user', error);
          throw new Error(error.message);
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  debug: process.env.NODE_ENV === 'development',
  // orioginal adapter - adapter: PrismaAdapter(prismadb),
  adapter: FirestoreAdapter(firestore),
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    session: async ({ session, token }) => {
      console.log('session callback', token);
      if (session?.user) {
        session.user.id = token.uid;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
