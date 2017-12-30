export { countries } from './countries.js';

export const suggestions = [
	'list',
	'of',
	'suggestions',
	'with',
	'default',
	'value',
	'...',
	'javascript',
	'react',
	'ssuggestor',
	'abcdefghijklmnopqrstuvwxyz',
	'abcdef',
	'ghijkl',
	'mnopqr',
	'stuvwx',
	'yzabcd',
	'ABCDEF',
	'01234567890',
	'01234',
	'56789',
	'11235',
	'3.14159265',
	'2.7182'
];

export const getNumbersList = (init = 0, end = 100) => {
	let numbers = [];
	for (let i = init; i < end; i++) {
		numbers.push('' + i);
	}
	return numbers;
};

export const numbers = getNumbersList(0, 2000);
