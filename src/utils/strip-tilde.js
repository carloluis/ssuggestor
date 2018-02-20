// https://unicode-table.com/es/#basic-latin

const LETTERS_MAP = {
	a: 'áäàãăắặằẳẵǎâấậầẫẩǟȧǡạȁảȃāąᶏẚåǻḁⱥ',
	e: 'éëèĕěȩḝêếệềểễḙėẹȅẻȇēḗḕⱸęᶒɇẽḛ',
	i: 'íĭǐîïḯịȉìỉȋīįᶖɨĩḭ',
	o: 'óŏǒôốộồổỗöȫȯȱọőȍòỏơớợờởỡȏꝋꝍⱺōṓṑǫǭøǿõṍṏȭ',
	u: 'úŭǔûṷüǘǚǜǖṳụűȕùủưứựừửữȗūṻųᶙůũṹṵ',
	n: 'ñńņ'
};

const map = {};

for (let letter in LETTERS_MAP) {
	let chars = LETTERS_MAP[letter];
	for (let i = 0; i < chars.length; i++) {
		map[chars[i]] = letter;
	}
}

const strip = str => str.replace(/[^\u0000-\u007F]/g, char => map[char] || char);

export default strip;
