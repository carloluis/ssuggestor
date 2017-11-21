import React from 'react';
import withClickOut from '../withClickOut';
import { shallow, mount } from 'enzyme';

class TestComponent extends React.Component {
	render() {
		return <div ref={this.props.reference} />;
	}
}

describe('withClickOut', () => {
	const WrappedComponent = withClickOut(TestComponent);

	it('should set correct displayName in wrapped component', () => {
		expect(WrappedComponent.displayName).toBe('CO(TestComponent)');
	});

	it('should render <TestComponent>', () => {
		const tree = shallow(<WrappedComponent />);
		expect(tree.find('TestComponent').getElement()).toBeTruthy();
	});

	it('shoud add a click event listener to the document', () => {
		const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
		const tree = mount(<WrappedComponent />);

		expect(addEventListenerSpy).toBeCalledWith('click', tree.instance().handleClick);
	});

	it('shoud remove the click event listener to the document', () => {
		const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');
		const tree = mount(<WrappedComponent />);

		const handleClick = tree.instance().handleClick;
		tree.unmount();

		expect(removeEventListenerSpy).toBeCalledWith('click', handleClick);
	});
});
