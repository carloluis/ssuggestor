import noop from '../noop';

describe('noop', () => {
	it('should always return undefined', () => {
		const result = noop();
		expect(result).toBe(undefined);
	});
});
