import React from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem';

const List = ({ open, filtered, index, value, onItemClick, onItemMouseEnter }) =>
	open &&
	!!filtered.length && (
		<ul className="dropdown-menu ss-list">
			{filtered.map((item, i) => (
				<ListItem
					key={item.word}
					{...{ item, onItemClick, onItemMouseEnter, search: value, index: i, overItem: i === index }}
				/>
			))}
		</ul>
	);

List.propTypes = {
	filtered: PropTypes.array.isRequired,
	index: PropTypes.number.isRequired,
	onItemClick: PropTypes.func.isRequired,
	onItemMouseEnter: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired,
	open: PropTypes.bool.isRequired
};

export default List;
