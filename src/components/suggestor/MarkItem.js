import React from 'react';

const MarkItem = ({ item, search }) => {
	if (!search) {
		return <a>{ item }</a>;
	}

	let index = item.toLowerCase().indexOf(search.toLowerCase());
	if (index === -1) {
		return <a>{ item }</a>;	
	}

	let searchLength = search.length;

	return (
		<a>
			<span>
				{ item.substr(0, index) }
				<strong>{ item.substr(index, searchLength) }</strong>
				{ item.substr(index+searchLength, item.length) }
			</span>
		</a>
	);
};
MarkItem.propTypes = {
	item: React.PropTypes.string.isRequired,
	search: React.PropTypes.string.isRequired
};

export default MarkItem;