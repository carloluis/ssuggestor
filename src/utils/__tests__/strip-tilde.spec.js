import strip from '../strip-tilde';

describe('strip tildes', () => {
	it('should not perform changes if no accents', () => {
		const word = 'nepheloi';
		const result = strip(word);
		expect(result).toBe(word);
	});

	it('should remove accents', () => {
		const result = strip('árbol');
		expect(result).toBe('arbol');
	});

	it('should remove accents', () => {
		const result = strip('caña');
		expect(result).toBe('cana');
	});

	it('should replace any of `áäàãăắặằẳẵǎâấậầẫẩǟȧǡạȁảȃāąᶏẚåǻḁⱥ` with `a`', () => {
		const as = 'áäàãăắặằẳẵǎâấậầẫẩǟȧǡạȁảȃāąᶏẚåǻḁⱥ';
		const result = strip(as);
		expect(result).toBe('a'.repeat(as.length));
	});

	it('should replace any of `éëèĕěȩḝêếệềểễḙėẹȅẻȇēḗḕⱸęᶒɇẽḛ` with `e`', () => {
		const es = 'éëèĕěȩḝêếệềểễḙėẹȅẻȇēḗḕⱸęᶒɇẽḛ';
		const result = strip(es);
		expect(result).toBe('e'.repeat(es.length));
	});

	it('should replace any of `íĭǐîïḯịȉìỉȋīįᶖɨĩḭ` with `o`', () => {
		const is = 'íĭǐîïḯịȉìỉȋīįᶖɨĩḭ';
		const result = strip(is);
		expect(result).toBe('i'.repeat(is.length));
	});

	it('should replace any of `óŏǒôốộồổỗöȫȯȱọőȍòỏơớợờởỡȏꝋꝍⱺōṓṑǫǭøǿõṍṏȭ` with `o`', () => {
		const os = 'óŏǒôốộồổỗöȫȯȱọőȍòỏơớợờởỡȏꝋꝍⱺōṓṑǫǭøǿõṍṏȭ';
		const result = strip(os);
		expect(result).toBe('o'.repeat(os.length));
	});

	it('should replace any of `úŭǔûṷüǘǚǜǖṳụűȕùủưứựừửữȗūṻųᶙůũṹṵ` with `u`', () => {
		const us = 'úŭǔûṷüǘǚǜǖṳụűȕùủưứựừửữȗūṻųᶙůũṹṵ';
		const result = strip(us);
		expect(result).toBe('u'.repeat(us.length));
	});

	it('should keep ç letters', () => {
		const result = strip('français');
		expect(result).toBe('français');
	});
});
