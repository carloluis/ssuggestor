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