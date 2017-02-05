import React from 'react';
import ListItem from './ListItem';
import { getListStyles } from './styles';

export const List = ({ open, list, index, value, onItemClick, onItemMouseEnter }) => (
	(open && !!list.length) && <ul className="dropdown-menu" style={getListStyles(open)}>
		{ list.map((item, i) => <ListItem key={i} {...{ item, onItemClick, onItemMouseEnter, search:value, index:i, overItem:index===i }} />) }
	</ul>
);

List.propTypes = {
	list: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
	open: React.PropTypes.bool.isRequired,
	index: React.PropTypes.number.isRequired,
	onItemClick: React.PropTypes.func.isRequired,
	onItemMouseEnter: React.PropTypes.func.isRequired,
	value: React.PropTypes.string.isRequired
};

export default List;