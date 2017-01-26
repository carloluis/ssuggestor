# SSuggestor

react-simple-suggestor (using bootstrap styles)

## Instalation
`npm install ssuggestor --save`

## Usage 

```javascript
import SSuggestor from 'ssuggestor';

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

#### Props: 
- suggestions ([strings] required)
  * searches on suggestions are case insensitive 
- className (string)
  * css classes to use in component's root element ('input-group' by default)
- style
  * inline styles for component's root element
- value (string)
  * initial value for suggestor (empty by default)
- onChange (func)
  * callback to retrieve component's value
- placeholder (string)
  * suggestor's input placholder text
- arrow (bool)
  * input spin indicator (enabled by default)
- nox (bool)
  * input `X` indicator (disabled by default)

goto [npm](https://www.npmjs.com/package/ssuggestor "ssuggestor@npm")
