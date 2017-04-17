import React from 'react';

const MarkItem = ({ item, search }) => {
	let { index, word } = item;

	if (!search || index === -1) {
		return <a>{ word }</a>;
	}

	let length = search.length;

	return (
		<a>
			<span>
				{ word.substr(0, index) }
				<strong>{ word.substr(index, length) }</strong>
				{ word.substr(index + length, word.length) }
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