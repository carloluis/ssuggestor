import remove from '../remove-accents';

describe('remove-accents', () => {
	it('should not perform changes if no accents', () => {
		const word = 'nepheloi';
		const result = remove(word);
		expect(result).toBe(word);
	});

	it('should remove accents', () => {
		const result = remove('árbol');
		expect(result).toBe('arbol');
	});

	it('should remove accents', () => {
		const result = remove('caña');
		expect(result).toBe('cana');
	});

	it('should replace any of `áäàãăắặằẳẵǎâấậầẫẩǟȧǡạȁảȃāąᶏẚåǻḁⱥ` with `a`', () => {
		const as = 'áäàãăắặằẳẵǎâấậầẫẩǟȧǡạȁảȃāąᶏẚåǻḁⱥ';
		const result = remove(as);
		expect(result).toBe('a'.repeat(as.length));
	});

	it('should replace any of `éëèĕěȩḝêếệềểễḙėẹȅẻȇēḗḕⱸęᶒɇẽḛ` with `e`', () => {
		const es = 'éëèĕěȩḝêếệềểễḙėẹȅẻȇēḗḕⱸęᶒɇẽḛ';
		const result = remove(es);
		expect(result).toBe('e'.repeat(es.length));
	});

	it('should replace any of `íĭǐîïḯịȉìỉȋīįᶖɨĩḭ` with `o`', () => {
		const is = 'íĭǐîïḯịȉìỉȋīįᶖɨĩḭ';
		const result = remove(is);
		expect(result).toBe('i'.repeat(is.length));
	});

	it('should replace any of `óŏǒôốộồổỗöȫȯȱọőȍòỏơớợờởỡȏꝋꝍⱺōṓṑǫǭøǿõṍṏȭ` with `o`', () => {
		const os = 'óŏǒôốộồổỗöȫȯȱọőȍòỏơớợờởỡȏꝋꝍⱺōṓṑǫǭøǿõṍṏȭ';
		const result = remove(os);
		expect(result).toBe('o'.repeat(os.length));
	});

	it('should replace any of `úŭǔûṷüǘǚǜǖṳụűȕùủưứựừửữȗūṻųᶙůũṹṵ` with `u`', () => {
		const us = 'úŭǔûṷüǘǚǜǖṳụűȕùủưứựừửữȗūṻųᶙůũṹṵ';
		const result = remove(us);
		expect(result).toBe('u'.repeat(us.length));
	});

	it('should keep ç letters', () => {
		const result = remove('français');
		expect(result).toBe('français');
	});
});
