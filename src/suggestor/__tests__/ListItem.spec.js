import React from 'react';
import ListItem from '../ListItem';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

const PROPS = {
	item: { word: 'fructuary', index: -1 },
	index: 0,
	overItem: false,
	onItemClick: jest.fn(),
	onItemMouseEnter: jest.fn(),
	search: 'ss'
};

describe('<ListItem/>', () => {
	it('snapshot', () => {
		const tree = renderer.create(<ListItem {...PROPS} />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('hover snapshot', () => {
		const tree = renderer.create(<ListItem {...PROPS} overItem />).toJSON();
		expect(tree).toMatchSnapshot();
	});
});

describe('ListItem component - handle item click', () => {
	const event = {
		stopPropagation: jest.fn()
	};

	beforeEach(() => {
		event.stopPropagation.mockReset();
		PROPS.onItemClick.mockReset();
	});

	it('should stop event propagation', () => {
		const component = shallow(<ListItem {...PROPS} />);

		component.find('li').simulate('click', event);

		expect(event.stopPropagation).toHaveBeenCalled();
	});

	it('should call props.onItemClick', () => {
		const component = shallow(<ListItem {...PROPS} />);

		component.find('li').simulate('click', event);

		expect(PROPS.onItemClick).toHaveBeenCalled();
		expect(PROPS.onItemClick).toBeCalledWith(PROPS.item);
	});
});

describe('ListItem component - handle mouse enter', () => {
	const event = {
		stopPropagation: jest.fn()
	};

	beforeEach(() => {
		event.stopPropagation.mockReset();
		PROPS.onItemMouseEnter.mockReset();
	});

	it('should stop event propagation', () => {
		const component = shallow(<ListItem {...PROPS} />);

		component.find('li').simulate('mouseEnter', event);

		expect(event.stopPropagation).toHaveBeenCalled();
	});

	it('should call props.onItemClick', () => {
		const component = shallow(<ListItem {...PROPS} />);

		component.find('li').simulate('mouseEnter', event);

		expect(PROPS.onItemMouseEnter).toHaveBeenCalled();
		expect(PROPS.onItemMouseEnter).toBeCalledWith(PROPS.index);
	});
});
