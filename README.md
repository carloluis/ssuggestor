# ssuggestor

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/carloluis/ssuggestor/master/LICENSE)
[![GitHub release](https://img.shields.io/github/release/carloluis/ssuggestor.svg)](https://github.com/carloluis/ssuggestor/releases)
[![Travis branch](https://img.shields.io/travis/carloluis/ssuggestor/master.svg)](https://travis-ci.org/carloluis/ssuggestor)
[![Coverage Status](https://coveralls.io/repos/github/carloluis/ssuggestor/badge.svg)](https://coveralls.io/github/carloluis/ssuggestor)
[![npm](https://img.shields.io/npm/v/ssuggestor.svg)](https://www.npmjs.com/package/ssuggestor)
[![npm](https://img.shields.io/npm/dt/ssuggestor.svg)](https://npm-stat.com/charts.html?package=ssuggestor)
[![Package Quality](http://npm.packagequality.com/shield/ssuggestor.svg)](http://packagequality.com/#?package=ssuggestor)

[![PeerDependencies](https://img.shields.io/david/peer/carloluis/ssuggestor.svg)](https://github.com/carloluis/ssuggestor/blob/master/package.json)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/carloluis/ssuggestor.svg?style=social)](https://twitter.com/intent/tweet?text=check%20out%20this%20simple%20suggestor%20component%20on&url=https%3A%2F%2Ft.co%2FpjuWm9EaCa&hashtags=react16,ssuggestor)


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

```js
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

Include `react` dependencies and `ssuggestor.js` scripts:

```html
<script src="https://unpkg.com/react@16.1.1/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@16.1.1/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/prop-types@15.6.0/prop-types.min.js"></script>
<script src="https://unpkg.com/ssuggestor@0.1.0/dist/ssuggestor.min.js"></script>

<!-- bootstrap styles -->
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
```

## Description

This Simple Suggestor package exports two named components, and one of them as the default export:

```js
import Ssuggestor, { SSuggestor, Suggestor } from 'ssuggestor'

console.info(Ssuggestor === SSuggestor); 
// true
```

__SSuggestor__ is also exported as default, and handles clicks outside of DOM component in order to close the suggestion list. __Suggestor__ don't.


Notes:


If the search term is `suggest` and items (*SSuggestor*, *ssuggestion*, *sSUGGESTor*, *ssúggèstor*) were part of the suggestion list, then:

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

Just one public method: `focus()`:

```js
instance.focus(); // focuses the control input
```

#### Bootstrap

Ssuggestor uses some bootstrap classes:

* `input-group`
* `form-control`
* `dropdown-menu`
* `glyphicon` (`*-triangle-bottom`, `*-remove`)

## Development

In order to run this project locally clone this repo, restore dependencies and execute `dev` task:

```bash
git clone https://github.com/carloluis/ssuggestor.git
cd ssuggestor
yarn
yarn dev
```

Open browser on [localhost:9000](http://localhost:9000/)

## License

Licensed under the MIT License, Copyright © 2017 [Carloluis](https://twitter.com/carloluis_).

See [LICENSE](./LICENSE) for more information.
