import React from 'react';
import SSuggestor, { Suggestor } from './suggestor/Suggestor';

const SUGGESTIONS = ['a', 'aa', 'aaa', 'aaaa', 'aaaaa', 'ab', 'aab', 'aaab', 'AC', 'ac', 'aAC', 'aaaC', 'aaaac', 'aáa'];
const TWOK_SUGGS = [];
for (var i = 0; i < 2000; i++) {
	TWOK_SUGGS.push(''+i);
}

const STYLE = {width:200};

const Sep = ({ top=100 }) => <div style={{paddingTop:top}} />;
Sep.propTypes = {
	top: React.PropTypes.number
};

const Example = () => (
	<div style={{padding:20, margin:'auto', maxWidth:700}}>
		<h1><strong>SSuggestor</strong> - React Simple Suggestor</h1>
		<pre>
			{
`import SSuggestor from 'SSuggestor';

// ...

<SSuggestor value="of" list={['list', 'of', 'suggestions']} 
	onChange={value=>console.info(value)} 
	placeholder="type something..." 
	openOnClik={true}
	suggestOn={1}
	style={{width:400}} 
	arrow={true} 
	x={true}
	/>`
			}
		</pre>

		<Sep top={20} />
		<h4>Simple Suggestor (previuos code - clickout support)</h4>
		<SSuggestor value="of" list={['list', 'of', 'suggestions']} onChange={value=>console.info('SS1', value)} placeholder="type something..." style={{width:400}} />
		
		<Sep />
		<h4>Suggestor (with custom classname)</h4>
		<SSuggestor className="input-group suggestor" list={SUGGESTIONS} placeholder="type a|b|c..." onChange={value=>console.info('SS2', value)} x={false} />
		
		<Sep />
		<h4>Suggestor (no close on clickout)</h4>
		<Suggestor list={SUGGESTIONS} placeholder="suggestor..." style={STYLE} onChange={value=>console.info('SS4', value)} />
		<Sep />

		<h4>Suggest with two or more chars (2K suggestions)</h4>
		<SSuggestor list={TWOK_SUGGS} placeholder="type two digits..." style={STYLE} onChange={value=>console.info('SS3', value)} 
			suggestOn={2} openOnClick={false} arrow={false} x={false} />
		<Sep />
	</div>
);

export default Example;