import React, { Component } from 'react';
import { SPIN_STYLES, X_STYLES } from './styles';
import withClickOut from '../withClickOut';
import List from './List';

const KEY_CODES = {
	ENTER: 13,
	ESCAPE: 27,
	DOWN: 40,
	UP: 38
};

const EMPTY_STR = '';

export class Suggestor extends Component {
	constructor(props){
		super(props);
		this._bind('handleClickOut', 'handleClick', 'handleChange', 'removeItem', 'handleKeyDown', 'handleItemClick', 'handleItemMouseEnter');

		this.state = {
			value: EMPTY_STR,
			open: false,
			index: 0
		};
	}
	_bind(...methods) {
		methods.forEach(method => this[method] = this[method].bind(this));
	}
	handleClickOut() {
		this.setState({ open: false });
	}
	handleClick() {
		this.setState({ open: !this.state.open });
	}
	handleKeyDown(e) {
		let { open, index, value } = this.state;
		let list = this.filter(this.props.list, value);
		let suggestions = !!list.length;

		switch (e.keyCode) {
			case KEY_CODES.ENTER:
				this.setState({ open: !open && suggestions, value: suggestions? list[index]: value });
				break;
			case KEY_CODES.ESCAPE:
				this.setState({ open: false, value: open? value: EMPTY_STR });
				break;
			case KEY_CODES.DOWN: {
				let next = (index + open) % list.length;
				this.setState({ open: suggestions, index: next });
				break;
			}
			case KEY_CODES.UP: {
				let prev = (index || list.length) - 1;
				this.setState({ open: suggestions, index: prev });
				break;
			}
			default:
				return;
		}

		e.preventDefault();
	}
	handleItemClick(value) {
		this.setState({ value });
	}
	handleItemMouseEnter(index) {
		this.setState({ index });
	}
	handleChange(e) {
		e.stopPropagation();
		let value = e.target.value;
		this.setState({ value, open: this.props.list.some(item => item.includes(value)) });
	}
	removeItem() {
		this.setState({ value: EMPTY_STR });
	}
	filter() {
		return this.props.list.filter(item => item.includes(this.state.value));
	}
	render() {
		let { open, value, index } = this.state;
		let { style, placeholder } = this.props;
		let list = this.filter();

		return (
			<div className="input-group" style={style} onClick={this.handleClick} onKeyDown={this.handleKeyDown} tabIndex="0" >
				<input type="text" className="form-control" onChange={this.handleChange} value={value} placeholder={placeholder} />
				<span className="glyphicon glyphicon-triangle-bottom" style={SPIN_STYLES} />
				{ value && <span className="glyphicon glyphicon-remove" style={X_STYLES} onClick={this.removeItem}/> }
				<List {...{ list, open, index }} onItemClick={this.handleItemClick} onItemMouseEnter={this.handleItemMouseEnter} />
			</div>
		);
	}
}

Suggestor.propTypes = {
	list: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
	item: React.PropTypes.string,
	style: React.PropTypes.object,
	placeholder: React.PropTypes.string
};
Suggestor.defaultProps = {
	item: EMPTY_STR
};

export default withClickOut(Suggestor);