import React, { PureComponent } from 'react';
import MarkItem from './MarkItem';

class ListItem extends PureComponent {
	constructor(props) {
		super(props);

		this.handleClick = e => {
			e.stopPropagation();
			let { item, onItemClick } = props;
			onItemClick(item);
		};

		this.handleMouseEnter = e => {
			e.stopPropagation();
			let { index, onItemMouseEnter } = props;
			onItemMouseEnter(index);
		};
	}
	render() {
		let { item, overItem, search } = this.props;
		return (
			<li onClick={this.handleClick} onMouseEnter={this.handleMouseEnter} 
				style={{ backgroundColor: overItem && '#f5f5f5' }}>
				<MarkItem {...{ item, search }} />
			</li>
		);
	}
}
ListItem.propTypes = {
	item: React.PropTypes.object.isRequired,
	index: React.PropTypes.number.isRequired,
	overItem: React.PropTypes.bool.isRequired,
	onItemClick: React.PropTypes.func.isRequired,
	onItemMouseEnter: React.PropTypes.func.isRequired,
	search: React.PropTypes.string.isRequired
};

export default ListItem;