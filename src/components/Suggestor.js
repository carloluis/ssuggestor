import React, { Component } from 'react';

const SPIN_STYLES = {
	position: 'absolute',
	cursor: 'pointer',
	margin: 'auto',
	color: '#ccc',
	fontSize:16,
	right:10,
	top: 0,
	bottom: 0,
	height: 14,
	zIndex:4
};
const X_STYLES = {
	...SPIN_STYLES,
	fontSize: 14,
	right: 30
};
const getListStyles = visible => ({
	display: visible? 'block':'none',
	maxHeight: 190,
	minWidth: 30,
	width: 'inherit',
	overflow: 'auto',
	cursor: 'pointer'
});

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
		this.state = {
			value: EMPTY_STR,
			open: false,
			index: 0
		};
		this.handleClickOut = this.handleClickOut.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.removeItem = this.removeItem.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleItemClick = this.handleItemClick.bind(this);
		this.handleItemMouseEnter = this.handleItemMouseEnter.bind(this);
	}
	handleClickOut(){
		this.setState({ open: false });
	}
	handleClick(e){
		this.setState({ open: !this.state.open });
	}
	handleKeyDown(e){
		let { open, index, value } = this.state;
		let list = this.filter(this.props.list, value);

		switch (e.keyCode) {
			case KEY_CODES.ENTER:
				this.setState({ open: !open, value: list[index] });
				break;
			case KEY_CODES.ESCAPE:
				this.setState({ open: false, value: open? value: EMPTY_STR });
				break;
			case KEY_CODES.DOWN:
				let next = (index + open) % list.length;
				this.setState({ open: true, index: next });
				break;
			case KEY_CODES.UP:
				let prev = (index || list.length) - 1;
				this.setState({ open: true, index: prev });
				break;
		}
	}
	handleItemClick(index){
		let list = this.filter(this.props.list, this.state.value);
		this.setState({ value: list[index] });
	}
	handleItemMouseEnter(index){
		this.setState({ index });
	}
	handleChange(e){
		e.stopPropagation();
		this.setState({ value: e.target.value, open: true });
	}
	removeItem(){
		this.setState({ value: EMPTY_STR });
	}
	filter(list, value) {
		return list.filter(item => item.includes(value));
	}
	_render(open, list, value){
		return (
			<ul className="dropdown-menu" style={getListStyles(open)}>
				{ this.filter(list, value).map((item, i) => <li key={i} value={item} onClick={()=>this.setState({value:item})}><a>{item}</a></li>) }
			</ul>
		);
	}
	render() {
		let { open, value, index } = this.state;
		let { list, style, placeholder } = this.props;
		let _list = this.filter(list, value);

		return (
			<div className="input-group" style={style} onClick={this.handleClick} onKeyDown={this.handleKeyDown} tabIndex="0" >
				<input type="text" className="form-control" onChange={this.handleChange} value={value} placeholder={placeholder} />
				<span className="glyphicon glyphicon-triangle-bottom" style={SPIN_STYLES} />
				{ !open && value && <span className="glyphicon glyphicon-remove" style={X_STYLES} onClick={this.removeItem}/> }
				{ this._render(open, list, value) }
			</div>
		);
	}
}

Suggestor.propTypes = {
	list: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
	item: React.PropTypes.string,
	style: React.PropTypes.object
};
Suggestor.defaultProps = {
	item: EMPTY_STR
};

export default Suggestor;