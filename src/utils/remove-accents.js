// https://unicode-table.com/es/#basic-latin

let letters_map = {
	'A': 'ÁÄÀÃẮẶẰẲẴǍÂẤẬẦẨẪǞȦǠẠȀẢȂĀĄÅǺḀȺ',
	'E': 'ÉËÈĔĚȨḜÊẾỆỀỂỄḘĖẸȄẺȆĒḖḔĘɆẼḚ',
	'I': 'ÍÏÌĬǏÎḮİỊȈỈȊĪĮƗĨḬ',
	'O': 'ÓÖÒÕŎǑÔỐỘỒỔỖȪȮȰỌŐȌÒỎƠỚỢỜỞỠȎꝊꝌŌṒṐƟǪǬØǾÕṌṎȬ',
	'U': 'ÚÜÙŬǓÛṶǗǙǛǕṲỤŰȔỦƯỨỰỪỬỮȖŪṺŮŨṸṴ',
	'a': 'áäàãăắặằẳẵǎâấậầẫẩǟȧǡạȁảȃāąᶏẚåǻḁⱥ',
	'e': 'éëèĕěȩḝêếệềểễḙėẹȅẻȇēḗḕⱸęᶒɇẽḛ',
	'i': 'íĭǐîïḯịȉìỉȋīįᶖɨĩḭ',
	'o': 'óŏǒôốộồổỗöȫȯȱọőȍòỏơớợờởỡȏꝋꝍⱺōṓṑǫǭøǿõṍṏȭ',
	'u': 'úŭǔûṷüǘǚǜǖṳụűȕùủưứựừửữȗūṻųᶙůũṹṵ',
	'N': 'ÑŃŅ',
	'n': 'ñńņ'
};

let map = {};
for (let letter in letters_map) {
	let chars = letters_map[letter];
	for (let i=0; i < chars.length; i++) {
		map[chars[i]] = letter;
	}
}

const remove = 
	str => str.replace(/[^\u0000-\u007F]/g, 
				char => map[char] || char);

export default remove;
