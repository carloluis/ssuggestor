import React from 'react';
import { mount } from 'enzyme';
import List from '../List';

test('List with open:false => no renders ul.dropdown-menu', () => {
	const props = { list: [], open: false, index: 0, onItemClick: f => f, onItemMouseEnter: f => f, value: '' };

	const wrapper = mount(<List {...props} />);

	expect(wrapper.find('.dropdown-menu').node).toBeFalsy();
});

test('List with empty list => no renders ul.dropdown-menu', () => {
	const props = { list: [], open: true, index: 0, onItemClick: f => f, onItemMouseEnter: f => f, value: '' };

	const wrapper = mount(<List {...props} />);

	expect(wrapper.find('.dropdown-menu').node).toBeFalsy();
});

test('List with open:true and not empty list => renders ul.dropdown-menu', () => {
	const props = { list: ['x'], open: true, index: 0, onItemClick: f => f, onItemMouseEnter: f => f, value: '' };

	const wrapper = mount(<List {...props} />);

	expect(wrapper.find('.dropdown-menu').node).toBeTruthy();
});

describe('List Component', () => {
	let props;
	beforeEach(() => {
		props = {
			list: [],
			value: '',
			open: true,
			index: 0,
			onItemClick: jest.fn(),
			onItemMouseEnter: _=>_
		};
	});
	describe('List with item X', () => {
		const ITEM = 'X';
		beforeEach(() => {
			props.list.push(ITEM);
		});

		it(`li's text should match item`, () => {
			const wrapper = mount(<List {...props} />);

			const li = wrapper.find('li');
			expect(li.text()).toBe(ITEM);
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
