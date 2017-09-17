import React from 'react';
import PropTypes from 'prop-types';

const MarkItem = ({ item, search }) => {
	const { index, word } = item;

	if (!search || index === -1) {
		return (
			<a>{word}</a>
		);
	}

	const { length } = search;

	return (
		<a>
			<span>
				{word.substr(0, index)}
				<strong>
					{word.substr(index, length)}
				</strong>
				{word.substr(index + length)}
			</span>
		</a>
	);
};

MarkItem.propTypes = {
	item: PropTypes.shape({
		index: PropTypes.number.isRequired,
		word: PropTypes.string.isRequired
	}).isRequired,
	search: PropTypes.string.isRequired
};

export default MarkItem;
