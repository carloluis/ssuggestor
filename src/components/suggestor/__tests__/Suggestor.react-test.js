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
	it('initial render with suggestions (open list)', () => {
		const tree = renderer.create(<Suggestor list={["suggest-1", "suggest-2"]} />);		
		tree.getInstance().refs.wrapped.handleClick();
		expect(tree).toMatchSnapshot();
	});
});
