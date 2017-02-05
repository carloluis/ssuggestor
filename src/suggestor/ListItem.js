import React, { PureComponent } from 'react';
import MarkItem from './MarkItem';

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

export default ListItem;