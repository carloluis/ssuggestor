import React from 'react';
import ListItem from './ListItem';
import { getListStyles } from './styles';

export const List = ({ open, filtered, index, value, onItemClick, onItemMouseEnter }) => (
	(open && !!filtered.length) && 
	<ul className="dropdown-menu" style={getListStyles(open)}>
		{ filtered.map((item, i) => <ListItem key={i} {...{ item, onItemClick, onItemMouseEnter, search:value, index:i, overItem:index===i }} />) }
	</ul>
);

List.propTypes = {
	filtered: React.PropTypes.array.isRequired,
	index: React.PropTypes.number.isRequired,
	value: React.PropTypes.string.isRequired,
	open: React.PropTypes.bool.isRequired,
	onItemClick: React.PropTypes.func.isRequired,
	onItemMouseEnter: React.PropTypes.func.isRequired
};

export default List;