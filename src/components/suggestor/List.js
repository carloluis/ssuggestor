import React from 'react';
import { getListStyles } from './styles';

const MarkMatch = ({ item, search }) => {
	let index = item.toLowerCase().indexOf(search.toLowerCase());
	let searchLength = search.length;

	return (
		<a>
			{
				index >= 0? 
					<span>{ item.substr(0, index) }
					<strong>{item.substr(index, searchLength)}</strong>
					{ item.substr(index+searchLength, item.length) }
					</span>
				: item
			}
		</a>
	);
};
MarkMatch.propTypes = {
	item: React.PropTypes.string.isRequired,
	search: React.PropTypes.string.isRequired
};

const ListItem = ({ item, onItemClick, onItemMouseEnter, index, overItem, search }) => (
	<li value={item} onClick={() => onItemClick(item)} onMouseEnter={()=>onItemMouseEnter(index, item)} 
		style={{ backgroundColor: overItem && '#f5f5f5' }}>
		<MarkMatch {...{ item, search }} />
	</li>
);
ListItem.propTypes = {
	item: React.PropTypes.string.isRequired,
	index: React.PropTypes.number.isRequired,
	overItem: React.PropTypes.bool.isRequired,
	onItemClick: React.PropTypes.func.isRequired,
	onItemMouseEnter: React.PropTypes.func.isRequired,
	search: React.PropTypes.string.isRequired
};

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