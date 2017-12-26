import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { EMPTY_STR, KEY_CODES, noop, removeAccents, autoBind } from '../utils';
import { SPIN_STYLES, X_STYLES, glyphicon } from './styles';
import List from './List';

class Suggestor extends PureComponent {
	constructor(props) {
		super(props);
		autoBind(this);

		this.state = {
			filtered: this.filter(props.list, props.value, false),
			value: props.value,
			open: false,
			index: 0
		};
	}
	componentDidMount() {
		document.addEventListener('click', this._onClick);
	}
	componentWillUnmount() {
		document.removeEventListener('click', this._onClick);
	}
	_onClick(event) {
		if (!this.input.parentNode.contains(event.target)) {
			this.handleClose();
		}
	}
	componentWillReceiveProps(nextProps) {
		let value = this.state.value;

		if (nextProps.value !== this.props.value && nextProps.value !== this.state.value) {
			value = nextProps.value;
		}

		this.setState({
			filtered: this.filter(nextProps.list, value, true),
			value
		});
	}
	handleClose() {
		if (this.state.open) {
			const filtered = this.filter(this.props.list, this.state.value, false);
			this.setState({ open: false, filtered, index: 0 });
		}
	}
	toggleList() {
		if (this.state.open) {
			this.handleClose();
		} else {
			this.setState({ open: true });
		}
	}
	handleClick() {
		if (this.props.openOnClick) {
			this.toggleList();
		}
	}
	handleKeyDown(e) {
		const { onKey, useKeys } = this.props;
		onKey(e);

		if (useKeys && this.processKey(e.keyCode)) {
			e.preventDefault();
		}
	}
	processKey(code) {
		const { open, index, filtered, value } = this.state;
		const list = filtered.map(item => item.word);

		switch (code) {
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
				const next = (index + open) % list.length;
				this.setState({ open: true, index: next });
				break;
			}
			case KEY_CODES.UP: {
				const prev = (index || list.length) - 1;
				this.setState({ open: true, index: prev });
				break;
			}
			case KEY_CODES.TAB:
				if (this.props.selectOnTab && open && list[index]) {
					this.changeValue(list[index], true);
				} else {
					this.handleClose();
				}
			default:
				return false;
		}

		return true;
	}
	handleItemClick({ word }) {
		this.changeValue(word, true);
	}
	handleItemMouseEnter(index) {
		this.setState({ index });
	}
	handleChange(e) {
		e.stopPropagation();
		const value = e.target.value;
		this.changeValue(value);
	}
	remove() {
		this.changeValue(EMPTY_STR, true);
	}
	changeValue(value, select = false) {
		const filtered = this.filter(this.props.list, value);
		const suggest = value.length >= this.props.suggestOn;
		const open = !!filtered.length && suggest;

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
	filter(list, value = EMPTY_STR, onlyMatch = true) {
		value = value.toLowerCase();
		const { accents } = this.props;
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
	refInput(input) {
		this.input = input;
	}
	render() {
		const { className, style, placeholder, arrow, close, tooltip, required } = this.props;
		const { open, value, index, filtered } = this.state;

		return (
			<div className={className} style={style} onClick={this.handleClick} onKeyDown={this.handleKeyDown}>
				<input
					type="text"
					className="form-control"
					onChange={this.handleChange}
					value={value}
					title={tooltip}
					placeholder={placeholder}
					required={required}
					ref={this.refInput}
				/>
				{arrow && <span className={glyphicon('triangle-bottom')} style={SPIN_STYLES} />}
				{close && value && <span className={glyphicon('remove')} style={X_STYLES} onClick={this.remove} />}
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

Suggestor.defaultProps = {
	className: 'input-group',
	onSelect: noop,
	onChange: noop,
	onKey: noop,
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

export default Suggestor;
