import Link from 'next/link';
import { auth } from '../_lib/auth';

export default async function Navigation() {
	const session = await auth();

	return (
		<nav className="z-10 text-xl">
			<ul className="flex gap-16 items-center">
				<li>
					<Link
						href="/"
						className="hover:text-accent-400 transition-colors"
					>
						Home
					</Link>
				</li>
				<li>
					<Link
						href="/cabins"
						className="hover:text-accent-400 transition-colors"
					>
						Cabins
					</Link>
				</li>
				<li>
					<Link
						href="/about"
						className="hover:text-accent-400 transition-colors"
					>
						About
					</Link>
				</li>
				<li>
					{session?.user?.image ? (
						<Link
							href="/contact"
							className="hover:text-accent-400 transition-colors"
						>
							<img
								className="h-8 rounded-full"
								src={session.user.image}
								alt={session.user.name}
								referrerPolicy="no-referrer"
							/>
						</Link>
					) : (
						<Link
							href="/account"
							className="hover:text-accent-400 transition-colors"
						>
							Guest Area
						</Link>
					)}
				</li>
			</ul>
		</nav>
	);
}
