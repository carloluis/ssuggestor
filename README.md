# SSuggestor

react-simple-suggestor (using bootstrap styles)

## Instalation
`npm install ssuggestor --save`

## Usage 

```javascript
import SSuggestor from 'SSuggestor';

<SSuggestor 
	list={['list', 'of', 'suggestions']}
	placeholder="type something..."
	onChange={f=>f}
	styles={{width:100}}
	arrow={true}
	nox={false}
	/>
```

## Description

SSuggestor (Simple Suggestor) exports two components:
* __SSuggestor__: `import SSuggestor from 'suggestor'` (default export)
	* handles clicks outside of DOM component
* __Suggestor__: `import { Suggestor } from 'ssuggestor'`

note: suggestions are case insensitive

goto [npm](https://www.npmjs.com/package/ssuggestor "ssuggestor@npm")
