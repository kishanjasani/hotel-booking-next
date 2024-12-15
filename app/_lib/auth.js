import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { createGuest, getGuest } from './data-service';

const authConfig = {
	providers: [
		Google({
			clientId: process.env.AUTH_GOOGLE_ID,
			clientSecret: process.env.AUTH_GOOGLE_SECRET,
		}),
	],
	callbacks: {
		authorized({ auth, request }) {
			return !!auth?.user;
		},
		async signIn(user) {
			try {
				const existingGuest = await getGuest(user.user.email);

				if (!existingGuest) {
					await createGuest({
						email: user.user.email,
						fullName: user.user.name,
					});
				}
				return true;
			} catch {
				return false;
			}
		},
		async session({ session, user }) {
			const guest = getGuest(session.user.email);
			session.user.guestId = guest.id;
			return session;
		},
	},
	pages: {
		signIn: '/login',
	},
};

export const {
	handlers: { GET, POST },
	signIn,
	signOut,
	auth,
} = NextAuth(authConfig);
