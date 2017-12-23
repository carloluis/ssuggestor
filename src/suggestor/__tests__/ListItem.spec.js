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

	it('snapshot - hover', () => {
		const tree = renderer.create(<ListItem {...PROPS} overItem />).toJSON();
		expect(tree).toMatchSnapshot();
	});
});

describe('ListItem', () => {
	const event = { stopPropagation: jest.fn() };
	let component;

	beforeEach(() => {
		PROPS.onItemClick.mockReset();
		PROPS.onItemMouseEnter.mockReset();
		component = shallow(<ListItem {...PROPS} />);
		event.stopPropagation.mockClear();
	});

	describe('on click', () => {
		let handleClickSpy;
		beforeEach(() => {
			handleClickSpy = jest.spyOn(component.instance(), 'handleClick');
			component.instance().forceUpdate();
			component.update();

			component.find('li').simulate('click', event);
		});

		it('should call handleClick', () => {
			expect(handleClickSpy).toBeCalled();
		});

		it('should stop event propagation', () => {
			expect(event.stopPropagation).toHaveBeenCalled();
		});

		it('should call props.onItemClick', () => {
			expect(PROPS.onItemClick).toBeCalledWith(PROPS.item);
		});
	});

	describe('on mouse enter', () => {
		let handleMouseEnterSpy;
		beforeEach(() => {
			handleMouseEnterSpy = jest.spyOn(component.instance(), 'handleMouseEnter');
			component.instance().forceUpdate();
			component.update();

			component.find('li').simulate('mouseEnter', event);
		});

		it('should call handleMouseEnter', () => {
			expect(handleMouseEnterSpy).toBeCalled();
		});

		it('should stop event propagation', () => {
			expect(event.stopPropagation).toHaveBeenCalled();
		});

		it('should call props.onItemClick', () => {
			expect(PROPS.onItemMouseEnter).toBeCalledWith(PROPS.index);
		});
	});
});
