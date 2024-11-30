import Image from 'next/image';
import Link from 'next/link';
import logo from '@/public/logo.png';

export default function Logo() {
	return (
		<Link href="/" className="flex items-center gap-4 z-10">
			<Image
				src={logo}
				height="60"
				quality={100}
				width="60"
				alt="The Hotel Booking logo"
			/>
			<span className="text-xl font-semibold text-primary-100">
				The Hotel Booking
			</span>
		</Link>
	);
}
