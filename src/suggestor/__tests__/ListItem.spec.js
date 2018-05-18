import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import classSchema from '../../class-schema/bootstrap-3';
import ListItem from '../ListItem';

const PROPS = {
	item: { word: 'fructuary', index: -1 },
	index: 0,
	overItem: false,
	onItemClick: jest.fn(),
	onItemMouseEnter: jest.fn(),
	search: 'ss',
	classSchema
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
	let handleClickSpy, handleMouseEnterSpy;

	beforeEach(() => {
		PROPS.onItemClick.mockReset();
		PROPS.onItemMouseEnter.mockReset();
		event.stopPropagation.mockClear();
		component = shallow(<ListItem {...PROPS} />);
		const instance = component.instance();
		handleClickSpy = jest.spyOn(instance, 'handleClick');
		handleMouseEnterSpy = jest.spyOn(instance, 'handleMouseEnter');
		instance.forceUpdate();
		component.update();
	});

	describe('on click', () => {
		beforeEach(() => {
			component.find('li').simulate('click', event);
		});

		it('should call handleClick', () => {
			expect(handleClickSpy).toBeCalled();
		});

		it('should stop event propagation', () => {
			expect(event.stopPropagation).toHaveBeenCalled();
		});

		it('should call onItemClick prop callback', () => {
			expect(PROPS.onItemClick).toBeCalledWith(PROPS.item);
		});
	});

	describe('on mouse enter', () => {
		beforeEach(() => {
			component.find('li').simulate('mouseEnter', event);
		});

		it('should call handleMouseEnter', () => {
			expect(handleMouseEnterSpy).toBeCalled();
		});

		it('should stop event propagation', () => {
			expect(event.stopPropagation.mock.calls.length).toBe(1);
		});

		it('should call onItemMouseEnter prop callback', () => {
			expect(PROPS.onItemMouseEnter).toBeCalledWith(PROPS.index);
		});
	});
});
