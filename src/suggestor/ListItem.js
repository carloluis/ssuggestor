import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
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
	item: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
	overItem: PropTypes.bool.isRequired,
	onItemClick: PropTypes.func.isRequired,
	onItemMouseEnter: PropTypes.func.isRequired,
	search: PropTypes.string.isRequired
};

export default ListItem;