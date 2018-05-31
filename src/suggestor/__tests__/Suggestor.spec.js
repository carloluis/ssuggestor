import React from 'react';
import renderer from 'react-test-renderer';
import ReactTestUtils from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';

import theme from '../../themes/bootstrap-3.json';
import * as utils from '../../utils';
import transform from '../../utils/transform';
import Suggestor from '../Suggestor';

const { keys, noop } = utils;

jest.mock('../../utils/transform', () => jest.fn((_, s) => s));
jest.mock('../../utils/noop', () => jest.fn());

const PROPS = {
	list: ['temporise', 'whencesoeve', 'turophile', 'umlaut'],
	onChange: jest.fn().mockName('oChangeMock'),
	onSelect: jest.fn().mockName('onSelectMock'),
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
	close: false,
	theme
};

describe('<Ssuggestor />', () => {
	it('snapshot - without suggestions', () => {
		const tree = renderer.create(<Suggestor {...PROPS} list={[]} />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('snapshot - with suggestions', () => {
		const tree = renderer.create(<Suggestor {...PROPS} />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('snapshot - with suggestions visible', () => {
		const tree = renderer.create(<Suggestor {...PROPS} openOnClick />);
		tree.getInstance().setState({ open: true });
		expect(tree).toMatchSnapshot();
	});

	it('snapshot - with arrow', () => {
		const tree = renderer.create(<Suggestor {...PROPS} arrow />);
		expect(tree).toMatchSnapshot();
	});

	it('snapshot - with close', () => {
		const tree = renderer.create(<Suggestor {...PROPS} close />);
		tree.getInstance().setState({ value: 'temp' });
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
			const spy = jest.spyOn(mounted.instance().input.current, 'focus');
			mounted.instance().focus();

			expect(spy).toBeCalled();
		});
	});

	describe('shallow component', () => {
		let component, instance;
		let setStateSpy, closeSpy, changeValueSpy;
		const autoBindSpy = jest.spyOn(utils, 'autoBind');

		beforeEach(() => {
			autoBindSpy.mockClear();
			component = shallow(<Suggestor {...PROPS} />);
			instance = component.instance();
			setStateSpy = jest.spyOn(instance, 'setState');
			closeSpy = jest.spyOn(instance, 'close');
			changeValueSpy = jest.spyOn(instance, 'changeValue');
		});

		afterEach(() => {
			expect(autoBindSpy).toHaveBeenCalledTimes(1);
		});

		it('changeValue -> [setState, props.onChange, props.onSelect]', () => {
			const value = 'umlaut';
			instance.changeValue(value, true);

			expect(setStateSpy).toBeCalled();
			expect(closeSpy).toBeCalledWith();
			expect(PROPS.onChange).toBeCalledWith(value);
			expect(PROPS.onSelect).toBeCalledWith(value, value);
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
		let component, instance, closeSpy, setStateSpy;
		beforeEach(() => {
			component = shallow(<Suggestor {...PROPS} />);
			instance = component.instance();
			closeSpy = jest.spyOn(instance, 'close');
			setStateSpy = jest.spyOn(instance, 'setState');
		});

		it('should not perform any action (when openOnClick prop is falsy)', () => {
			instance.handleClick();
			expect(closeSpy).not.toBeCalled();
		});

		it('handleClick and openOnClick prop -> set open on when closed', () => {
			component.setProps({ openOnClick: true });
			instance.handleClick();

			expect(setStateSpy).toBeCalledWith({
				filtered: expect.any(Array),
				open: true
			});
			expect(closeSpy).not.toBeCalled();
		});

		it('handleClick and openOnClick prop -> toggle open flag', () => {
			component.setProps({ openOnClick: true });
			component.setState({ open: true });

			instance.handleClick();

			expect(setStateSpy).toBeCalledWith({
				filtered: expect.anything(),
				index: expect.any(Number),
				open: false
			});
			expect(closeSpy).toBeCalled();
		});
	});

	describe('... handleClose', () => {
		let mountedInstance, closeSpy;

		beforeEach(() => {
			mountedInstance = mount(<Suggestor {...PROPS} openOnClick />).instance();
			closeSpy = jest.spyOn(mountedInstance, 'close');
		});

		afterEach(() => {
			expect(closeSpy).toBeCalled();
		});

		it('should call when select value', () => {
			mountedInstance.changeValue('temp', true);
		});

		it('should call when _onClick', () => {
			mountedInstance.input = { current: { parentNode: { contains: jest.fn() } } };
			mountedInstance._onClick({ target: {} });
		});

		it('should call when open and click', () => {
			mountedInstance.handleClick();
			mountedInstance.handleClick();
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
			keyCode: keys.ENTER
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

			component.find('div').simulate('keyDown', { ...event, keyCode: keys.UP });

			expect(processKeySpy).not.toBeCalledWith();
		});

		describe('when using keys (useKeys: true)', () => {
			let processKeySpy, changeValueSpy, closeSpy, unfilterSpy, setStateSpy;

			beforeEach(() => {
				component.setProps({ useKeys: true });
				processKeySpy = jest.spyOn(component.instance(), 'processKey');
				changeValueSpy = jest.spyOn(component.instance(), 'changeValue');
				unfilterSpy = jest.spyOn(component.instance(), 'unfilter');
				closeSpy = jest.spyOn(component.instance(), 'close');
				setStateSpy = jest.spyOn(component.instance(), 'setState');
			});

			afterEach(() => {
				expect(PROPS.onKey).toBeCalled();
				expect(processKeySpy).toBeCalled();
			});

			it('should call processKey if useKeys is truthy', () => {
				component.find('div').simulate('keyDown', { ...event, keyCode: keys.UP });
				expect(processKeySpy).toBeCalledWith(keys.UP);
			});

			it('should prevent event default action (with keys: ENTER, ESCAPE, UP, DOWN)', () => {
				expect(event.preventDefault).not.toBeCalled();
				const keyCodes = [keys.ENTER, keys.ESCAPE, keys.UP, keys.DOWN];

				keyCodes.map((keyCode, index) => {
					component.find('div').simulate('keyDown', { ...event, keyCode });
					expect(event.preventDefault).toHaveBeenCalledTimes(index + 1);
				});

				expect(event.preventDefault).toBeCalled();
				expect(event.preventDefault.mock.calls.length).toBe(4);
			});

			it('should not prevent event default action (with key: TAB)', () => {
				component.find('div').simulate('keyDown', { ...event, keyCode: keys.TAB });
				expect(event.preventDefault).not.toBeCalled();
			});

			it('should only close suggestion list - if selectOnTab is off (TAB key)', () => {
				component.find('div').simulate('keyDown', { ...event, keyCode: keys.TAB });

				expect(changeValueSpy).not.toBeCalled();
				expect(closeSpy).toBeCalled();
			});

			it('should change value (ENTER key)', () => {
				const selectedItem = PROPS.list[0];
				component.instance().setState({ open: true, index: 0 });

				component.find('div').simulate('keyDown', { ...event, keyCode: keys.ENTER });

				expect(event.preventDefault).toBeCalled();
				expect(changeValueSpy).toBeCalledWith(selectedItem, true);
				expect(PROPS.onSelect).toBeCalledWith(selectedItem, selectedItem);
				expect(unfilterSpy).toBeCalled();
			});

			it('should only call props.onKey and .processKey for unsupported key', () => {
				component.find('div').simulate('keyDown', { ...event, keyCode: 0 });

				expect(event.preventDefault).not.toBeCalled();
				expect(changeValueSpy).not.toBeCalled();
				expect(closeSpy).not.toBeCalled();
				expect(setStateSpy).not.toBeCalled();
				expect(unfilterSpy).not.toBeCalled();
				expect(PROPS.onSelect).not.toBeCalled();
			});

			it('should unfilter when no suggestions found for search and press [up]/[down] keys', () => {
				component.setProps({ openOnClick: true, useKeys: true });
				component.simulate('click');

				const stopPropagationMock = jest.fn();
				component.find('input').simulate('change', {
					stopPropagation: stopPropagationMock,
					target: { value: 'no-suggestion' }
				});

				component.simulate('keyDown', { ...event, keyCode: keys.DOWN });

				expect(stopPropagationMock).toBeCalled();
				expect(unfilterSpy).toBeCalled();
				expect(unfilterSpy.mock.calls.length).toBe(2);
			});

			it('should unfilter when no suggestions found for search and press [up] keys', () => {
				component.setProps({ openOnClick: true, useKeys: true });
				component.setState({ open: true });
				component.instance().changeValue('no-suggestions');
				component.find('div').simulate('keyDown', { ...event, keyCode: keys.UP });

				expect(unfilterSpy).toBeCalled();
			});
		});

		describe('when keys and selectOnTab props are on', () => {
			let changeValueSpy, closeSpy;

			beforeEach(() => {
				component.setProps({ useKeys: true, selectOnTab: true });
				changeValueSpy = jest.spyOn(component.instance(), 'changeValue');
				closeSpy = jest.spyOn(component.instance(), 'close');
			});

			it('should change value (TAB key)', () => {
				component.setState({ open: true });
				component.find('div').simulate('keyDown', { ...event, keyCode: keys.TAB });

				expect(changeValueSpy).toBeCalled();
				expect(closeSpy).toBeCalled();
				expect(PROPS.onChange).toBeCalled();
				expect(PROPS.onSelect).toBeCalled();
			});

			it('should clear selected value if any and suggestion list is closed (ESC key)', () => {
				component.setState({ open: false, value: 'temporise' });
				component.find('div').simulate('keyDown', { ...event, keyCode: keys.ESCAPE });

				expect(closeSpy).toBeCalled();
				expect(changeValueSpy).toBeCalledWith('');
				expect(PROPS.onChange).toBeCalled();
				expect(PROPS.onSelect).not.toBeCalled();
			});
		});
	});

	describe('filter', () => {
		let component, instance;

		beforeEach(() => {
			transform.mockClear();
			component = shallow(<Suggestor {...PROPS} />);
			instance = component.instance();
		});

		afterEach(() => {
			expect(transform).toBeCalled();
			transform.mockClear();
		});

		it('should call for every suggestion and the value', () => {
			expect(transform).toHaveBeenCalledTimes(PROPS.list.length + 1);
		});

		it('should call strip (if accents not allowed)', () => {
			instance.filter(PROPS.list, 'illaudable');

			expect(transform).toHaveBeenCalledTimes(2 * (PROPS.list.length + 1));
			transform.mock.calls.map(call => expect(call[0]).toBeFalsy());
		});

		it('should return all item on suggestion list (if onlyMatch arg set to falsy)', () => {
			const value = 'temporise';
			const result = instance.filter(PROPS.list, value, false);

			expect(result.length).toBe(4);

			const [first, ...tail] = result;

			expect(first).toMatchObject({
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
			const result = instance.filter(PROPS.list, '');

			expect(result.every(item => item.index === 0)).toBeTruthy();
			expect(result.length).toBe(4);
		});

		it('should not call strip (if accents support)', () => {
			component.setProps({ accents: true });
			transform.mockClear();

			component.instance().filter(PROPS.list, 'illaudable');

			expect(transform).toHaveBeenCalledTimes(PROPS.list.length + 1);
			transform.mock.calls.map(call => expect(call[0]).toBeTruthy());
		});
	});

	describe('unfilter', () => {
		const component = shallow(<Suggestor {...PROPS} />);

		it('should call component.filter', () => {
			const filterSpy = jest.spyOn(component.instance(), 'filter');
			component.instance().unfilter();

			expect(filterSpy).toHaveBeenCalledWith(PROPS.list, component.state().value, false);
		});
	});

	describe('cdm', () => {
		it('should add click listener to document', () => {
			const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
			const component = shallow(<Suggestor {...PROPS} />);
			expect(addEventListenerSpy).toBeCalled();
		});
	});

	describe('cwu', () => {
		let component, cwuSpy;
		const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');

		beforeEach(() => {
			removeEventListenerSpy.mockClear();
			component = shallow(<Suggestor {...PROPS} />);
			cwuSpy = jest.spyOn(component.instance(), 'componentWillUnmount');
			component.unmount();
		});

		it('should call componentWillUnmount', () => {
			expect(cwuSpy).toBeCalled();
		});

		it('should call removeEventListener', () => {
			expect(removeEventListenerSpy).toBeCalled();
		});

		it('should remove click listener from document', () => {
			expect(removeEventListenerSpy.mock.calls.length).toBe(1);
			expect(removeEventListenerSpy.mock.calls[0][0]).toBe('click');
		});
	});

	describe('_onClick', () => {
		const wrapper = mount(<Suggestor {...PROPS} />);
		const wrapperInstance = wrapper.instance();
		let closeSpy;

		beforeEach(() => {
			closeSpy = jest.spyOn(wrapperInstance, 'close');
			wrapper.update();
		});
		afterEach(() => {
			closeSpy.mockClear();
		});

		it('should not call handleClose when click inside component', () => {
			wrapperInstance._onClick({ target: wrapperInstance.input.current });
			expect(closeSpy).not.toBeCalled();
		});

		it('should call handleClose when click outside', () => {
			const contains = jest.fn(() => false);
			wrapperInstance.input = { current: { parentNode: { contains } } };
			wrapperInstance._onClick({ target: {} });

			expect(closeSpy).toBeCalled();
			expect(contains).toBeCalled();
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
	const component = ReactTestUtils.renderIntoDocument(<Suggestor {...PROPS} />);

	expect(component.state.open).toBeFalsy();
});
