import React from 'react';
import ReactDOM from 'react-dom';
import SSuggestor from './components/Suggestor';

ReactDOM.render(
	<div>
		<h1>SSuggestor</h1>
		<SSuggestor list={['uno', 'unos', 'caña', 'araña']} placeholder="type something..." style={{width:400}}/>
	</div>,
	document.getElementById('app')
);
