import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import List from '../List';

describe('<List />', () => {
	let props;
	beforeEach(() => {
		props = {
			filtered: [],
			open: false,
			index: 0,
			onItemClick: _=>_,
			onItemMouseEnter: _=>_,
			value: ''
		};
	});
	it('render with no suggestions list', () => {
		const tree = renderer.create(<List {...props} />);
		expect(tree).toMatchSnapshot();
	});
	it('render with suggestions list (open:false)', () => {
		props = { ...props, filtered: [{ word:'suggest-1', index:0 }] };
		const tree = renderer.create(<List {...props} />);
		expect(tree).toMatchSnapshot();
	});
	it('render with suggestions list (open:true)', () => {
		props = { ...props, filtered: [{ word:'suggest-1', index:0 }], open:true };
		const tree = renderer.create(<List {...props} />);
		expect(tree).toMatchSnapshot();
	});
	it('render with suggestions list (open:true, index:0)', () => {
		props = { ...props, filtered: [{ word:'suggest-0', index:0 }, { word:'suggest-1', index:0 }], open:true };
		const tree = renderer.create(<List {...props} />);
		expect(tree).toMatchSnapshot();
	});
	it('render with suggestions list (open:true, index:1)', () => {
		props = { ...props, filtered: [{ word:'suggest-0', index:0 }, { word:'suggest-1', index:0 }], open:true, index:1 };
		const tree = renderer.create(<List {...props} />);
		expect(tree).toMatchSnapshot();
	});
});

test('List with open:false => no renders ul.dropdown-menu', () => {
	const props = { filtered: [], open: false, index: 0, onItemClick: f => f, onItemMouseEnter: f => f, value: '' };

	const wrapper = mount(<List {...props} />);

	expect(wrapper.find('.dropdown-menu').node).toBeFalsy();
});

test('List with empty list => no renders ul.dropdown-menu', () => {
	const props = { filtered: [], open: true, index: 0, onItemClick: f => f, onItemMouseEnter: f => f, value: '' };

	const wrapper = mount(<List {...props} />);

	expect(wrapper.find('.dropdown-menu').node).toBeFalsy();
});

test('List with open:true and not empty list => renders ul.dropdown-menu', () => {
	const props = { filtered: [{ word:'x', index:0 }], open: true, index: 0, onItemClick: f => f, onItemMouseEnter: f => f, value: '' };

	const wrapper = mount(<List {...props} />);

	expect(wrapper.find('.dropdown-menu').node).toBeTruthy();
});

describe('List Component', () => {
	let props;
	beforeEach(() => {
		props = {
			filtered: [],
			value: '',
			open: true,
			index: 0,
			onItemClick: jest.fn(),
			onItemMouseEnter: _=>_
		};
	});
	describe('List with item X', () => {
		const ITEM = { word: 'X', index: 0 };
		beforeEach(() => {
			props.filtered.push(ITEM);
		});

		it(`li's text should match item`, () => {
			const wrapper = mount(<List {...props} />);

			const li = wrapper.find('li');
			expect(li.text()).toBe(ITEM.word);
		});

		describe('when click on li', () => {
			it('call `onItemClick` callback', () => {
				const wrapper = mount(<List {...props} />);

				const li = wrapper.find('li');
				li.simulate('click');

				expect(props.onItemClick).toBeCalled();
			});

			it('call `onItemClick` callback with `item`', () => {
				const wrapper = mount(<List {...props} />);

				const li = wrapper.find('li');
				li.simulate('click');

				expect(props.onItemClick).toBeCalledWith(ITEM);
			});
		});
	});
})
