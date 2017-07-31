import React from 'react';
import renderer from 'react-test-renderer';
import Suggestor from '../Suggestor';
import ReactTestUtils from 'react-dom/test-utils';

describe('<Suggestor />', () => {
	it('initial render with no suggestions', () => {
		const tree = renderer.create(<Suggestor list={[]} />);
		expect(tree).toMatchSnapshot();
	});
	it('initial render with suggestions', () => {
		const tree = renderer.create(<Suggestor list={["suggest-1"]} />);
		expect(tree).toMatchSnapshot();
	});
	it('initial render with suggestions (open list)', () => {
		const tree = renderer.create(<Suggestor list={["suggest-1", "suggest-2"]} />);
		tree.getInstance().wrapped.handleClick();
		expect(tree).toMatchSnapshot();
	});
});

const LIST = ['suggest-1', 'suggest-2'];

test('Suggestor renders with closed list (open:false)', () => {
	// setup: arrange
	const component = ReactTestUtils.renderIntoDocument(<Suggestor list={LIST} />);

	// assert
	expect(component.wrapped.state.open).toBeFalsy();
});

test('Suggestor change input\'s value => stores in state', () => {
	// setup: arrange
	const value = 'suggest';
	const component = ReactTestUtils.renderIntoDocument(<Suggestor list={LIST} />);

	// execute (act)
	let input = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'input');
	input.value = value;
	ReactTestUtils.Simulate.change(input);

	// assert
	expect(component.wrapped.state.value).toBe(value);
});

test('Suggestor change value => open suggestions list', () => {
	// setup: arrange & precondition...
	const component = ReactTestUtils.renderIntoDocument(<Suggestor list={LIST} />);

	// execute (act)
	let input = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'input');
	input.value = 'suggest';
	ReactTestUtils.Simulate.change(input);

	// assert
	expect(component.wrapped.state.open).toBeTruthy();
});
