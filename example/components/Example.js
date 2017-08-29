import React from 'react';
import SSuggestor, { Suggestor } from '../../src/suggestor/Suggestor';
import ExUpdate from './ExUpdate';
import Section from './Section';
import { countries, suggestions, numbers } from '../data/index';

const handleSSuggestorChange = value => console.info(value);

const STYLE_WIDTH = { width: '100%' };
/* eslint-disable max-len */

const Example = () =>
	<div style={{ padding: '20px 0 100px' }}>
		<Section title="Code Example">
			<pre>
				{`<SSuggestor list={['list', 'of', 'suggestions', ...]} style={{width:'100%''}} />`}
			</pre>
		</Section>

		<Section
			title="Suggestor"
			description="Use `value` prop to set initial value. Click x-icon to delete current value. Use up, down, enter and escape keys."
		>
			<SSuggestor
				value="default"
				list={suggestions}
				onChange={handleSSuggestorChange}
				placeholder="..."
				tooltip="type something.."
				style={STYLE_WIDTH}
			/>
		</Section>

		<Section
			title="Suggestor with `selectOnTab` enabled"
			description="Select element hovered pressing `tab`. List of all countries."
		>
			<SSuggestor
				list={countries}
				placeholder="countries..."
				tooltip="type a country name"
				onChange={handleSSuggestorChange}
				selectOnTab
				style={STYLE_WIDTH}
			/>
		</Section>

		<Section
			title="Suggestor with custom styles"
			description="Use className and style props to change component appearance."
		>
			<SSuggestor
				className="input-group suggestor"
				list={suggestions}
				placeholder="type a letter or number..."
				style={STYLE_WIDTH}
				onChange={handleSSuggestorChange}
			/>
		</Section>

		<Section
			title="Suggestor without keys navigation"
			description="You can only type or use mouse to view/navigate over suggestions."
		>
			<SSuggestor
				list={countries}
				placeholder="countries..."
				tooltip="no keys: type/scroll over list"
				onChange={handleSSuggestorChange}
				style={STYLE_WIDTH}
				useKeys={false}
			/>
		</Section>

		<Section title="Suggestor without icons" description="No arrow nor close icon. ">
			<SSuggestor
				list={suggestions}
				placeholder="type a letter or number..."
				tooltip="no arrow and no x"
				onChange={handleSSuggestorChange}
				style={STYLE_WIDTH}
				arrow={false}
				close={false}
			/>
		</Section>

		<Section title="Suggestor start suggestions on two characters" description="suggestOn prop.">
			<SSuggestor
				list={countries}
				placeholder="countries..."
				tooltip="display suggestions on 2nd char"
				onChange={handleSSuggestorChange}
				style={STYLE_WIDTH}
				suggestOn={2}
			/>
		</Section>

		<Section title="Suggestor without click support" description="openOnClick prop.">
			<SSuggestor
				list={suggestions}
				placeholder="type a letter or number..."
				tooltip="type something (or use navigation keys) to display suggestions"
				onChange={handleSSuggestorChange}
				style={STYLE_WIDTH}
				openOnClick={false}
			/>
		</Section>

		<Section
			title="Suggestor with 2K suggestions"
			description="Long suggestion list (of numbers). Disable keys support and open on click. Waiting until 2nd char for suggestions."
		>
			<SSuggestor
				list={numbers}
				placeholder="enter two digits..."
				tooltip="numbers between 0 and 2000. (no icons, no keys, no click)"
				useKeys={false}
				suggestOn={2}
				openOnClick={false}
				arrow={false}
				close={false}
				style={STYLE_WIDTH}
				onChange={handleSSuggestorChange}
			/>
		</Section>

		<Section
			title="Suggestor without clickout support"
			description="This one doesn`t close on click outside component. Only support clicks on component."
		>
			<Suggestor
				list={suggestions}
				placeholder="type a letter or number..."
				tooltip="only support clicks on component"
				style={STYLE_WIDTH}
				onChange={handleSSuggestorChange}
			/>
		</Section>

		<ExUpdate />
	</div>;

/* eslint-enable max-len */

export default Example;
