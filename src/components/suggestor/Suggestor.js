import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { SPIN_STYLES, X_STYLES } from './styles';
import List from './List';

const KEY_CODES = {
	TAB: 9,
	ENTER: 13,
	ESCAPE: 27,
	DOWN: 40,
	UP: 38
};

const EMPTY_STR = '';

export class Suggestor extends Component {
	constructor(props){
		super(props);
		this._bind('handleClick', 'handleChange', 'removeItem', 'handleKeyDown', 'handleItemClick', 'handleItemMouseEnter', 'handleDocClick', 'focus');

		this.state = {
			value: props.value,
			filter: props.list,
			open: false,
			index: 0
		};
	}
	_bind(...methods) {
		methods.forEach(method => this[method] = this[method].bind(this));
	}
	componentDidMount() {
		document.addEventListener('click', this.handleDocClick);
	}
	componentWillUnmount() {
		document.removeEventListener('click', this.handleDocClick);
	}
	handleDocClick(e) {
		let node = ReactDOM.findDOMNode(this);
		if (!node.contains(e.target)) {
			this.handleClose();
		}
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.value !== this.props.value) {
			this.setState({ value: nextProps.value });
		}
	}
	handleClose() {
		this.setState({ open: false, filter: this.props.list, index: 0 });
	}
	toggleList() {
		if (this.state.open) {
			this.handleClose();
		}
		else {
			this.setState({
				open: true
			});
		}
	}
	handleClick() {
		this.toggleList();
	}
	handleKeyDown(e) {
		let { open, index, filter:list } = this.state;

		switch (e.keyCode) {
			case KEY_CODES.ENTER:
				this.toggleList();
				if (open && !!list.length) {
					this.changeValue(list[index]);	
				}
				break;
			case KEY_CODES.TAB:
				this.handleClose();
				return;
			case KEY_CODES.ESCAPE:
				this.handleClose();
				if (!open) {
					this.changeValue(EMPTY_STR);
				}
				break;
			case KEY_CODES.DOWN: {
				let next = (index + open) % list.length;
				this.setState({ open:true, index: next });
				break;
			}
			case KEY_CODES.UP: {
				let prev = (index || list.length) - 1;
				this.setState({ open: true, index: prev });
				break;
			}
			default:
				return;
		}

		e.preventDefault();
	}
	handleItemClick(value) {
		this.changeValue(value);
	}
	handleItemMouseEnter(index) {
		this.setState({ index });
	}
	handleChange(e) {
		e.stopPropagation();
		let value = e.target.value;
		let filter = this.filter(value);
		this.setState({ open: true, filter });
		if(!filter.length) {
			this.handleClose();
		}
		this.changeValue(value);
	}
	removeItem() {
		this.changeValue(EMPTY_STR);
	}
	changeValue(value) {
		this.setState({ value });
		this.props.onChange(value);
	}
	filter(value) {
		value = value.toLowerCase();
		return this.props.list.filter(item => item.toLowerCase().indexOf(value) !== -1);
	}
	focus() {
		this.refs.input.focus();
	}
	render() {
		let { open, value, index, filter:list } = this.state;
		let { style, placeholder, arrow, nox, className } = this.props;

		return (
			<div className={className} style={style} onClick={this.handleClick} onKeyDown={this.handleKeyDown}>
				<input type="text" className="form-control" onChange={this.handleChange} value={value} placeholder={placeholder} ref="input"/>
				{ arrow && <span className="glyphicon glyphicon-triangle-bottom" style={SPIN_STYLES} /> }
				{ !nox && value && <span className="glyphicon glyphicon-remove" style={X_STYLES} onClick={this.removeItem}/> }
				<List {...{ list, open, index }} onItemClick={this.handleItemClick} onItemMouseEnter={this.handleItemMouseEnter} />
			</div>
		);
	}
}

Suggestor.propTypes = {
	list: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
	className: React.PropTypes.string,
	value: React.PropTypes.string,
	onChange: React.PropTypes.func,
	placeholder: React.PropTypes.string,
	style: React.PropTypes.object,
	arrow: React.PropTypes.bool,
	nox: React.PropTypes.bool,
};
Suggestor.defaultProps = {
	className: 'input-group',
	value: EMPTY_STR,
	onChange: f=>f,
	arrow: true,
	nox: false
};

export default Suggestor;