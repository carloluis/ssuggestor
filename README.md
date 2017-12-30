# ssuggestor

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/carloluis/ssuggestor/master/LICENSE)
[![GitHub release](https://img.shields.io/github/release/carloluis/ssuggestor.svg)](https://github.com/carloluis/ssuggestor/releases)
[![Travis branch](https://img.shields.io/travis/carloluis/ssuggestor/master.svg)](https://travis-ci.org/carloluis/ssuggestor)
[![Coverage Status](https://coveralls.io/repos/github/carloluis/ssuggestor/badge.svg)](https://coveralls.io/github/carloluis/ssuggestor)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/92e79d6c062f466d8f07744c543473c3)](https://www.codacy.com/app/carloluis/ssuggestor?utm_source=github.com&utm_medium=referral&utm_content=carloluis/ssuggestor&utm_campaign=badger)
[![npm](https://img.shields.io/npm/v/ssuggestor.svg)](https://www.npmjs.com/package/ssuggestor)
[![npm](https://img.shields.io/npm/dt/ssuggestor.svg)](https://npm-stat.com/charts.html?package=ssuggestor)
[![Package Quality](http://npm.packagequality.com/shield/ssuggestor.svg)](http://packagequality.com/#?package=ssuggestor)
[![PeerDependencies](https://img.shields.io/david/peer/carloluis/ssuggestor.svg)](https://david-dm.org/carloluis/ssuggestor?type=peer)
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
import Suggestor from 'ssuggestor';

render(
	<Suggestor 
		list={['suggestion-a', 'suggestion-b', 'suggestion-c', '...', 'suggestion-z']}
		placeholder="type anything to start..."
		onChange={console.log}
		styles={{width: 100}}
		arrow
		close
	/>,
	document.body
);

```

### browser

Include `react` dependencies and `ssuggestor` scripts:

```html
<script src="https://unpkg.com/react@16.2.0/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@16.2.0/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/prop-types@15.6.0/prop-types.min.js"></script>
<script src="https://unpkg.com/ssuggestor@0.1.1/dist/ssuggestor.min.js"></script>

<!-- bootstrap styles -->
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
```

## Description

This Simple Suggestor package exports a single React component as the default export:
It handles clicks outside of DOM component in order to close the suggestion list.
All pattern matches are highlighted.

Example:
- input pattern: `sugge`
- items on suggestion list: *autoSuggest*, *ssüggèstor* and *suggests*

Then,
- matches are case insensitive: _auto**Sugge**st_
- pattern test is performed removing accents: _s**süggè**stor_

#### Props:

Prop     | Type | Default | Description
:--------|:-----|:--------|:-----------
accents  | Boolean | `false`| whether to differentiate chars with accents or not
arrow    | Boolean | `true` | ▼ icon - open suggestion list
className| String | `input-group` | css classes for component's root element
close    | Boolean | `true` | ✖︎ icon - delete current value
list     | Array | -- | array of suggestions strings (_required_)
openOnClick | Boolean | `true` | whether suggestion list opens on click or not
onSelect | Function | `() => {}` | onSelect handler: `(current_value) => { }`
onChange | Function | `() => {}` | onChange handler: `(new_value) => { }`
onKey    | Function | `() => {}` | onKey handler: `(keyEvent) => { }`
placeholder | String | -- | input placeholder text
required | Boolean | `false` | wheater to set required prop on input element or not
selectOnTab | Boolean | `false` | whether suggestion is selected by hit `tab` key or not
style    | [Object](https://facebook.github.io/react/docs/dom-elements.html#style "react style object") | -- | inline styles for component's root element
suggestOn| Number | `1` | minimum length of search string to show suggestions
tooltip  | String | -- | input title text (simple tooltip)
value    | String | `''` | initial value
useKeys  | Boolean | `true` | whether to use keys (<kbd>Up</kbd>, <kbd>Down</kbd>, <kbd>Enter</kbd>, <kbd>Escape</kbd>, <kbd>Tab</kbd>) or not


#### Method

One public method for imperative action: `focus()`

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

Licensed under the MIT License, Copyright © 2017 [Carloluis](https://twitter.com/carloluis_)

See [LICENSE](./LICENSE) for more information.
