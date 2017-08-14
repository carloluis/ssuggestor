import React from 'react';
import Ssuggestor, { Suggestor } from '../Suggestor';
import { KEY_CODES } from '../../utils/values';
import renderer from 'react-test-renderer';
import ReactTestUtils from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';

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
		// tree.getInstance().wrapped.handleClick();
		// tree.getInstance().wrapped.toggleList();

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
});

test('Suggestor renders suggestion list closed', () => {
	const component = ReactTestUtils.renderIntoDocument(<Ssuggestor {...PROPS} />);

	expect(component.wrapped.state.open).toBeFalsy();
});
