import React from 'react';
import ReactDOM from 'react-dom';
import SSuggestor from './components/suggestor/Suggestor';

let suggestions = ['uno', 'unos', 'caña', 'araña', 'aa', 'ab', 'aab', 'aba'];

const Sep = ({top=200}) => <div style={{paddingTop:top}} />;
Sep.propTypes = {
	top: React.PropTypes.number
};

ReactDOM.render(
	<div style={{padding:20}}>
		<h1>SSuggestor</h1>
		<pre>
			{ `<Suggestor value="" list={suggestions} onChange={value=>console.info(value)} placeholder="type something..." style={{width:400}} arrow={true} nox={false} />` }
		</pre>

		<Sep top={20} />
		<h4>Simple Suggestor</h4>
		<SSuggestor value="unos" list={suggestions} onChange={value=>console.info(value)} placeholder="type something..." style={{width:400}} />
		<Sep />
		<SSuggestor list={suggestions} placeholder="suggestor 2..." style={{width:400}} onChange={value=>console.info(value)} nox />
		<Sep />
		<SSuggestor list={suggestions} placeholder="suggestor 3..." style={{width:400}} onChange={value=>console.info(value)} arrow={false} nox />
		<Sep />
	</div>,
	document.getElementById('app')
);
