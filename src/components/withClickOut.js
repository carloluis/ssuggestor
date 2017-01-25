import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// Todo: check this https://facebook.github.io/react/warnings/refs-must-have-owner.html

export const withClickOut = WrappedComponent => {
	class Wrapper extends Component {
		constructor(...args){
			super(...args);
			this.handleClick = this.handleClick.bind(this);
		}
		componentDidMount() {
			document.addEventListener('click', this.handleClick);
		}
		componentWillUnmount() {
			document.removeEventListener('click', this.handleClick);
		}
		handleClick(e) {
			let node = ReactDOM.findDOMNode(this);
			let wrapped = this.refs._wrapped;
			if (!node.contains(e.target) && typeof wrapped.handleClickOut === 'function') {
				wrapped.handleClickOut(e);
			}
		}
		render() {
			return <WrappedComponent ref='_wrapped' {...this.props} />;
		}
	}
	Wrapper.displayName = `ClickOut(${WrappedComponent.displayName || WrappedComponent.name})`;
	return Wrapper;
};

export default withClickOut;
