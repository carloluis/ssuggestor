import { glyphicon } from '../styles';

describe('styles - glyphicon', () => {
	it('should return a string with: glyphicon glyphicon-name', () => {
		const result = glyphicon('name');
		expect(result).toBe('glyphicon glyphicon-name');
	});
});
