import React from 'react';
import SSuggestor, { Suggestor } from '../../src/suggestor/Suggestor';
import Section from './Section';

const SUGGESTIONS = [
	'a', 'aa', 'aaa', 'aaaa', 'aaaaa', 
	'b', 'bb', 'bbb', 'bbbb', 'bbbbb',
	'c', 'cc', 'ccc', 'cccc', 'ccccc',
	'abc', 'aABC', 'AaBbCc',
	'A', 'B', 'C'
];
const BIG_DATA = [];
for (var i = 0; i < 2000; i++) {
	BIG_DATA.push(''+i);
}
const handleSSuggestorChange = (value) => console.info(value);

const STYLE_WIDTH = { width:'100%' };

const Example = () => (
	<div style={{padding:'20px 0 200px'}}>
		<Section title="Code Example">
		<pre>
			{
`<SSuggestor list={['list', 'of', 'suggestions', ...]} 
	placeholder="type something..." 
	style={{width:'100%''}} 
	/>`
			}
		</pre>	
		</Section>

		<Section title="Suggestor with initial value" description="Use `value` prop to set initial value. Hit `x` to delete current value. Use (up, down) keys to select values.">
			<SSuggestor value="default" list={['list', 'of', 'suggestions', 'with', 'default', 'value']} 
				onChange={handleSSuggestorChange} placeholder="..." style={STYLE_WIDTH} />
		</Section>

		<Section title="Suggestor with `select on tab`" description="Select element hovered pressing `tab`.">
			<SSuggestor list={SUGGESTIONS} placeholder="type a|b|c..." onChange={handleSSuggestorChange} selectOnTab style={STYLE_WIDTH} />
		</Section>
		
		<Section title="Suggestor with custom styles" description="Use `className` prop and css to change component appearance.">
			<SSuggestor className="input-group suggestor" list={SUGGESTIONS} placeholder="type a|b|c..." 
			onChange={handleSSuggestorChange} style={STYLE_WIDTH} />
		</Section>

		<Section title="Suggestor with tooltip" description="tooltip prop.">
			<SSuggestor list={SUGGESTIONS} placeholder="type a|b|c..." tooltip="type a|b|c..."
			onChange={handleSSuggestorChange} style={STYLE_WIDTH} />
		</Section>

		<Section title="Suggestor without keys navigation" description="useKeys prop.">
			<SSuggestor list={SUGGESTIONS} placeholder="type a|b|c..." tooltip="no keys navigation"
			onChange={handleSSuggestorChange} style={STYLE_WIDTH} useKeys={false} />
		</Section>

		<Section title="Suggestor without icons" description="arrow and x props.">
			<SSuggestor list={SUGGESTIONS} placeholder="type a|b|c..." tooltip="no arrow and no x"
			onChange={handleSSuggestorChange} style={STYLE_WIDTH} arrow={false} x={false} />
		</Section>

		<Section title="Suggestor start suggestions on two characters" description="suggestOn prop.">
			<SSuggestor list={SUGGESTIONS} placeholder="type a|b|c..." tooltip="display suggestions on 2nd char."
			onChange={handleSSuggestorChange} style={STYLE_WIDTH} suggestOn={2} />
		</Section>

		<Section title="Suggestor without click support" description="openOnClick prop.">
			<SSuggestor list={SUGGESTIONS} placeholder="type a|b|c..." tooltip="type something (or use navigation keys) to display suggestions"
			onChange={handleSSuggestorChange} style={STYLE_WIDTH} openOnClick={false} />
		</Section>

		<Section title="Suggestor with 2K suggestions" description="Long suggestion list... (using keys, waiting until 2nd char for suggestions)">
			<SSuggestor list={BIG_DATA} placeholder="enter two digits..." tooltip="numbers between 0 and 2000. (no arrow, no x, no keys)" 
				useKeys={true} suggestOn={2} openOnClick={false} arrow={false} x={false}
				style={STYLE_WIDTH} onChange={handleSSuggestorChange} />
		</Section>

		<Section title="Suggestor without clickout support" description="This one doesn`t close on click outside component.">
			<Suggestor list={SUGGESTIONS} placeholder="type a|b|c..." tooltip="only support clicks on component" 
				style={STYLE_WIDTH} onChange={handleSSuggestorChange} />
		</Section>
	</div>
);

export default Example;