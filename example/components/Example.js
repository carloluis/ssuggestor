import React from 'react';
import Suggestor from '../../src/suggestor/Suggestor';
import ExUpdate from './ExUpdate';
import Section from './Section';
import { countries, suggestions, numbers } from '../data/index';

const valueSelected = (value, item) => console.info('select: %s -> %o', value, item);
const valueChanged = value => console.info('change to:', value);

const suggestionObjects = [{ x: 'One', y: 1 }, { x: 'Two', y: 2 }, { x: 'Three', y: 3 }, { x: 'çáëìõû', y: NaN }];
const selector = item => `${item.x}:${item.y}`;

const SuggestorWrapper = props => (
	<Suggestor
		style={{ width: '100%' }}
		onChange={valueChanged}
		onSelect={valueSelected}
		placeholder="..."
		{...props}
	/>
);

/* eslint-disable max-len */

const Example = () => (
	<div>
		<Section title="Code Example">
			<pre>{`<Suggestor list={['list', 'of', 'suggestions', ...]} style={{width:'100%'}} />`}</pre>
			<a href="https://codepen.io/carloluis/pen/rjpLYw">CodePen</a>
		</Section>

		<Section title="Using suggestion objects" description="Use selector prop to display suggestions">
			<SuggestorWrapper list={suggestionObjects} selector={selector} selectOnTab />
		</Section>

		<Section
			title="Suggestor"
			description="Use `value` prop to set initial value. Use up, down, enter and escape keys."
		>
			<SuggestorWrapper value="default" list={suggestions} tooltip="type something.." />
		</Section>

		<Section
			title="Suggestor with `selectOnTab` enabled"
			description="Select element hovered pressing `tab`. List of all countries."
		>
			<SuggestorWrapper list={countries} placeholder="countries..." tooltip="type a country name" selectOnTab />
		</Section>

		<Section
			title="Suggestor with custom styles"
			description="Use className and style props to change component appearance."
		>
			<SuggestorWrapper
				className="input-group suggestor"
				list={suggestions}
				placeholder="type a letter or number..."
			/>
		</Section>

		<Section
			title="Suggestor without keys navigation"
			description="You can only type or use mouse to view/navigate over suggestions."
		>
			<SuggestorWrapper
				list={countries}
				placeholder="countries..."
				tooltip="no keys: type/scroll over list"
				useKeys={false}
			/>
		</Section>

		<Section title="Suggestor without icons" description="No arrow nor close icon. ">
			<SuggestorWrapper
				list={suggestions}
				placeholder="type a letter or number..."
				tooltip="no arrow and no x"
				arrow={false}
				close={false}
			/>
		</Section>

		<Section title="Suggestor start suggestions on two characters" description="suggestOn prop.">
			<SuggestorWrapper
				list={countries}
				placeholder="countries..."
				tooltip="display suggestions on 2nd char"
				suggestOn={2}
			/>
		</Section>

		<Section title="Suggestor without click support" description="openOnClick prop.">
			<SuggestorWrapper
				list={suggestions}
				placeholder="type a letter or number..."
				tooltip="type something (or use navigation keys) to display suggestions"
				openOnClick={false}
			/>
		</Section>

		<Section
			title="Suggestor with 2K suggestions (numbers)"
			description="Disable keys support and open on click props. Waiting until 2nd char to display suggestions."
		>
			<SuggestorWrapper
				list={numbers}
				placeholder="enter two digits..."
				tooltip="numbers between 0 and 2000. (no icons, no keys, no click)"
				useKeys={false}
				suggestOn={2}
				openOnClick={false}
				arrow={false}
				close={false}
			/>
		</Section>

		<ExUpdate />
	</div>
);

/* eslint-enable max-len */

export default Example;
