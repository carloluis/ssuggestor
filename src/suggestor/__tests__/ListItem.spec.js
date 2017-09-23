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

describe('ListItem component - item click', () => {
	const component = shallow(<ListItem {...PROPS} />);
	const event = {
		stopPropagation: jest.fn()
	};

	beforeEach(() => {
		event.stopPropagation.mockReset();
		PROPS.onItemClick.mockReset();
	});

	it('should call handleClick', () => {
		const handleClickSpy = jest.spyOn(component.instance(), 'handleClick');
		component.instance().forceUpdate();

		component.find('li').simulate('click', event);

		expect(handleClickSpy).toBeCalled();
	});

	it('should stop event propagation', () => {
		component.find('li').simulate('click', event);

		expect(event.stopPropagation).toHaveBeenCalled();
	});

	it('should call props.onItemClick', () => {
		component.find('li').simulate('click', event);

		expect(PROPS.onItemClick).toBeCalledWith(PROPS.item);
	});
});

describe('ListItem component - mouse enter', () => {
	const component = shallow(<ListItem {...PROPS} />);
	const event = {
		stopPropagation: jest.fn()
	};

	beforeEach(() => {
		event.stopPropagation.mockReset();
		PROPS.onItemMouseEnter.mockReset();
	});

	it('should call handleMouseEnter', () => {
		const handleMouseEnterSpy = jest.spyOn(component.instance(), 'handleMouseEnter');
		component.instance().forceUpdate();

		component.find('li').simulate('mouseEnter', event);

		expect(handleMouseEnterSpy).toBeCalled();
	});

	it('should stop event propagation', () => {
		component.find('li').simulate('mouseEnter', event);

		expect(event.stopPropagation).toHaveBeenCalled();
	});

	it('should call props.onItemClick', () => {
		component.find('li').simulate('mouseEnter', event);

		expect(PROPS.onItemMouseEnter).toBeCalledWith(PROPS.index);
	});
});
