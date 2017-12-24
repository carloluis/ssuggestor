import React from 'react';
import renderer from 'react-test-renderer';
import ReactTestUtils from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';

import * as utils from '../../utils';
import Ssuggestor, { Suggestor } from '../Suggestor';

const { KEY_CODES, noop } = utils;

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

	it('should call this.filter on component creation', () => {
		const filterSpy = jest.spyOn(Suggestor.prototype, 'filter');
		const component = shallow(<Suggestor {...PROPS} />);

		expect(filterSpy).toHaveBeenCalled();
	});

	describe('mounted component', () => {
		let mounted;
		beforeEach(() => {
			mounted = mount(<Suggestor {...PROPS} />);
		});

		it('should initialize state.open as false', () => {
			expect(mounted.state().open).toBeFalsy();
		});

		it('should filter list into initial state ', () => {
			expect(mounted.state()).toMatchObject({
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

		it('should call changeValue when remove the value: remove -> changeValue', () => {
			// mounted.setProps({ openOnClick: true });
			const spy = jest.spyOn(mounted.instance(), 'changeValue');

			mounted.instance().remove();

			expect(spy).toBeCalled();
		});

		it('handleItemMouseEnter -> setState', () => {
			const spy = jest.spyOn(mounted.instance(), 'setState');

			mounted.instance().handleItemMouseEnter(2);

			expect(spy).toBeCalledWith({ index: 2 });
		});

		it('handleItemClick -> changeValue', () => {
			const spy = jest.spyOn(mounted.instance(), 'changeValue');
			const payload = { word: 'decrassify' };

			mounted.instance().handleItemClick(payload);

			expect(spy).toBeCalledWith(payload.word, true);
		});

		it('focus -> input.focus', () => {
			const spy = jest.spyOn(mounted.instance().input, 'focus');
			mounted.instance().focus();

			expect(spy).toBeCalled();
		});
	});

	describe('shallow component', () => {
		let component, instance;
		let setStateSpy, handleCloseSpy, changeValueSpy;
		const autoBindSpy = jest.spyOn(utils, 'autoBind');

		beforeEach(() => {
			autoBindSpy.mockClear();
			component = shallow(<Suggestor {...PROPS} />);
			instance = component.instance();
			setStateSpy = jest.spyOn(instance, 'setState');
			handleCloseSpy = jest.spyOn(instance, 'handleClose');
			changeValueSpy = jest.spyOn(instance, 'changeValue');
		});

		afterEach(() => {
			expect(autoBindSpy).toHaveBeenCalledTimes(1);
		})

		it('changeValue -> [setState, props.onChange, props.onSelect]', () => {
			const value = 'umlaut';
			instance.changeValue(value, true);

			expect(setStateSpy).toBeCalled();
			expect(handleCloseSpy).toBeCalledWith();
			expect(PROPS.onChange).toBeCalledWith(value);
			expect(PROPS.onSelect).toBeCalledWith(value);
		});

		it('toggleList -> setState (open suggestion list)', () => {
			expect(component.state().open).toBeFalsy();
			instance.toggleList();

			expect(setStateSpy).toBeCalled();
			expect(component.state().open).toBeTruthy();
		});

		it('toggleList -> handleClose (if suggestion list is visible)', () => {
			instance.toggleList();

			expect(handleCloseSpy).not.toBeCalled();

			instance.toggleList();

			expect(handleCloseSpy).toBeCalled();
		});

		it('handleChange -> changeValue', () => {
			const event = {
				stopPropagation: jest.fn(),
				target: {
					value: 'whencesoeve'
				}
			};
			instance.handleChange(event);

			expect(changeValueSpy).toBeCalled();
			expect(component.state()).toMatchObject({
				value: event.target.value,
				open: true
			});
		});
	});

	describe('componentWillReceiveProps', () => {
		let component, setStateSpy;

		beforeEach(() => {
			component = shallow(<Suggestor {...PROPS} />);
			setStateSpy = jest.spyOn(component.instance(), 'setState');

			const state = component.state();
			expect(state).toMatchObject({ value: '', filtered: expect.any(Array) });
			expect(state.filtered.length).toBe(PROPS.list.length);
		});

		afterEach(() => {
			expect(setStateSpy).toBeCalled();
		});

		it('update state.value if props.value changed', () => {
			const value = 'xesturgy';
			component.setProps({ value });

			expect(component.state()).toMatchObject({ value });
		});

		it('update state.filtered if props.list changed', () => {
			const list = ['one', 'two'];
			component.setProps({ list });

			expect(component.state().filtered.length).toBe(list.length);
		});

		it('should always call setState', () => {
			component.setProps({});
		});
	});

	describe('handleClick function', () => {
		let component, instance, toggleListSpy;
		beforeEach(() => {
			component = shallow(<Suggestor {...PROPS} />);
			instance = component.instance();
			toggleListSpy = jest.spyOn(instance, 'toggleList');
		});

		it('should not call toggleList (when openOnClick prop is falsy)', () => {
			instance.handleClick();

			expect(toggleListSpy).not.toBeCalled();
		});

		it('handleClick -> toggleList (if openOnClick prop is truthy)', () => {
			component.setProps({ openOnClick: true });
			instance.handleClick();

			expect(toggleListSpy).toBeCalled();
		});
	});

	describe('... handleClose', () => {
		let instance, handleCloseSpy;

		beforeEach(() => {
			instance = shallow(<Suggestor {...PROPS} />).instance();
			handleCloseSpy = jest.spyOn(instance, 'handleClose');
		});

		afterEach(() => {
			expect(handleCloseSpy).toBeCalled();
		});

		it('should call when handleClickOut', () => {
			instance.handleClickOut();
		});

		it('should call when select value', () => {
			instance.changeValue('temp', true);
		});

		it('should call when select value (2)', () => {
			instance.changeValue('no match!');
		});
	});

	describe('... handles input changes', () => {
		const event = {
			stopPropagation: jest.fn(),
			target: { value: 'temp' }
		};
		let component;

		beforeEach(() => {
			event.stopPropagation.mockReset();
			PROPS.onChange.mockReset();
			component = shallow(<Suggestor {...PROPS} />);
		});

		it('should stop event propagation', () => {
			component.find('input').simulate('change', event);

			expect(event.stopPropagation).toBeCalled();
		});

		it('should update state', () => {
			component.find('input').simulate('change', event);

			expect(component.state().value).toBe(event.target.value);
			expect(component.state().open).toBeTruthy();
		});

		it('should call onChange prop callback', () => {
			component.find('input').simulate('change', event);

			expect(PROPS.onChange).toBeCalled();
			expect(PROPS.onSelect).not.toBeCalled();
		});

		it('should call onSelect prop callback when select value', () => {
			component.setProps({ openOnClick: true });
			component.instance().changeValue('temp', true);

			expect(PROPS.onChange).toBeCalled();
			expect(PROPS.onSelect).toBeCalled();
		});
	});

	describe('... handles keys', () => {
		const event = {
			preventDefault: jest.fn(),
			keyCode: KEY_CODES.ENTER
		};
		let component;

		beforeEach(() => {
			event.preventDefault.mockReset();
			PROPS.onKey.mockReset();
			PROPS.onChange.mockReset();
			PROPS.onSelect.mockReset();

			component = shallow(<Suggestor {...PROPS} />);
		});

		it('should call prop onKey callback', () => {
			component.find('div').simulate('keyDown', event);

			expect(event.preventDefault).not.toBeCalled();
			expect(PROPS.onKey).toBeCalled();
		});

		it('should not call processKey if useKeys is falsy', () => {
			const processKeySpy = jest.spyOn(component.instance(), 'processKey');

			component.find('div').simulate('keyDown', { ...event, keyCode: KEY_CODES.UP });

			expect(processKeySpy).not.toBeCalledWith();
		});

		describe('when using keys (useKeys: true)', () => {
			let processKeySpy, changeValueSpy, handleCloseSpy, toggleListSpy, setStateSpy;

			beforeEach(() => {
				component.setProps({ useKeys: true });
				processKeySpy = jest.spyOn(component.instance(), 'processKey');
				changeValueSpy = jest.spyOn(component.instance(), 'changeValue');
				handleCloseSpy = jest.spyOn(component.instance(), 'handleClose');
				toggleListSpy = jest.spyOn(component.instance(), 'toggleList');
				setStateSpy = jest.spyOn(component.instance(), 'setState');
			});

			afterEach(() => {
				expect(PROPS.onKey).toBeCalled();
				expect(processKeySpy).toBeCalled();
			});

			it('should call processKey if useKeys is truthy', () => {
				component.find('div').simulate('keyDown', { ...event, keyCode: KEY_CODES.UP });

				expect(processKeySpy).toBeCalledWith(KEY_CODES.UP);
			});

			it('should prevent event default action (with keys: ENTER, ESCAPE, UP, DOWN)', () => {
				expect(event.preventDefault).not.toBeCalled();
				const keys = [KEY_CODES.ENTER, KEY_CODES.ESCAPE, KEY_CODES.UP, KEY_CODES.DOWN];

				keys.map((keyCode, index) => {
					component.find('div').simulate('keyDown', { ...event, keyCode });
					expect(event.preventDefault).toHaveBeenCalledTimes(index + 1);
				});

				expect(event.preventDefault).toBeCalled();
				expect(event.preventDefault.mock.calls.length).toBe(4);
			});

			it('should not prevent event default action (with key: TAB)', () => {
				component.find('div').simulate('keyDown', { ...event, keyCode: KEY_CODES.TAB });

				expect(event.preventDefault).not.toBeCalled();
			});

			it('should only close suggestion list - if selectOnTab is off (TAB key)', () => {
				component.find('div').simulate('keyDown', { ...event, keyCode: KEY_CODES.TAB });

				expect(changeValueSpy).not.toBeCalled();
				expect(handleCloseSpy).toBeCalled();
			});

			it('should change value (ENTER key)', () => {
				const selectedItem = PROPS.list[0];
				component.instance().setState({ open: true, index: 0 });

				component.find('div').simulate('keyDown', { ...event, keyCode: KEY_CODES.ENTER });

				expect(PROPS.onSelect).toBeCalledWith(selectedItem);
				expect(event.preventDefault).toBeCalled();
				expect(changeValueSpy).toBeCalledWith(selectedItem, true);
				expect(toggleListSpy).toBeCalled();
			});

			it('should only call props.onKey and .processKey for unsupported key', () => {
				component.find('div').simulate('keyDown', { ...event, keyCode: 0 });

				expect(event.preventDefault).not.toBeCalled();
				expect(changeValueSpy).not.toBeCalled();
				expect(handleCloseSpy).not.toBeCalled();
				expect(toggleListSpy).not.toBeCalled();
				expect(setStateSpy).not.toBeCalled();
				expect(PROPS.onSelect).not.toBeCalled();
			});
		});

		describe('when keys and selectOnTab props are on', () => {
			let changeValueSpy, handleCloseSpy;

			beforeEach(() => {
				component.setProps({ useKeys: true, selectOnTab: true });
				changeValueSpy = jest.spyOn(component.instance(), 'changeValue');
				handleCloseSpy = jest.spyOn(component.instance(), 'handleClose');
			});

			it('should change value (TAB key)', () => {
				component.setState({ open: true });
				component.find('div').simulate('keyDown', { ...event, keyCode: KEY_CODES.TAB });

				expect(changeValueSpy).toBeCalled();
				expect(handleCloseSpy).toBeCalled();
				expect(PROPS.onChange).toBeCalled();
				expect(PROPS.onSelect).toBeCalled();
			});

			it('should clear selected value if any and suggestion list is closed (ESC key)', () => {
				component.setState({ open: false, value: 'temporise' });
				component.find('div').simulate('keyDown', { ...event, keyCode: KEY_CODES.ESCAPE });

				expect(handleCloseSpy).toBeCalled();
				expect(changeValueSpy).toBeCalledWith('');
				expect(PROPS.onChange).toBeCalled();
				expect(PROPS.onSelect).not.toBeCalled();
			});
		});
	});

	describe('filter', () => {
		const removeAccentsSpy = jest.spyOn(utils, 'removeAccents');
		let component, instance;

		beforeEach(() => {
			removeAccentsSpy.mockClear();
			component = shallow(<Suggestor {...PROPS} />);
			instance = component.instance();
		});

		it('should call removeAccents (if accents not allowed)', () => {
			instance.filter(PROPS.list, 'illaudable');

			expect(removeAccentsSpy).toBeCalled();
		});

		it('should return all item on suggestion list (if onlyMatch arg set to falsy)', () => {
			const value = 'temporise';
			const result = instance.filter(PROPS.list, value, false);

			expect(result.length).toBe(4);

			const [first, ...tail] = result;

			expect(first).toEqual({
				word: value,
				index: 0
			});
			expect(tail.every(item => item.index === -1)).toBeTruthy();
		});

		it('should return only matches from suggestion list', () => {
			const result = instance.filter(PROPS.list, 'temporise');

			expect(result.length).toBe(1);
			expect(result[0].index).toBeGreaterThanOrEqual(0);
		});

		it('should return all if search pattern is empty', () => {
			const result = instance.filter(PROPS.list);

			expect(result.every(item => item.index === 0)).toBeTruthy();
			expect(result.length).toBe(4);
		});

		it('should not call removeAccents (if accents support)', () => {
			component.setProps({ accents: true });
			removeAccentsSpy.mockClear();

			component.instance().filter(PROPS.list, 'illaudable');

			expect(removeAccentsSpy).not.toBeCalled();
		});
	});
});

describe('Suggestor - default cb props use noop', () => {
	let component, componentProps;

	beforeEach(() => {
		const { onChange, onSelect, onKey, ...props } = PROPS;
		component = mount(<Suggestor {...props} />);
		componentProps = component.props();
	});

	it('should set noop when not onChange, onSelect, oKey props func provided', () => {
		expect(componentProps.onChange).toBe(componentProps.onSelect);
		expect(componentProps.onSelect).toBe(componentProps.onKey);
	});

	it('sould call noop func', () => {
		expect(componentProps.onSelect()).toBe(undefined);
		expect(noop).toBeCalled();
	});
});

test('Suggestor renders suggestion list closed', () => {
	const component = ReactTestUtils.renderIntoDocument(<Ssuggestor {...PROPS} />);

	expect(component.wrapped.state.open).toBeFalsy();
});
