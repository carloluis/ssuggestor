# ssuggestor

[![Travis branch](https://img.shields.io/travis/carloluis/ssuggestor/master.svg)](https://travis-ci.org/carloluis/ssuggestor)
[![Coverage Status](https://coveralls.io/repos/github/carloluis/ssuggestor/badge.svg)](https://coveralls.io/github/carloluis/ssuggestor)
[![npm](https://img.shields.io/npm/dt/ssuggestor.svg)](https://npm-stat.com/charts.html?package=ssuggestor)
[![npm](https://img.shields.io/npm/v/ssuggestor.svg)](https://www.npmjs.com/package/ssuggestor)
[![GitHub forks](https://img.shields.io/github/forks/carloluis/ssuggestor.svg)](https://github.com/carloluis/ssuggestor/network)
[![GitHub stars](https://img.shields.io/github/stars/carloluis/ssuggestor.svg)](https://github.com/carloluis/ssuggestor/stargazers)
[![GitHub release](https://img.shields.io/github/release/carloluis/ssuggestor.svg)](https://github.com/carloluis/ssuggestor/releases)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/carloluis/ssuggestor/master/LICENSE)
[![Package Quality](http://npm.packagequality.com/shield/ssuggestor.svg)](http://packagequality.com/#?package=ssuggestor)
[![](https://img.shields.io/github/issues-pr-closed-raw/carloluis/ssuggestor.svg)](https://github.com/carloluis/ssuggestor/issues?q=is%3Apr+is%3Aclosed)
[![GitHub contributors](https://img.shields.io/github/contributors/carloluis/ssuggestor.svg)](https://github.com/carloluis/ssuggestor/graphs/contributors)
[![PeerDependencies](https://img.shields.io/david/peer/carloluis/ssuggestor.svg)](https://github.com/carloluis/ssuggestor/blob/master/package.json)
[![DevDependencies](https://img.shields.io/david/dev/carloluis/ssuggestor.svg)](https://github.com/carloluis/ssuggestor/blob/master/package.json)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/carloluis/ssuggestor.svg?style=social)](https://twitter.com/intent/tweet?text=ssuggestor%20%23react%20component%20on&url=https%3A%2F%2Ft.co%2FpjuWm9EaCa)


`<SSuggestor />` is a React component that enables users to quickly find and select from a pre-populated list of values as they type. It uses [Bootstrap](http://getbootstrap.com/) styles.

## Demo

Live Demo: [carloluis.github.io/ssuggestor](https://carloluis.github.io/ssuggestor/)

CodePen example: [ssuggestor-example](http://codepen.io/carloluis/pen/rjpLYw/) on [CodePen](http://codepen.io)

## Instalation

```bash
npm install ssuggestor --save
```

You can also use `yarn`:

```bash
yarn add ssuggestor
```

## Usage 

### npm

```javascript
import React from 'react';
import { render } from 'react-dom';
import SSuggestor from 'ssuggestor';

render(
	<SSuggestor 
		list={['suggestion-a', 'suggestion-b', 'suggestion-c', '...', 'suggestion-z']}
		onChange={console.log}
		placeholder="type a-z..."
		styles={{width: 100}}
		arrow
		close
	/>,
	document.body
);

```

### browser

Include `react.js` dependency script and `ssuggestor.js` 

```html
<script src="https://unpkg.com/react@15.6.1/dist/react.min.js"></script>
<script src="https://unpkg.com/react-dom@15.6.1/dist/react-dom.min.js"></script>
<script src="https://unpkg.com/ssuggestor@0.0.29/dist/ssuggestor.min.js"></script>

<!-- bootstrap styles -->
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
```

## Description

This Simple Suggestor package exports two named components, and one of them as the default export:

```javascript
import Ssuggestor, { SSuggestor, Suggestor } from 'ssuggestor'

console.info(Ssuggestor === SSuggestor); 
// true
```

__SSuggestor__ is also exported as default, and handles clicks outside of DOM component in order to close the suggestion list. __Suggestor__ don't.


Notes:

If the search term is `suggest`and following items were part from the suggestion list, then:

* S**Suggest**or highlights search pattern on **suggest**ion list
* search is case insensitive: **sSUGGEST**or match
* search also strip accents away: **ssúggèst**or match

#### Props:

Property | Type | Default | Description
:--------|:-----|:--------|:-----------
accents  | bool | `false`| whether to differentiate chars with accents or not
arrow    | bool | `true` | ▼ icon - open suggestion list
className| string | `input-group` | css classes for component's root element
close    | bool | `true` | ✖︎ icon - delete current value
list     | array | -- | array of suggestions strings (_required_)
openOnClick | bool | `true` | whether suggestion list opens on click or not
onSelect | func | `() => {}` | onSelect handler: `(current_value) => { }`
onChange | func | `() => {}` | onChange handler: `(new_value) => { }`
onKey    | func | `() => {}` | onKey handler: `(keyEvent) => { }`
placeholder | string | `''` | input placeholder text
required | bool | `false` | wheater to set required prop on input element or not
selectOnTab | bool | `false` | whether suggestion is selected by hit `tab` key or not
style    | [object](https://facebook.github.io/react/docs/dom-elements.html#style "react style object") | `undefined` | inline styles for component's root element
suggestOn| number | `1` | minimum length of search string to show suggestions
tooltip  | string | `''` | input title text (simple tooltip)
value    | string | `''` | initial value
useKeys  | bool | `true` | whether to use keys (`up`/`down`, `enter`, `escape`, `tab`) or not


#### Methods

One public method: `focus()`. It focuses the control input:

```javascript
instance.focus();
```

#### Bootstrap

SSuggestor uses some bootstrap classes: 

`input-group`, `form-control`, `dropdown-menu` and `glyphicon` (`glyphicon-triangle-bottom` & `glyphicon-remove`)

## Development

In order to build locally, first clone this repo and then run:

```bash
git clone https://github.com/carloluis/ssuggestor.git
cd ssuggestor
yarn && yarn dev
```

Finally open browser on [localhost:9000](http://localhost:9000/)

## License

Licensed under the MIT License, Copyright © 2017 [Carloluis](https://twitter.com/carloluis_).

See [LICENSE](./LICENSE) for more information.
