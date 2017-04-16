import React from 'react';

const MarkItem = ({ item, search }) => {
	let { index, word } = item;

	if (!search) {
		return <a>{ word }</a>;
	}

	if (index === -1) {
		return <a>{ word }</a>;
	}

	let searchLength = search.length;

	return (
		<a>
			<span>
				{ word.substr(0, index) }
				<strong>{ word.substr(index, searchLength) }</strong>
				{ word.substr(index+searchLength, item.length) }
			</span>
		</a>
	);
};

MarkItem.propTypes = {
	item: React.PropTypes.shape({
		index: React.PropTypes.number.isRequired,
		word: React.PropTypes.string.isRequired
	}).isRequired,
	search: React.PropTypes.string.isRequired
};

export default MarkItem;