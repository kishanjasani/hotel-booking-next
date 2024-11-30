import localFont from 'next/font/local';
import '@/app/_styles/globals.css';

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
});
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
});

export const metadata = {
	// title: 'The hotel booking',
	title: {
		template: '%s Hotel booking',
		default: 'Welcome / Hotel booking',
	},
	description:
		'Luxurios cabin hotel, located in the heart of italian dolomites, surrounded by beautiful mountains and dark forest.',
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
