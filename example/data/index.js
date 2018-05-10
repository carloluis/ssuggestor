import countries from './countries.json';
import suggestions from './words.json';

const numberList = (init = 0, end = 100) => {
	let numbers = [];
	for (let i = init; i <= end; i++) {
		numbers.push('' + i);
	}
	return numbers;
};

const numbers = numberList(10, 2010);

export { countries, suggestions, numbers };
