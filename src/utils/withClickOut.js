import React, { Component } from 'react';

const withClickOut = WrappedComponent => {
	class Wrapper extends Component {
		constructor(...args) {
			super(...args);
			this.handleClick = this.handleClick.bind(this);
			this.focus = this.focus.bind(this);
		}
		componentDidMount() {
			document.addEventListener('click', this.handleClick);
		}
		componentWillUnmount() {
			document.removeEventListener('click', this.handleClick);
		}
		handleClick(e) {
			const wrapped = this.refs.wrapped;
			if (!this.node.contains(e.target) && typeof wrapped.handleClickOut === 'function') {
				wrapped.handleClickOut(e);
			}
		}
		focus() {
			// todo: refactor to hoc withFocus (keep in mind nested components)
			this.refs.wrapped.focus();
		}
		render() {
			return (
				<WrappedComponent
					reference={node => {
						this.node = node;
					}}
					ref="wrapped"
					{...this.props}
				/>
			);
		}
	}
	Wrapper.displayName = `ClickOut(${WrappedComponent.displayName || WrappedComponent.name})`;
	return Wrapper;
};

export default withClickOut;
