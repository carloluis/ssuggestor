import React from 'react';
import ReactDOM from 'react-dom';
import SSuggestor from './components/suggestor/Suggestor';

let suggestions = ['uno', 'unos', 'caña', 'araña', 'aa', 'ab', 'aab', 'aba'];

const Sep = ({top=20}) => <div style={{paddingTop:top}} />

ReactDOM.render(
	<div>
		<h1>SSuggestor</h1>
		<SSuggestor value="unos" list={suggestions} placeholder="type something..." style={{width:400}} onChange={value=>console.info(value)} />
		<Sep top={200} />
		<SSuggestor list={suggestions} placeholder="type something..." style={{width:400}} onChange={value=>console.info(value)} nox />
		<Sep top={200} />
	</div>,
	document.getElementById('app')
);
