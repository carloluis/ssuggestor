import React from 'react';
import MarkItem from '../MarkItem';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

const PROPS = {
	item: {
		word: 'https://randomword.com/',
		index: 0
	},
	search: ''
};

describe('<MarkItem />', () => {
	it('snapshot - plain item <a/> when no search pattern', () => {
		const tree = renderer.create(<MarkItem {...PROPS} />).toJSON();

		expect(tree).toMatchSnapshot();
	});

	it('snapshot - plain item <a/> when no match', () => {
		const props = { item: { ...PROPS.item, index: -1 }, search: 'x' };

		const tree = renderer.create(<MarkItem {...props} />).toJSON();

		expect(tree).toMatchSnapshot();
	});

	it('snapshot - render pattern inside <strong/> when pattern matched', () => {
		const props = { item: { word: 'temporise', index: 5 }, search: 'rise' };

		const tree = renderer.create(<MarkItem {...props} />);

		expect(tree).toMatchSnapshot();
	});
});
