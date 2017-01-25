import React from 'react';
import ReactDOM from 'react-dom';
import SSuggestor from './components/suggestor/Suggestor';

let suggestions = ['uno', 'unos', 'caña', 'araña', 'aa', 'ab', 'aab', 'aba'];

ReactDOM.render(
	<div>
		<h1>SSuggestor</h1>
		<SSuggestor list={suggestions} placeholder="type something..." style={{width:400}} onChange={value=>console.info(value)} />
	</div>,
	document.getElementById('app')
);
