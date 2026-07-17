import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";
import bcryptjs from "bcryptjs";
import { z } from "zod";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const user = await prisma.user.findUnique({
          where: { email: parsed.data.email },
          include: { userRoles: { include: { role: { include: { rolePermissions: { include: { permission: true } } } } } } },
        });

        if (!user || !user.password) return null;

        const isPasswordValid = await bcryptjs.compare(parsed.data.password, user.password);
        if (!isPasswordValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }

      if (trigger === "update") {
        token = { ...token, ...session };
      }

      // Load user permissions on token creation/update
      const dbUser = await prisma.user.findUnique({
        where: { id: token.id as string },
        include: {
          userRoles: {
            include: {
              role: {
                include: {
                  rolePermissions: {
                    include: { permission: true },
                  },
                },
              },
            },
          },
        },
      });

      if (dbUser) {
        const permissions = new Set<string>();
        for (const userRole of dbUser.userRoles) {
          for (const rolePerm of userRole.role.rolePermissions) {
            permissions.add(rolePerm.permission.name);
          }
        }

        token.permissions = Array.from(permissions);
        token.roles = dbUser.userRoles.map((ur) => ur.role.name);
      }

      return token;
    },
    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          permissions: token.permissions as string[],
          roles: token.roles as string[],
        },
      };
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  events: {
    async signIn({ user }) {
      // Update last active time
      if (user.id) {
        await prisma.user.update({
          where: { id: user.id as string },
          data: { lastActiveAt: new Date() },
        });
      }
    },
  },
});
