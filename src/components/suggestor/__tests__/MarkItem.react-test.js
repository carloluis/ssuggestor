import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import MarkItem from '../MarkItem';

describe('<MarkItem />', () => {
	let props;
	beforeEach(() => {
		props = { item: 'abcdefghijklmnopqrstuvwxyz', search: '' };
	});
	it('if no search => render plain item (<a>{item}</a>)', () => {
		const tree = renderer.create(<MarkItem {...props} />);
		expect(tree).toMatchSnapshot();
	});
	it('if search but no match => render plain item', () => {
		let _props = { ...props, search:'no-match' };
		const tree = renderer.create(<MarkItem {..._props} />);
		expect(tree).toMatchSnapshot();
	});
	it('if search, then render pattern inside <strong>', () => {
		let _props = { ...props, search:'x' };
		const tree = renderer.create(<MarkItem {..._props} />);
		expect(tree).toMatchSnapshot();
	});
});