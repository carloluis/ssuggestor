import noop from '../noop';

describe('noop', () => {
	it('should return nothing', () => {
		const result = noop();
		expect(result).toBe(undefined);
	});
});
