# SSuggestor

[![Travis branch](https://img.shields.io/travis/carloluis/ssuggestor/master.svg)](https://travis-ci.org/carloluis/ssuggestor)
[![GitHub issues](https://img.shields.io/github/issues/carloluis/ssuggestor.svg)](https://github.com/carloluis/ssuggestor/issues)
[![GitHub forks](https://img.shields.io/github/forks/carloluis/ssuggestor.svg)](https://github.com/carloluis/ssuggestor/network)
[![npm](https://img.shields.io/npm/v/ssuggestor.svg)](https://www.npmjs.com/package/ssuggestor)
[![npm](https://img.shields.io/npm/dt/ssuggestor.svg)](https://npm-stat.com/charts.html?package=ssuggestor)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/carloluis/ssuggestor/master/LICENSE)

react-simple-suggestor (using bootstrap styles)

## Demo

Live Demo: [carloluis.github.io/ssuggestor](https://carloluis.github.io/ssuggestor/)

See the Pen [ssuggestor-example](http://codepen.io/carloluis/pen/rjpLYw/) on [CodePen](http://codepen.io)

## Instalation

```javascript
npm install ssuggestor --save
```

## Usage 

### npm

```javascript
import React from 'react';
import { render } from 'react-dom';
import SSuggestor from 'ssuggestor';

render(
	<SSuggestor 
		list={['list', 'of', 'string', 'suggestions']}
		onChange={value => console.log(value)}
		placeholder="type something..."
		styles={{width:100}}
		arrow={true}
		close={true}
	/>,
	document.body
);

```

### browser

Include `react.js` dependency script and `ssuggestor.js` 

```html
<script src="https://unpkg.com/react@15.4.2/dist/react.min.js"></script>
<script src="https://unpkg.com/react-dom@15.4.2/dist/react-dom.min.js"></script>
<script src="https://unpkg.com/ssuggestor@0.0.22/dist/ssuggestor.min.js"></script>

<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
```

## Description

SSuggestor (Simple Suggestor) exports two components:
* __SSuggestor__: `import { SSuggestor } from 'suggestor'`
	* default export handles clicks outside of DOM component: 
  * `import SSuggestor from 'ssuggestor'`
* __Suggestor__: `import { Suggestor } from 'ssuggestor'`

note: _**ssuggest**or_ highlights search pattern on **suggest**ions list.

#### Props:

Property | Type | Default | Description
:--------|:-----|:--------|:-----------
list     | array | -- | array of string suggestions (required)
onSelect | func | `_ => _` | onSelect handler: `(current_value) => { }`
onChange | func | `_ => _` | onChange handler: `(new_value) => { }`
onKey	 | func | `_ => _` | onKey handler: `(keyEvent) => { }`
value    | string | `''` | initial value
className| string | `input-group` | css classes for component's root element
style    | [object](https://facebook.github.io/react/docs/dom-elements.html#style "react style object") | undefined | inline styles for component's root element
placeholder | string | `''` | input placeholder text
tooltip  | string | `''` | input title text (simple tooltip)
suggestOn| number | `1` | minimum length of search string to show suggestions
openOnClick | bool | `true` | whether suggestion list opens on click or not
selectOnTab | bool | `false` | whether suggestion is selected by hit `tab` key or not
selectOnBlur | bool | `false` | whether suggestion is selected when on blur event fires or not
useKeys  | bool | `true` | whether to use keys (`up`/`down`, `enter`, `escape`) or not
arrow    | bool | `true` | :small_red_triangle_down: icon
close    | bool | `true` | :x: icon - deletes current value


#### Methods

Only has a public method: `focus()`. It focuses the control input element.
```javascript
instance.focus();
```

#### Bootstrap

SSuggestor uses some bootstrap classes: 

`input-group`, `form-control`, `dropdown-menu` and `glyphicon` (`glyphicon-triangle-bottom` & `glyphicon-remove`) 

## Development

In order to build locally: clone this repo, then run:
```javascript
npm install
npm run dev
```

Then open browser on [localhost:9000](http://localhost:9000/)

###### Links
* [ssuggestor github page](https://carloluis.github.io/ssuggestor/)
* [ssuggestor-example](http://codepen.io/carloluis/pen/rjpLYw/)
* [npm](https://www.npmjs.com/package/ssuggestor "ssuggestor@npm")
