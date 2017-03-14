import React, { Component } from 'react';
import { EMPTY_STR, KEY_CODES } from '../utils/values';
import { SPIN_STYLES, X_STYLES } from './styles';
import withClickOut from '../utils/withClickOut';
import List from './List';

export class Suggestor extends Component {
	constructor(props){
		super(props);
		this._bind('handleClick', 'handleChange', 'remove', 'handleKeyDown', 'handleItemClick', 'handleItemMouseEnter', 'handleClickOut', 'handleBlur', 'focus');

		this.state = {
			value: props.value,
			filtered: props.list,
			open: false,
			index: 0
		};
	}
	_bind(...methods) {
		methods.forEach(method => this[method] = this[method].bind(this));
	}
	handleClickOut() {
		this.handleClose();
	}
	handleBlur() {
		if (this.props.selectOnBlur) {
			this.changeValue(this.state.value, true);
		}
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.value !== this.props.value) {
			this.setState({ value: nextProps.value });
		}
	}
	handleClose() {
		this.setState({ open: false, filtered: this.props.list, index: 0 });
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
		if (this.props.openOnClick) {
			this.toggleList();
		}
	}
	handleKeyDown(e) {
		this.props.onKey(e);
		if (!this.props.useKeys) {
			return;
		}
		let { open, index, filtered:list } = this.state;

		switch (e.keyCode) {
			case KEY_CODES.TAB:
				if (this.props.selectOnTab && open && list[index]) {
					this.changeValue(list[index], true);
				}
				this.handleClose();
				return;
			case KEY_CODES.ENTER:
				this.toggleList();
				if (open && list[index]) {
					this.changeValue(list[index], true);
				}
				break;
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
		this.changeValue(value, true);
		if(!this.props.openOnClick) {
			this.toggleList();
		}
	}
	handleItemMouseEnter(index) {
		this.setState({ index });
	}
	handleChange(e) {
		e.stopPropagation();
		let value = e.target.value;
		let suggest = value.length >= this.props.suggestOn;
		let filtered = this.filter(value);
		let nextState = { filtered };
		if(!filtered.length || !suggest) {
			this.handleClose();
		} else{
			nextState.open = true;
		}
		this.setState(nextState);
		this.changeValue(value);
	}
	remove() {
		this.changeValue(EMPTY_STR, true);
	}
	changeValue(value, select=false) {
		this.setState({ value });
		this.props.onChange(value);
		if(select) {
			this.props.onSelect(value);
		}
	}
	filter(value) {
		value = value.toLowerCase();
		return this.props.list.filter(item => item.toLowerCase().indexOf(value) !== -1);
	}
	focus() {
		this.refs.input.focus();
	}
	render() {
		let { className, style, placeholder, arrow, close, tooltip, required } = this.props;
		let { open, value, index, filtered:list } = this.state;

		return (
			<div className={className} style={style} onClick={this.handleClick} onKeyDown={this.handleKeyDown} ref={this.props.reference} onBlur={this.handleBlur} >
				<input type="text" className="form-control" onChange={this.handleChange} value={value} ref="input" placeholder={placeholder} title={tooltip} required={required} />
				{ arrow && <span className="glyphicon glyphicon-triangle-bottom" style={SPIN_STYLES} /> }
				{ close && value && <span className="glyphicon glyphicon-remove" style={X_STYLES} onClick={this.remove}/> }
				<List {...{ list, index, open, value }} onItemClick={this.handleItemClick} onItemMouseEnter={this.handleItemMouseEnter} />
			</div>
		);
	}
}

Suggestor.propTypes = {
	list: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
	reference: React.PropTypes.func,
	onChange: React.PropTypes.func,
	onSelect: React.PropTypes.func,
	onKey: React.PropTypes.func,
	value: React.PropTypes.string,
	openOnClick: React.PropTypes.bool,
	selectOnTab: React.PropTypes.bool,
	selectOnBlur: React.PropTypes.bool,
	placeholder: React.PropTypes.string,
	tooltip: React.PropTypes.string,
	className: React.PropTypes.string,
	suggestOn: React.PropTypes.number,
	style: React.PropTypes.object,
	required: React.PropTypes.bool,
	useKeys: React.PropTypes.bool,
	arrow: React.PropTypes.bool,
	close: React.PropTypes.bool
};

const nop = _ => _;

Suggestor.defaultProps = {
	className: 'input-group',
	onSelect: nop,
	onChange: nop,
	onKey: nop,
	value: EMPTY_STR,
	openOnClick: true,
	selectOnTab: false,
	selectOnBlur: false,
	suggestOn: 1,
	required: false,
	useKeys: true,
	arrow: true,
	close: true
};

export const SSuggestor = withClickOut(Suggestor);

export default SSuggestor;