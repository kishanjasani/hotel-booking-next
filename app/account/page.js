import { auth } from '../_lib/auth';

export default async function Page() {
	const session = await auth();

	return <h1>Welcome, {session.user.name}</h1>;
}
