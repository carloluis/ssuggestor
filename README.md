# SSuggestor

[![GitHub issues](https://img.shields.io/github/issues/carloluis/ssuggestor.svg)](https://github.com/carloluis/ssuggestor/issues)
[![GitHub forks](https://img.shields.io/github/forks/carloluis/ssuggestor.svg)](https://github.com/carloluis/ssuggestor/network)
[![npm](https://img.shields.io/npm/v/ssuggestor.svg)](https://www.npmjs.com/package/ssuggestor)
[![npm](https://img.shields.io/npm/dt/ssuggestor.svg)](https://npm-stat.com/charts.html?package=ssuggestor)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/carloluis/ssuggestor/master/LICENSE)

react-simple-suggestor (using bootstrap styles)

## Instalation
`npm install ssuggestor --save`

## Usage 

```javascript
import SSuggestor from 'ssuggestor';

//...

<SSuggestor 
	list={['list', 'of', 'suggestions']}
	onChange={value => console.log(value)}
	placeholder="type something..."
	styles={{width:100}}
	arrow={true}
	x={true}
	/>
```

## Description

SSuggestor (Simple Suggestor) exports two components:
* __SSuggestor__: `import SSuggestor from 'suggestor'`
	* default export handles clicks outside of DOM component
* __Suggestor__: `import { Suggestor } from 'ssuggestor'`

#### Props: 
- list ([strings] required)
  * note: searches on _suggestions list_ are casE insensitivE
- onChange (func)
  * callback to retrieve component's value (on every update)
- value (string)
  * initial value for suggestor (empty by default)
- className (string)
  * css classes to use in component's root element ('input-group' by default)
- style ([object](https://facebook.github.io/react/docs/dom-elements.html#style "react docs: style object"))
  * inline styles for component's root element
- placeholder (string)
  * suggestor's input placholder text
- tooltip (string)
  * suggestor's input title text
- openOnClick (bool)
  * indicates whether or not to open suggestion list on click (true by default)
- selectOnTab (bool)
  * select hovered suggestion when press `tab` key (false by default)
- useKeys (bool)
  * use navigation (up/down), select (enter) and delete (escape) keys (true by default)
- arrow (bool)
  * :small_red_triangle_down: icon (enabled by default)
- x (bool)
  * :x: icon (enabled by default)
  * deletes current value

###### Links
* [github](https://github.com/carloluis/ssuggestor "suggestpr@github")
* [npm](https://www.npmjs.com/package/ssuggestor "ssuggestor@npm")
