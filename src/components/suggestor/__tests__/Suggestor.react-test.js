import React from 'react';
import renderer from 'react-test-renderer';
import Suggestor from '../Suggestor';

describe('<Suggestor />', () => {
	it('initial render with no suggestions', () => {
		const tree = renderer.create(<Suggestor list={[]} />);
		expect(tree).toMatchSnapshot();
	});
	it('initial render with suggestions', () => {
		const tree = renderer.create(<Suggestor list={["suggest-1"]} />);
		expect(tree).toMatchSnapshot();
	})
});
