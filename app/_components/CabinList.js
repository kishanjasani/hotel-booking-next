import CabinCard from './CabinCard';
import { getCabins } from '@/app/_lib/data-service';

export default async function CabinList({ filter }) {
	const cabins = await getCabins();

	if (!cabins.length) {
		return null;
	}

	let displayedCabins;
	if (filter === 'all') displayedCabins = cabins;

	if (filter === 'small')
		displayedCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);

	if (filter === 'medium')
		displayedCabins = cabins.filter(
			(cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7,
		);

	if (filter === 'large')
		displayedCabins = cabins.filter((cabin) => cabin.maxCapacity >= 8);

	if (!displayedCabins.length) {
		return <div>No cabin found!</div>;
	}
	return (
		<>
			<div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-14">
				{displayedCabins.map((cabin) => (
					<CabinCard cabin={cabin} key={cabin.id} />
				))}
			</div>
		</>
	);
}
