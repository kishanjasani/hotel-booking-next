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
