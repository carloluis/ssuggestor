import React from 'react';
import renderer from 'react-test-renderer';
import ReactTestUtils from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';

import { KEY_CODES } from '../../utils/values';
import removeAccents from '../../utils/remove-accents';
import noop from '../../utils/noop';
import Ssuggestor, { Suggestor } from '../Suggestor';

jest.mock('../../utils/remove-accents', () => {
	return jest.fn(text => text);
});

jest.mock('../../utils/noop', () => {
	return jest.fn();
});

const PROPS = {
	list: ['temporise', 'whencesoeve', 'turophile', 'umlaut'],
	reference: jest.fn(),
	onChange: jest.fn(),
	onSelect: jest.fn(),
	onKey: jest.fn(),
	value: '',
	openOnClick: false,
	selectOnTab: false,
	placeholder: 'placeholder text',
	tooltip: 'tooltip text',
	className: 'classname to apply',
	suggestOn: 1,
	style: { color: '#eee' },
	required: false,
	useKeys: false,
	accents: false,
	arrow: false,
	close: false
};

describe('<Ssuggestor />', () => {
	it('snapshot - without suggestions', () => {
		const tree = renderer.create(<Ssuggestor {...PROPS} list={[]} />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('snapshot - with suggestions', () => {
		const tree = renderer.create(<Ssuggestor {...PROPS} />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('snapshot - with suggestions visible', () => {
		const tree = renderer.create(<Ssuggestor {...PROPS} openOnClick />);

		tree.getInstance().wrapped.setState({ open: true });

		expect(tree).toMatchSnapshot();
	});

	it('snapshot - with arrow', () => {
		const tree = renderer.create(<Ssuggestor {...PROPS} arrow />);

		expect(tree).toMatchSnapshot();
	});

	it('snapshot - with close', () => {
		const tree = renderer.create(<Ssuggestor {...PROPS} close />);

		tree.getInstance().wrapped.setState({ value: 'temp' });

		expect(tree).toMatchSnapshot();
	});
});

describe('Suggestor component', () => {
	beforeEach(() => {
		PROPS.onChange.mockReset();
		PROPS.onSelect.mockReset();
	});

	it('should initialize state.open as false', () => {
		const component = mount(<Suggestor {...PROPS} />);

		expect(component.state().open).toBeFalsy();
	});

	it('should filter list into initial state ', () => {
		const component = mount(<Suggestor {...PROPS} />);

		expect(component.state()).toMatchObject({
			filtered: [
				{ word: 'temporise', index: 0 },
				{ word: 'whencesoeve', index: 0 },
				{ word: 'turophile', index: 0 },
				{ word: 'umlaut', index: 0 }
			],
			value: PROPS.value,
			index: 0
		});
	});

	it('should call _bind when created', () => {
		const spy = jest.spyOn(Suggestor.prototype, '_bind');

		const component = shallow(<Suggestor {...PROPS} />);

		expect(spy).toHaveBeenCalled();
	});

	it('should call changeValue when remove the value: remove -> changeValue', () => {
		const component = mount(<Suggestor {...PROPS} openOnClick />);

		const spy = jest.spyOn(component.instance(), 'changeValue');

		component.instance().remove();

		expect(spy).toBeCalled();
	});

	it('handleItemMouseEnter -> setState', () => {
		const component = mount(<Suggestor {...PROPS} />);

		const spy = jest.spyOn(component.instance(), 'setState');
		const index = 2;

		component.instance().handleItemMouseEnter(index);

		expect(spy).toBeCalledWith({ index });
	});

	it('handleItemClick -> changeValue', () => {
		const component = mount(<Suggestor {...PROPS} />);

		const spy = jest.spyOn(component.instance(), 'changeValue');
		const payload = { word: 'decrassify' };

		component.instance().handleItemClick(payload);

		expect(spy).toBeCalledWith(payload.word, true);
	});

	it('focus -> input.focus', () => {
		const component = mount(<Suggestor {...PROPS} />);

		const spy = jest.spyOn(component.instance().input, 'focus');

		component.instance().focus();

		expect(spy).toBeCalled();
	});

	it('changeValue -> [setState, props.onChange, props.onSelect]', () => {
		const component = shallow(<Suggestor {...PROPS} />);
		const instance = component.instance();

		const spies = {
			setState: jest.spyOn(instance, 'setState'),
			handleClose: jest.spyOn(instance, 'handleClose')
		};

		const value = 'umlaut';
		instance.changeValue(value, true);

		expect(spies.setState).toBeCalled();
		expect(spies.handleClose).toBeCalledWith();
		expect(PROPS.onChange).toBeCalledWith(value);
		expect(PROPS.onSelect).toBeCalledWith(value);
	});

	it('handleClickOut -> handleClose', () => {
		const component = mount(<Suggestor {...PROPS} />);

		const spy = jest.spyOn(component.instance(), 'handleClose');

		component.instance().handleClickOut();

		expect(spy).toBeCalled();
	});

	it('toggleList -> setState (open suggestion list)', () => {
		const component = shallow(<Suggestor {...PROPS} />);

		const spy = jest.spyOn(component.instance(), 'setState');
		expect(component.state().open).toBeFalsy();

		component.instance().toggleList();

		expect(spy).toBeCalled();
		expect(component.state().open).toBeTruthy();
	});

	it('toggleList -> handleClose (if suggestion list is visible)', () => {
		const component = shallow(<Suggestor {...PROPS} />);

		const spy = jest.spyOn(component.instance(), 'handleClose');

		component.instance().toggleList();

		expect(spy).not.toBeCalled();

		component.instance().toggleList();

		expect(spy).toBeCalled();
	});

	it('handleChange -> changeValue', () => {
		const event = {
			stopPropagation: jest.fn(),
			target: {
				value: 'whencesoeve'
			}
		};
		const component = shallow(<Suggestor {...PROPS} />);

		const spy = jest.spyOn(component.instance(), 'changeValue');

		component.instance().handleChange(event);

		expect(spy).toBeCalled();
		expect(component.state()).toMatchObject({
			value: event.target.value,
			open: true
		});
	});

	describe('componentWillReceiveProps', () => {
		it('update state.value if props.value changed', () => {
			const component = shallow(<Suggestor {...PROPS} />);

			expect(component.state()).toMatchObject({ value: '' });

			const value = 'xesturgy';

			component.setProps({ value });

			expect(component.state()).toMatchObject({ value });
		});

		it('update state.filtered if props.list changed', () => {
			const component = shallow(<Suggestor {...PROPS} />);

			expect(component.state().filtered.length).toBe(PROPS.list.length);

			const list = ['one', 'two'];

			component.setProps({ list });

			expect(component.state().filtered.length).toBe(list.length);
		});

		it('should always call setState', () => {
			const component = shallow(<Suggestor {...PROPS} />);

			const spy = jest.spyOn(component.instance(), 'setState');

			component.setProps({ });

			expect(spy).toBeCalled();
		});
	});

	describe('handleClick function', () => {
		it('should not call toggleList (when openOnClick prop is falsy)', () => {
			const component = mount(<Suggestor {...PROPS} />);

			const spy = jest.spyOn(component.instance(), 'toggleList');

			component.instance().handleClick();

			expect(spy).not.toBeCalled();
		});

		it('handleClick -> toggleList (if openOnClick prop is truthy)', () => {
			const component = mount(<Suggestor {...PROPS} openOnClick />);

			const spy = jest.spyOn(component.instance(), 'toggleList');

			component.instance().handleClick();

			expect(spy).toBeCalled();
		});
	});

	describe('... handles input changes', () => {
		const event = {
			stopPropagation: jest.fn(),
			target: { value: 'temp' }
		};

		beforeEach(() => {
			event.stopPropagation.mockReset();
			PROPS.onChange.mockReset();
		});

		it('should stop event propagation', () => {
			const component = mount(<Suggestor {...PROPS} />);

			component.find('input').simulate('change', event);

			expect(event.stopPropagation).toBeCalled();
		});

		it('should update state', () => {
			const component = mount(<Suggestor {...PROPS} />);

			component.find('input').simulate('change', event);

			expect(component.state().value).toBe(event.target.value);
			expect(component.state().open).toBeTruthy();
		});

		it('should call onChange prop callback', () => {
			const component = mount(<Suggestor {...PROPS} />);

			component.find('input').simulate('change', event);

			expect(PROPS.onChange).toBeCalled();
			expect(PROPS.onSelect).not.toBeCalled();
		});

		it('should call onSelect prop callback when select value', () => {
			const component = mount(<Suggestor {...PROPS} openOnClick />);

			component.instance().changeValue('temp', true);

			expect(PROPS.onChange).toBeCalled();
			expect(PROPS.onSelect).toBeCalled();
		});

		it('should call handleClose when select value', () => {
			const component = mount(<Suggestor {...PROPS} />);

			const spy = jest.spyOn(component.instance(), 'handleClose');
			component.update();

			component.instance().changeValue('temp', true);

			expect(spy).toBeCalled();
		});

		it('should call handleClose when select value (2)', () => {
			const component = mount(<Suggestor {...PROPS} />);

			const spy = jest.spyOn(component.instance(), 'handleClose');

			component.instance().changeValue('no match!');

			expect(spy).toBeCalled();
		});
	});

	describe('... handles keys', () => {
		const event = {
			preventDefault: jest.fn(),
			keyCode: KEY_CODES.ENTER
		};

		beforeEach(() => {
			event.preventDefault.mockReset();
			PROPS.onKey.mockReset();
			PROPS.onChange.mockReset();
			PROPS.onSelect.mockReset();
		});

		it('should call prop onKey callback', () => {
			const component = shallow(<Suggestor {...PROPS} />);

			component.find('div').simulate('keyDown', event);

			expect(event.preventDefault).not.toBeCalled();
			expect(PROPS.onKey).toBeCalled();
		});

		it('should call processKey if useKeys is truthy', () => {
			const component = shallow(<Suggestor {...PROPS} useKeys />);

			const processKeySpy = jest.spyOn(component.instance(), 'processKey');

			component.find('div').simulate('keyDown', { ...event, keyCode: KEY_CODES.UP });

			expect(processKeySpy).toBeCalledWith(KEY_CODES.UP);
		});

		it('should call processKey if useKeys is truthy', () => {
			const component = shallow(<Suggestor {...PROPS} />);

			const processKeySpy = jest.spyOn(component.instance(), 'processKey');

			component.find('div').simulate('keyDown', { ...event, keyCode: KEY_CODES.UP });

			expect(processKeySpy).not.toBeCalledWith();
		});

		it('should prevent event default action (with keys: ENTER, ESCAPE, UP, DOWN)', () => {
			const component = shallow(<Suggestor {...PROPS} useKeys />);

			expect(event.preventDefault).not.toBeCalled();

			const keys = [KEY_CODES.ENTER, KEY_CODES.ESCAPE, KEY_CODES.UP, KEY_CODES.DOWN];

			keys.map((keyCode, index) => {
				component.find('div').simulate('keyDown', { ...event, keyCode });

				expect(event.preventDefault).toHaveBeenCalledTimes(index + 1);
			});

			expect(event.preventDefault).toBeCalled();
		});

		it('should not prevent event default action (with key: TAB)', () => {
			const component = shallow(<Suggestor {...PROPS} useKeys />);

			component.find('div').simulate('keyDown', { ...event, keyCode: KEY_CODES.TAB });

			expect(event.preventDefault).not.toBeCalled();
		});

		it('should only close suggestion list - if selectOnTab is off (TAB key)', () => {
			const component = shallow(<Suggestor {...PROPS} useKeys />);

			const changeValueSpy = jest.spyOn(component.instance(), 'changeValue');
			const handleCloseSpy = jest.spyOn(component.instance(), 'handleClose');

			component.find('div').simulate('keyDown', { ...event, keyCode: KEY_CODES.TAB });

			expect(changeValueSpy).not.toBeCalled();
			expect(handleCloseSpy).toBeCalled();
		});

		it('should change value (TAB key)', () => {
			const component = shallow(<Suggestor {...PROPS} useKeys selectOnTab />);
			component.setState({ open: true });

			const changeValueSpy = jest.spyOn(component.instance(), 'changeValue');
			const handleCloseSpy = jest.spyOn(component.instance(), 'handleClose');

			component.find('div').simulate('keyDown', { ...event, keyCode: KEY_CODES.TAB });

			expect(changeValueSpy).toBeCalled();
			expect(handleCloseSpy).toBeCalled();
			expect(PROPS.onChange).toBeCalled();
			expect(PROPS.onSelect).toBeCalled();
		});

		it('should clear selected value if any and suggestion list is closed (ESC key)', () => {
			const component = shallow(<Suggestor {...PROPS} useKeys selectOnTab />);
			component.setState({ open: false, value: 'temporise' });

			const changeValueSpy = jest.spyOn(component.instance(), 'changeValue');
			const handleCloseSpy = jest.spyOn(component.instance(), 'handleClose');

			component.find('div').simulate('keyDown', { ...event, keyCode: KEY_CODES.ESCAPE });

			expect(handleCloseSpy).toBeCalled();
			expect(changeValueSpy).toBeCalledWith('');
			expect(PROPS.onChange).toBeCalled();
			expect(PROPS.onSelect).not.toBeCalled(); // check actual behavior
		});

		it('should change value (ENTER key)', () => {
			const component = shallow(<Suggestor {...PROPS} useKeys />);
			const instance = component.instance();

			component.setState({ open: true, index: 0 });

			const spies = {
				changeValue: jest.spyOn(instance, 'changeValue'),
				toggleList: jest.spyOn(instance, 'toggleList')
			};

			component.find('div').simulate('keyDown', { ...event, keyCode: KEY_CODES.ENTER });

			const selectedItem = PROPS.list[0];

			expect(PROPS.onKey).toBeCalled();
			expect(spies.toggleList).toBeCalled();
			expect(spies.changeValue).toBeCalledWith(selectedItem, true);
			expect(PROPS.onSelect).toBeCalledWith(selectedItem);
			expect(event.preventDefault).toBeCalled();

		});

		it('should only call props.onKey for unsupported keys', () => {
			const component = shallow(<Suggestor {...PROPS} useKeys />);
			const instance = component.instance();

			const spies = {
				changeValue: jest.spyOn(instance, 'changeValue'),
				handleClose: jest.spyOn(instance, 'handleClose'),
				setState: jest.spyOn(instance, 'setState'),
				toggleList: jest.spyOn(instance, 'toggleList')
			};

			component.find('div').simulate('keyDown', { ...event, keyCode: 0 });

			expect(event.preventDefault).not.toBeCalled();
			expect(spies.changeValue).not.toBeCalled();
			expect(spies.handleClose).not.toBeCalled();
			expect(spies.setState).not.toBeCalled();
			expect(spies.toggleList).not.toBeCalled();
			expect(PROPS.onSelect).not.toBeCalled();
			expect(PROPS.onKey).toBeCalled();
		});
	});

	describe('filter', () => {
		beforeEach(() => {
			removeAccents.mockClear();
		});

		it('should call removeAccents (if accents not allowed)', () => {
			const component = mount(<Suggestor {...PROPS} />);

			component.instance().filter(PROPS.list, 'illaudable');

			expect(removeAccents).toBeCalled();
		});

		it('should not call removeAccents (if accents support)', () => {
			const component = mount(<Suggestor {...PROPS} accents />);

			component.instance().filter(PROPS.list, 'illaudable');

			expect(removeAccents).not.toBeCalled();
		});

		it('should return all item on suggestion list (if onlyMatch arg set to falsy)', () => {
			const component = mount(<Suggestor {...PROPS} />);

			const value = 'temporise';

			const result = component.instance().filter(PROPS.list, value, false);

			expect(result.length).toBe(4);

			const [first, ...tail] = result;

			expect(first).toEqual({
				word: value,
				index: 0
			});
			expect(tail.every(item => item.index === -1)).toBeTruthy();
		});

		it('should return only matches from suggestion list', () => {
			const component = mount(<Suggestor {...PROPS} />);

			const result = component.instance().filter(PROPS.list, 'temporise');

			expect(result.length).toBe(1);
			expect(result[0].index).toBeGreaterThanOrEqual(0);
		});

		it('should return all if search pattern is empty', () => {
			const component = mount(<Suggestor {...PROPS} />);

			const result = component.instance().filter(PROPS.list);

			expect(result.every(item => item.index === 0)).toBeTruthy();
			expect(result.length).toBe(4);
		});
	});
});

describe('Suggestor - default cb props use noop', () => {
	const { onChange, onSelect, onKey, ...props } = PROPS;
	const component = shallow(<Suggestor {...props} />);

	beforeEach(() => {
		noop.mockReset();
	});

	it('should set noop when not onChange, onSelect, oKey props func provided', () => {
		const props = component.props();
		expect(props.onChange).toBe(props.onSelect);
		expect(props.onSelect).toBe(props.onKey);
	});

	it('sould call noop func', () => {
		expect(component.instance().props.onSelect()).toBe(undefined);
		expect(noop).toBeCalled();
	});
});

test('Suggestor renders suggestion list closed', () => {
	const component = ReactTestUtils.renderIntoDocument(<Ssuggestor {...PROPS} />);

	expect(component.wrapped.state.open).toBeFalsy();
});
