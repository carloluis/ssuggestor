import React from 'react';
import { getListStyles } from './styles';

const ListItem = ({ item, onItemClick, onItemMouseEnter, index, overItem }) => (
	<li value={item} onClick={() => onItemClick(item)} onMouseEnter={()=>onItemMouseEnter(index, item)} 
		style={{ backgroundColor: overItem && '#f5f5f5' }}>
		<a>{item}</a>
	</li>
);

export const List = ({ open, list, index, onItemClick, onItemMouseEnter }) => (
	<ul className="dropdown-menu" style={getListStyles(open)}>
		{ list.map((item, i) => <ListItem key={i} {...{ item, onItemClick, onItemMouseEnter, index:i, overItem:index===i }} />) }
	</ul>
);

List.propTypes = {
	list: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
	open: React.PropTypes.bool.isRequired,
	index: React.PropTypes.number.isRequired,
	onItemClick: React.PropTypes.func.isRequired,
	onItemMouseEnter: React.PropTypes.func.isRequired
};

export default List;