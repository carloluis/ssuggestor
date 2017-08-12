import React from 'react';
import List from '../List';
import { getListStyles } from '../styles';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';

jest.mock('../styles');

const PROPS = {
	filtered: [],
	index: 0,
	onItemClick: jest.fn(),
	onItemMouseEnter: jest.fn(),
	open: false,
	value: ''
};

describe('<List />', () => {
	const filtered = [{ word: 'locellus', index: 0 }, { word: 'Lydian', index: 0 }, { word: 'warray', index: -1 }];
	const propsWithItems = { ...PROPS, filtered };

	it('snapshot', () => {
		const tree = renderer.create(<List {...PROPS} />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('snapshot - no suggestion list', () => {
		const tree = renderer.create(<List {...PROPS} open />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('snapshot - suggestion list closed', () => {
		const tree = renderer.create(<List {...propsWithItems} />).toJSON();

		expect(tree).toMatchSnapshot();
	});

	it('snapshot - suggestion list open', () => {
		const tree = renderer.create(<List {...propsWithItems} open />).toJSON();

		expect(tree).toMatchSnapshot();
	});

	it('snapshot - suggestion list open (index 1)', () => {
		const props = { ...PROPS, filtered, index: 1 };

		const tree = renderer.create(<List {...props} open />).toJSON();

		expect(tree).toMatchSnapshot();
	});
});

describe('List component', () => {
	const filtered = [{ word: 'locellus', index: 0 }, { word: 'Lydian', index: 0 }, { word: 'warray', index: -1 }];

	beforeEach(() => {
		getListStyles.mockReset();
		PROPS.onItemClick.mockClear();
		PROPS.onItemMouseEnter.mockClear();
	});

	it('should render nothing when no filtered items', () => {
		const wrapper = shallow(<List {...PROPS} />);

		expect(wrapper.getNode()).toBeFalsy();
		expect(wrapper.find('.dropdown-menu').node).toBeFalsy();
	});

	it('should render nothing when filtered items are hidden', () => {
		const wrapper = shallow(<List {...PROPS} filtered={filtered} />);

		expect(wrapper.getNode()).toBeFalsy();
	});

	it('should render nothing when filtered items are hidden', () => {
		const wrapper = shallow(<List {...PROPS} filtered={filtered} open />);

		expect(wrapper.getNode()).toBeTruthy();
		expect(wrapper.find('.dropdown-menu').node).toBeTruthy();
	});

	it('should render each item inside an <li> element', () => {
		const wrapper = mount(<List {...PROPS} filtered={filtered} open />);

		const lis = wrapper.find('li');

		expect(lis.length).toBe(3);
	});

	it('should render each item inside an <li> element', () => {
		const wrapper = mount(<List {...PROPS} filtered={filtered} open />);

		const lis = wrapper.find('li');

		expect(lis.first().text()).toBe(filtered[0].word);
	});

	it('should call onItemClick prop when <ListItem> is clicked', () => {
		const wrapper = shallow(<List {...PROPS} filtered={filtered} open />);

		wrapper.find('ListItem').first().simulate('itemClick');

		expect(PROPS.onItemClick).toHaveBeenCalledTimes(1);
	});

	it('should call onItemClick prop when each <ListItem> is clicked', () => {
		const wrapper = shallow(<List {...PROPS} filtered={filtered} open />);

		wrapper.find('ListItem').first().simulate('itemClick');
		wrapper.find('ListItem').at(1).simulate('itemClick');
		wrapper.find('ListItem').last(2).simulate('itemClick');

		expect(PROPS.onItemClick).toHaveBeenCalledTimes(3);
	});

	it('should call onItemMouseEnter prop when mouse enter into <ListItem> area', () => {
		const wrapper = shallow(<List {...PROPS} filtered={filtered} open />);

		wrapper.find('ListItem').first().simulate('itemMouseEnter');

		expect(PROPS.onItemMouseEnter).toHaveBeenCalledTimes(1);
	});

	it('should call onItemMouseEnter prop when mouse enter into each <ListItem> area', () => {
		const wrapper = shallow(<List {...PROPS} filtered={filtered} open />);

		wrapper.find('ListItem').first().simulate('itemMouseEnter');
		wrapper.find('ListItem').at(1).simulate('itemMouseEnter');
		wrapper.find('ListItem').last().simulate('itemMouseEnter');

		expect(PROPS.onItemMouseEnter).toHaveBeenCalledTimes(3);
	});
});
