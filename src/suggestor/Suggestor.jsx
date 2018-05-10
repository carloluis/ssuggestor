import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { autoBind, keys, noop } from '../utils';
import transform from '../utils/transform';
import { glyphicon } from '../utils/styles';
import List from './List';

class Suggestor extends PureComponent {
	constructor(props) {
		super(props);
		autoBind(this);

		this.input = React.createRef();

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
		if (!this.input.current.parentNode.contains(event.target)) {
			this.close();
		}
	}
	componentWillReceiveProps(nextProps) {
		let value = this.state.value;

		if (nextProps.value !== this.props.value && nextProps.value !== value) {
			value = nextProps.value;
		}

		this.setState({
			filtered: this.filter(nextProps.list, value, true),
			value
		});
	}
	close() {
		this.setState({
			open: false,
			filtered: this.unfilter(),
			index: 0
		});
	}
	handleClick() {
		if (this.props.openOnClick) {
			if (this.state.open) {
				this.close();
			} else {
				this.setState({ open: true, filtered: this.unfilter() });
			}
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
		const ssuggestions = filtered.length ? filtered : this.unfilter();
		let nextIndex;

		switch (code) {
			case keys.ENTER:
				if (open && filtered[index]) {
					this.changeValue(filtered[index].word, true);
				} else {
					this.setState({ open: true, filtered: this.unfilter() });
				}
				break;
			case keys.ESCAPE:
				this.close();
				if (!open && value) {
					this.changeValue('');
				}
				break;
			case keys.DOWN:
				nextIndex = (index + open) % ssuggestions.length;
				break;
			case keys.UP:
				nextIndex = (index || ssuggestions.length) - 1;
				break;
			case keys.TAB:
				if (this.props.selectOnTab && open && filtered[index]) {
					this.changeValue(filtered[index].word, true);
				} else {
					this.close();
				}
			default:
				return false;
		}

		if (nextIndex !== undefined) {
			this.setState({ open: true, index: nextIndex, filtered: ssuggestions });
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
		this.changeValue('', true);
	}
	changeValue(value, select = false) {
		const { list, suggestOn, accents, onChange, onSelect } = this.props;
		const filtered = this.filter(list, value);
		const suggest = value.length >= suggestOn;
		const open = !!filtered.length && suggest;

		this.setState({ value, filtered, open }, () => {
			onChange(value);
			if (select) {
				const suggestion = filtered.find(({ word }) => transform(accents, word) === transform(accents, value));
				onSelect(value, suggestion && suggestion.item);
				this.close();
			}
		});
	}
	filter(list, value, onlyMatch = true) {
		const { accents, selector } = this.props;
		value = transform(accents, value);

		let mapped = list.map(item => {
			const word = selector(item);
			return {
				index: transform(accents, word).indexOf(value),
				word,
				item
			};
		});
		if (onlyMatch) {
			mapped = mapped.filter(item => item.index !== -1);
		}
		return mapped;
	}
	unfilter() {
		return this.filter(this.props.list, this.state.value, false);
	}
	focus() {
		this.input.current.focus();
	}
	render() {
		const { className, style, placeholder, arrow, close, tooltip, required } = this.props;
		const { open, value, index, filtered } = this.state;

		return (
			<div className={className} onClick={this.handleClick} onKeyDown={this.handleKeyDown} style={style}>
				<input
					type="text"
					className="form-control"
					onChange={this.handleChange}
					value={value}
					title={tooltip}
					placeholder={placeholder}
					required={required}
					ref={this.input}
				/>
				{arrow && <span className={'ss-triangle ' + glyphicon('triangle-bottom')} />}
				{close && value && <span className={'ss-remove ' + glyphicon('remove')} onClick={this.remove} />}
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
	list: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])).isRequired,
	selector: PropTypes.func,
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
	selector: s => s,
	onSelect: noop,
	onChange: noop,
	onKey: noop,
	value: '',
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
