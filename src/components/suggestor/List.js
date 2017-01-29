import React, { PureComponent } from 'react';
import MarkItem from './MarkItem';
import { getListStyles } from './styles';

class ListItem extends PureComponent {
	render() {
		let { item, onItemClick, onItemMouseEnter, index, overItem, search } = this.props;
		return (
			<li value={item} onClick={() => onItemClick(item)} onMouseEnter={() => onItemMouseEnter(index, item)} 
				style={{ backgroundColor: overItem && '#f5f5f5' }}>
				<MarkItem {...{ item, search }} />
			</li>
		);
	}
}
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