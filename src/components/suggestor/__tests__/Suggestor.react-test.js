import React from 'react';
import renderer from 'react-test-renderer';
import Suggestor from '../Suggestor';
import ReactTestUtils from 'react-addons-test-utils';

describe('<Suggestor />', () => {
	it('initial render with no suggestions', () => {
		const tree = renderer.create(<Suggestor list={[]} />);
		expect(tree).toMatchSnapshot();
	});
	it('initial render with suggestions', () => {
		const tree = renderer.create(<Suggestor list={["suggest-1"]} />);
		expect(tree).toMatchSnapshot();
	});
});

describe('Suggestor', () => {
	it('if suggestor value => open suggestions list', () => {
		// arrange & precondition...
		const component = ReactTestUtils.renderIntoDocument(<Suggestor list={['suggest-1', 'suggest-2']} />);
		expect(component.refs.wrapped.state.open).toBeFalsy();

		// act
		let input = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'input');
		input.value = 'suggest';
		ReactTestUtils.Simulate.change(input);

		// expect
		expect(component.refs.wrapped.state.open).toBeTruthy();
	});
});
