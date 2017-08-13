import { getListStyles } from '../styles';

describe('styles - getListStyles', () => {
	it('should return a block type element when visible is truthy', () => {
		const result = getListStyles(true);
		expect(result).toMatchObject({
			display: 'block'
		})
	});

	it('should return a non visible element when visible is falsy', () => {
		const result = getListStyles(false);
		expect(result).toMatchObject({
			display: 'none'
		});
	});
});
