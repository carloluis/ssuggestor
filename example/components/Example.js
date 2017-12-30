import React from 'react';
import Suggestor from '../../src/suggestor/Suggestor';
import ExUpdate from './ExUpdate';
import Section from './Section';
import { countries, suggestions, numbers } from '../data/index';

const handleSuggestorChange = value => console.info(value);

const STYLE_WIDTH = { width: '100%' };
/* eslint-disable max-len */

const Example = () => (
	<div>
		<Section title="Code Example">
			<pre>{`<Suggestor list={['list', 'of', 'suggestions', ...]} style={{width:'100%'}} />`}</pre>
			<a href="https://codepen.io/carloluis/pen/rjpLYw">CodePen</a>
		</Section>

		<Section
			title="Suggestor"
			description="Use `value` prop to set initial value. Use up, down, enter and escape keys."
		>
			<Suggestor
				value="default"
				list={suggestions}
				onChange={handleSuggestorChange}
				placeholder="..."
				tooltip="type something.."
				style={STYLE_WIDTH}
			/>
		</Section>

		<Section
			title="Suggestor with `selectOnTab` enabled"
			description="Select element hovered pressing `tab`. List of all countries."
		>
			<Suggestor
				list={countries}
				placeholder="countries..."
				tooltip="type a country name"
				onChange={handleSuggestorChange}
				selectOnTab
				style={STYLE_WIDTH}
			/>
		</Section>

		<Section
			title="Suggestor with custom styles"
			description="Use className and style props to change component appearance."
		>
			<Suggestor
				className="input-group suggestor"
				list={suggestions}
				placeholder="type a letter or number..."
				style={STYLE_WIDTH}
				onChange={handleSuggestorChange}
			/>
		</Section>

		<Section
			title="Suggestor without keys navigation"
			description="You can only type or use mouse to view/navigate over suggestions."
		>
			<Suggestor
				list={countries}
				placeholder="countries..."
				tooltip="no keys: type/scroll over list"
				onChange={handleSuggestorChange}
				style={STYLE_WIDTH}
				useKeys={false}
			/>
		</Section>

		<Section title="Suggestor without icons" description="No arrow nor close icon. ">
			<Suggestor
				list={suggestions}
				placeholder="type a letter or number..."
				tooltip="no arrow and no x"
				onChange={handleSuggestorChange}
				style={STYLE_WIDTH}
				arrow={false}
				close={false}
			/>
		</Section>

		<Section title="Suggestor start suggestions on two characters" description="suggestOn prop.">
			<Suggestor
				list={countries}
				placeholder="countries..."
				tooltip="display suggestions on 2nd char"
				onChange={handleSuggestorChange}
				style={STYLE_WIDTH}
				suggestOn={2}
			/>
		</Section>

		<Section title="Suggestor without click support" description="openOnClick prop.">
			<Suggestor
				list={suggestions}
				placeholder="type a letter or number..."
				tooltip="type something (or use navigation keys) to display suggestions"
				onChange={handleSuggestorChange}
				style={STYLE_WIDTH}
				openOnClick={false}
			/>
		</Section>

		<Section
			title="Suggestor with 2K suggestions (numbers)"
			description="Disable keys support and open on click props. Waiting until 2nd char to display suggestions."
		>
			<Suggestor
				list={numbers}
				placeholder="enter two digits..."
				tooltip="numbers between 0 and 2000. (no icons, no keys, no click)"
				useKeys={false}
				suggestOn={2}
				openOnClick={false}
				arrow={false}
				close={false}
				style={STYLE_WIDTH}
				onChange={handleSuggestorChange}
			/>
		</Section>

		<ExUpdate />
	</div>
);

/* eslint-enable max-len */

export default Example;
