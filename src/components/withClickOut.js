import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export const withClickOut = WrappedComponent => {
	class Wrapper extends Component {
		//static displayName = `ClickOut(${WrappedComponent.displayName || WrappedComponent.name})`
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
