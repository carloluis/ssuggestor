import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { EMPTY_STR, KEY_CODES } from '../utils/values';
import { SPIN_STYLES, X_STYLES } from './styles';
import withClickOut from '../utils/withClickOut';
import removeAccents from '../utils/remove-accents';
import List from './List';

export class Suggestor extends PureComponent {
	constructor(props) {
		super(props);
		this._bind(
			'handleClick',
			'handleChange',
			'remove',
			'handleKeyDown',
			'handleItemClick',
			'handleItemMouseEnter',
			'handleClickOut',
			'focus'
		);

		this.state = {
			filtered: this.filter(props.value, false),
			value: props.value,
			open: false,
			index: 0
		};
	}
	_bind(...methods) {
		methods.forEach(method => (this[method] = this[method].bind(this)));
	}
	handleClickOut() {
		this.handleClose();
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.value !== this.state.value) {
			this.setState({ value: nextProps.value });
		}
	}
	handleClose() {
		if (this.state.open) {
			let filtered = this.filter(this.state.value, false);
			this.setState({ open: false, filtered, index: 0 });
		}
	}
	toggleList() {
		if (this.state.open) {
			this.handleClose();
		} else {
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
		let { open, index, filtered, value } = this.state;
		let list = filtered.map(item => item.word);

		switch (e.keyCode) {
			case KEY_CODES.TAB:
				if (this.props.selectOnTab && open && list[index]) {
					this.changeValue(list[index], true);
				} else {
					this.handleClose();
				}
				return;
			case KEY_CODES.ENTER:
				this.toggleList();
				if (open && list[index]) {
					this.changeValue(list[index], true);
				} else {
					this.props.onSelect(value);
				}
				break;
			case KEY_CODES.ESCAPE:
				this.handleClose();
				if (!open && value) {
					this.changeValue(EMPTY_STR);
				}
				break;
			case KEY_CODES.DOWN: {
				let next = (index + open) % list.length;
				this.setState({ open: true, index: next });
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
	handleItemClick({ word }) {
		this.changeValue(word, true);
	}
	handleItemMouseEnter(index) {
		this.setState({ index });
	}
	handleChange(e) {
		e.stopPropagation();

		let value = e.target.value;
		this.changeValue(value);
	}
	remove() {
		this.changeValue(EMPTY_STR, true);
	}
	changeValue(value, select = false) {
		let filtered = this.filter(value);

		let suggest = value.length >= this.props.suggestOn;
		let open = !!filtered.length && suggest;

		this.setState({ value, filtered, open }, () => {
			this.props.onChange(value);
			if (select) {
				this.props.onSelect(value);
				this.handleClose();
			} else if (!open) {
				this.handleClose();
			}
		});
	}
	filter(value = '', onlyMatch = true) {
		value = value.toLowerCase();
		let { accents, list } = this.props;
		if (!accents) {
			// todo: same transform for suggestions..
			value = removeAccents(value);
		}
		let mapped = list.map(word => ({ word, index: word.toLowerCase().indexOf(value) }));
		if (onlyMatch) {
			mapped = mapped.filter(item => item.index !== -1);
		}
		return mapped;
	}
	focus() {
		this.input.focus();
	}
	render() {
		let { className, style, placeholder, arrow, close, tooltip, required } = this.props;
		let { open, value, index, filtered } = this.state;

		return (
			<div
				className={className}
				style={style}
				onClick={this.handleClick}
				onKeyDown={this.handleKeyDown}
				ref={this.props.reference}
			>
				<input
					type="text"
					className="form-control"
					onChange={this.handleChange}
					value={value}
					ref={input => {
						this.input = input;
					}}
					placeholder={placeholder}
					title={tooltip}
					required={required}
				/>
				{arrow && <span className="glyphicon glyphicon-triangle-bottom" style={SPIN_STYLES} />}
				{close &&
					value &&
					<span className="glyphicon glyphicon-remove" style={X_STYLES} onClick={this.remove} />}
				<List
					{...{ filtered, index, open, value }}
					onItemClick={this.handleItemClick}
					onItemMouseEnter={this.handleItemMouseEnter}
				/>
			</div>
		);
	}
}

Suggestor.propTypes = {
	list: PropTypes.arrayOf(PropTypes.string).isRequired,
	reference: PropTypes.func,
	onChange: PropTypes.func,
	onSelect: PropTypes.func,
	onKey: PropTypes.func,
	value: PropTypes.string,
	openOnClick: PropTypes.bool,
	selectOnTab: PropTypes.bool,
	placeholder: PropTypes.string,
	tooltip: PropTypes.string,
	className: PropTypes.string,
	suggestOn: PropTypes.number,
	style: PropTypes.object,
	required: PropTypes.bool,
	useKeys: PropTypes.bool,
	accents: PropTypes.bool,
	arrow: PropTypes.bool,
	close: PropTypes.bool
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
	suggestOn: 1,
	required: false,
	accents: false,
	useKeys: true,
	arrow: true,
	close: true
};

export const SSuggestor = withClickOut(Suggestor);

export default SSuggestor;
