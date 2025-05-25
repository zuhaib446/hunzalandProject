import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import * as argon2 from 'argon2';
import clientPromise from '@/lib/mongodb';

declare module 'next-auth' {
  interface User {
    role?: string;
  }
  interface Session {
    user?: {
      role?: string;
      [key: string]: any;
    };
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error('Invalid credentials');
          }

          const client = await clientPromise();
          const db = client.db('hunzaland');
          const users = db.collection('users');

          // Create admin user if not exists
          const adminEmail = 'admin@hunzaland.com';
          const adminPassword = 'admin123';
          const admin = await users.findOne({ email: adminEmail });
          
          if (!admin) {
            const hashedPassword = await argon2.hash(adminPassword);
            await users.insertOne({
              email: adminEmail,
              password: hashedPassword,
              name: 'Admin',
              role: 'admin',
              createdAt: new Date(),
            });
          }

          const user = await users.findOne({ email: credentials.email });
          
          if (!user || !user.password) {
            throw new Error('Invalid credentials');
          }

          const isValid = await argon2.verify(user.password, credentials.password);
          
          if (!isValid) {
            throw new Error('Invalid credentials');
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };