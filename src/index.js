import React from 'react';
import ReactDOM from 'react-dom';
import SSuggestor, { Suggestor } from './components/suggestor/Suggestor';

let suggestions = ['uno', 'unos', 'caña', 'araña', 'aa', 'ab', 'aab', 'aba', 'AC', 'ac'];

const Sep = ({top=100}) => <div style={{paddingTop:top}} />;
Sep.propTypes = {
	top: React.PropTypes.number
};

ReactDOM.render(
	<div style={{padding:20}}>
		<h1>SSuggestor</h1>
		<pre>
			{ 
`<Suggestor value={defaultValue} list={suggestions} 
	onChange={value=>console.info(value)} 
	placeholder="type something..." 
	style={{width:400}} 
	arrow={true} 
	nox={false}
	/>`
			}
		</pre>

		<Sep top={20} />
		<h4>Simple Suggestor (clickout support)</h4>
		<SSuggestor value="unos" list={suggestions} onChange={value=>console.info(value)} placeholder="type something..." style={{width:400}} />
		<Sep />
		<SSuggestor list={suggestions} placeholder="suggestor 2..." style={{width:200}} onChange={value=>console.info(value)} nox className="input-group suggestor" />
		<Sep />
		<SSuggestor list={suggestions} placeholder="suggestor 3..." style={{width:200}} onChange={value=>console.info(value)} arrow={false} nox />
		<Sep />

		<h4>Suggestor (without clickout)</h4>
		<Suggestor list={suggestions} placeholder="suggestor 3..." style={{width:200}} onChange={value=>console.info(value)} nox />
		<Sep />
	</div>,
	document.getElementById('app')
);
