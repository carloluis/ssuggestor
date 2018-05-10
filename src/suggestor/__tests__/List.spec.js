import React from 'react';
import List from '../List';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';

const PROPS = {
	filtered: [{ word: 'locellus', index: 0 }, { word: 'Lydian', index: 0 }, { word: 'warray', index: -1 }],
	index: 0,
	onItemClick: jest.fn(),
	onItemMouseEnter: jest.fn(),
	open: false,
	value: ''
};

describe('<List />', () => {
	it('snapshot', () => {
		const tree = renderer.create(<List {...PROPS} filtered={[]} />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('snapshot - no suggestion list', () => {
		const tree = renderer.create(<List {...PROPS} filtered={[]} open />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('snapshot - suggestion list closed', () => {
		const tree = renderer.create(<List {...PROPS} />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('snapshot - suggestion list open', () => {
		const tree = renderer.create(<List {...PROPS} open />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('snapshot - suggestion list open (index 1)', () => {
		const tree = renderer.create(<List {...PROPS} index={1} open />).toJSON();
		expect(tree).toMatchSnapshot();
	});
});

describe('List component', () => {
	let wrapper;

	beforeEach(() => {
		PROPS.onItemClick.mockClear();
		PROPS.onItemMouseEnter.mockClear();

		wrapper = shallow(<List {...PROPS} />);
	});

	it('should render nothing when is closed', () => {
		expect(wrapper.getElement()).toBeFalsy();
		expect(wrapper.equals(false)).toBeTruthy();
		expect(wrapper.find('.dropdown-menu').getElements().length).toBeFalsy();
	});

	describe('when is open', () => {
		let component;
		beforeEach(() => {
			component = shallow(<List {...PROPS} open />);
		});

		it('should render when open flag and any filtered items', () => {
			expect(component.getElement()).toBeTruthy();
			expect(component.find('.dropdown-menu').getElement()).toBeTruthy();
		});

		it('should call onItemClick prop when <ListItem> is clicked', () => {
			component
				.find('ListItem')
				.first()
				.simulate('itemClick');

			expect(PROPS.onItemClick).toHaveBeenCalledTimes(1);
		});

		it('should call onItemClick prop when each <ListItem> is clicked', () => {
			const listItems = component.find('ListItem');
			listItems.first().simulate('itemClick');
			listItems.at(1).simulate('itemClick');
			listItems.last().simulate('itemClick');

			expect(PROPS.onItemClick).toHaveBeenCalledTimes(3);
		});

		it('should call onItemMouseEnter prop when mouse enter into <ListItem> area', () => {
			component
				.find('ListItem')
				.first()
				.simulate('itemMouseEnter');

			expect(PROPS.onItemMouseEnter).toHaveBeenCalledTimes(1);
		});

		it('should call onItemMouseEnter prop when mouse enter into each <ListItem> area', () => {
			const listItems = component.find('ListItem');
			listItems.first().simulate('itemMouseEnter');
			listItems.at(1).simulate('itemMouseEnter');
			listItems.last().simulate('itemMouseEnter');

			expect(PROPS.onItemMouseEnter).toHaveBeenCalledTimes(3);
		});
	});

	describe('list items', () => {
		const mounted = mount(<List {...PROPS} open />);

		it('should render all three <li> elements', () => {
			expect(mounted.find('li').length).toBe(3);
		});

		it('should render each item inside <li>', () => {
			const [first, second, third] = PROPS.filtered;
			expect(
				mounted
					.find('li')
					.first()
					.text()
			).toBe(first.word);
			expect(
				mounted
					.find('li')
					.at(1)
					.text()
			).toBe(second.word);
			expect(
				mounted
					.find('li')
					.last()
					.text()
			).toBe(third.word);
		});
	});
});
