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

	describe('... handles keys', () => {
		const event = {
			preventDefault: jest.fn(),
			keyCode: KEY_CODES.ENTER
		};

		beforeEach(() => {
			event.preventDefault.mockReset();
			PROPS.onKey.mockReset();
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
	});
});

test('Suggestor renders suggestion list closed', () => {
	const component = ReactTestUtils.renderIntoDocument(<Ssuggestor {...PROPS} />);

	expect(component.wrapped.state.open).toBeFalsy();
});
