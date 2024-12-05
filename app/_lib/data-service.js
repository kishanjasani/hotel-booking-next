import { supabase, supacase } from '@/app/_lib/supabase';
import { notFound } from 'next/navigation';

export async function getCountries() {
	try {
		const res = await fetch(
			'https://restcountries.com/v2/all?fields=name,flag',
		);
		const countries = await res.json();
		return countries;
	} catch {
		throw new Error('Could not fetch countries');
	}
}

export async function getCabin(id) {
	const { data, error } = await supabase
		.from('cabins')
		.select('*')
		.eq('id', id)
		.single();

	// For testing UI.
	await new Promise((res) => setTimeout(res, 2000));

	if (error) {
		console.error(error);
		notFound();
	}
	return data;
}

export const getCabins = async function () {
	const { data, error } = await supabase
		.from('cabins')
		.select('id, name, maxCapacity, regularPrice, discount, image')
		.order('name');

	if (error) {
		console.error(error);
		throw new Error('Cabins could not be loaded!');
	}

	return data;
};

export async function getBookedDatesByCabinId(cabinId) {
	let today = new Date();
	today.setUTCHours(0, 0, 0, 0);
	today = today.toISOString();

	// For testing UI.
	await new Promise((res) => setTimeout(res, 2000));

	// Getting all bookings
	const { data, error } = await supabase
		.from('bookings')
		.select('*')
		.eq('cabinId', cabinId)
		.or(`startDate.gte.${today},status.eq.checked-in`);

	if (error) {
		console.error(error);
		throw new Error('Bookings could not get loaded');
	}

	// Converting to actual dates to be displayed in the date picker
	const bookedDates = data
		.map((booking) => {
			return eachDayOfInterval({
				start: new Date(booking.startDate),
				end: new Date(booking.endDate),
			});
		})
		.flat();

	return bookedDates;
}

export async function getSettings() {
	const { data, error } = await supabase
		.from('settings')
		.select('*')
		.single();

	// For testing UI.
	await new Promise((res) => setTimeout(res, 5000));

	if (error) {
		console.error(error);
		throw new Error('Settings could not be loaded');
	}

	return data;
}
