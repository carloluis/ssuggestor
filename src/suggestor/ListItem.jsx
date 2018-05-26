import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import autoBind from '../utils/auto-bind';
import MarkItem from './MarkItem';

class ListItem extends PureComponent {
	constructor(props) {
		super(props);
		autoBind(this);
	}

	handleClick(event) {
		event.stopPropagation();
		const { item, onItemClick } = this.props;
		onItemClick(item);
	}

	handleMouseEnter(event) {
		event.stopPropagation();
		const { index, onItemMouseEnter } = this.props;
		onItemMouseEnter(index);
	}

	render() {
		const {
			item,
			overItem,
			search,
			classSchema: { item: li, activeItem: liActive }
		} = this.props;
		const classes = [li, overItem && liActive].filter(classname => !!classname).join(' ');

		return (
			<li className={classes} onClick={this.handleClick} onMouseEnter={this.handleMouseEnter}>
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
	search: PropTypes.string.isRequired,
	classSchema: PropTypes.shape({
		item: PropTypes.string,
		activeItem: PropTypes.string
	})
};

export default ListItem;
