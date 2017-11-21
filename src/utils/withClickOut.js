import React, { Component } from 'react';

const getDisplayName = component => component.displayName || component.name;

const withClickOut = WrappedComponent => {
	class Wrapper extends Component {
		constructor(...args) {
			super(...args);
			this.handleClick = this.handleClick.bind(this);
			this.reference = this.reference.bind(this);
			this.focus = this.focus.bind(this);
		}
		componentDidMount() {
			document.addEventListener('click', this.handleClick);
		}
		componentWillUnmount() {
			document.removeEventListener('click', this.handleClick);
		}
		handleClick(e) {
			const wrapped = this.wrapped;
			if (!this.node.contains(e.target) && typeof wrapped.handleClickOut === 'function') {
				wrapped.handleClickOut(e);
			}
		}
		reference(node) {
			this.node = node;
		}
		focus() {
			// todo: refactor to hoc withFocus (keep in mind nested components)
			this.wrapped.focus();
		}
		render() {
			return (
				<WrappedComponent
					reference={this.reference}
					ref={wrapped => {
						this.wrapped = wrapped;
					}}
					{...this.props}
				/>
			);
		}
	}
	Wrapper.displayName = `CO(${getDisplayName(WrappedComponent)})`;

	return Wrapper;
};

export default withClickOut;
