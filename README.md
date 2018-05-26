# ssuggestor

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![GitHub release](https://img.shields.io/github/release/carloluis/ssuggestor.svg)](https://github.com/carloluis/ssuggestor/releases)
[![Travis branch](https://img.shields.io/travis/carloluis/ssuggestor/master.svg)](https://travis-ci.org/carloluis/ssuggestor)
[![Coverage Status](https://coveralls.io/repos/github/carloluis/ssuggestor/badge.svg)](https://coveralls.io/github/carloluis/ssuggestor)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/92e79d6c062f466d8f07744c543473c3)](https://www.codacy.com/app/carloluis/ssuggestor?utm_source=github.com&utm_medium=referral&utm_content=carloluis/ssuggestor&utm_campaign=badger)
[![npm](https://img.shields.io/npm/v/ssuggestor.svg)](https://www.npmjs.com/package/ssuggestor)
[![npm](https://img.shields.io/npm/dt/ssuggestor.svg)](https://npm-stat.com/charts.html?package=ssuggestor)
[![Package Quality](http://npm.packagequality.com/shield/ssuggestor.svg)](http://packagequality.com/#?package=ssuggestor)
[![PeerDependencies](https://img.shields.io/david/peer/carloluis/ssuggestor.svg)](https://david-dm.org/carloluis/ssuggestor?type=peer)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat)](https://github.com/prettier/prettier)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/carloluis/ssuggestor.svg?style=social)](https://twitter.com/intent/tweet?text=check%20out%20this%20simple%20suggestor%20component%20on&url=https%3A%2F%2Ft.co%2FpjuWm9EaCa&hashtags=react16,ssuggestor)

React component that enables users to quickly find and select from a pre-populated list of values as they type.
Currently uses [Bootstrap](http://getbootstrap.com/) styles.

## Demo

Live Demo: [carloluis.github.io/ssuggestor](https://carloluis.github.io/ssuggestor/)

CodePen example: [ssuggestor-example](http://codepen.io/carloluis/pen/rjpLYw/) on [CodePen](http://codepen.io)

## Instalation

```bash
# using yarn
yarn add ssuggestor

# using npm
npm i ssuggestor
```

## Usage

### npm

```jsx
import React from 'react';
import { render } from 'react-dom';
import 'ssuggestor/dist/styles.css';
import b3Schema from 'ssuggestor/dist/bootstrap-3.json';
import Suggestor from 'ssuggestor';

render(
    <Suggestor
        list={['suggestion-a', 'suggestion-b', 'suggestion-c', '...', 'suggestion-z']}
        classSchema={b3Schema}
        onChange={value => {}}
        onSelect={(value, suggestion) => {}}
        placeholder="placeholder text..."
        styles={{ width: 100 }}
    />,
    document.querySelector('#app')
);
```

### browser

Include `react` dependencies and `ssuggestor` scripts:

```html
<script src="https://unpkg.com/react@16.3.0/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@16.3.0/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/ssuggestor@0.9.0/dist/ssuggestor.min.js"></script>

<!-- bootstrap styles -->
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
```

## Description

This Simple Suggestor package provides a React component as default export:
It handles clicks outside of DOM component in order to close the suggestion list.
All pattern matches are highlighted.

Example:

* input pattern: `sugge`
* items on suggestion list: _autoSuggest_, _ssüggèstor_ and _suggests_

Then,

* matches are case insensitive: _auto**Sugge**st_
* pattern test is performed removing accents: _s**süggè**stor_

### Suggestion Objects

Suggestion objects use requires a `selector` function to convert each object into string representation which will be displayed on the suggestion list.

#### Props:

| Prop        | Type     | Default       | Description                                                 |
| :---------- | :------- | :------------ | :---------------------------------------------------------- |
| accents     | Boolean  | `false`       | whether to differentiate chars with accents or not          |
| arrow       | Boolean  | `true`        | ▼ icon - open suggestion list                               |
| classSchema | Object   | `{}`          | JSON theme with css classes for each dom element            |
| close       | Boolean  | `true`        | ✖︎ icon - delete current value                               |
| list        | Array    | --            | suggestions (_required_)                                    |
| selector    | Function | `s => s`      | suggestions selector (must return a string)                 |
| openOnClick | Boolean  | `true`        | whether suggestion list opens on click or not               |
| onSelect    | Function | `() => {}`    | onSelect handler: `(value, suggestion) => { }`              |
| onChange    | Function | `() => {}`    | onChange handler: `(value) => { }`                          |
| onKey       | Function | `() => {}`    | onKey handler: `(keyEvent) => { }`                          |
| placeholder | String   | --            | input placeholder text                                      |
| required    | Boolean  | `false`       | if `true`, set required attribute on `<input>` element      |
| selectOnTab | Boolean  | `false`       | if `true`, enables <kbd>Tab</kbd> key to select ssuggestion |
| style       | Object   | --            | inline styles for component's root element                  |
| suggestOn   | Number   | `1`           | minimum size of search string to show suggestions           |
| tooltip     | String   | --            | input title text (simple tooltip)                           |
| value       | String   | `''`          | initial value                                               |
| useKeys     | Boolean  | `true`        | whether to use [supported keys](#supported-keys) or not     |

##### Supported Keys

<kbd>Up</kbd>, <kbd>Down</kbd>, <kbd>Enter</kbd>, <kbd>Escape</kbd> & <kbd>Tab</kbd>.

##### Class Schema

Provide classes for styling as `JSON`:

```json
{
	"root": "class(es) used on wrapper element",
	"input": "<input> element class(es)",
	"arrow": "open <span> indicator class(es)",
	"close": "remove <span> indicator",
	"list": "<ul> class(es)",
	"item": "<li> class(es)",
	"activeItem": "active <li> class(es)"
}
```

#### Focus

Use public method `focus` to set focus in `<input>` element.

```js
<suggestor-instance>.focus();
```

#### Bootstrap

Provided theme for Bootstrap 3 use the following classes:

* `input-group`
* `form-control`
* `dropdown-menu`
* `glyphicon`
    * `glyphicon-triangle-bottom`
    * `glyphicon-remove`

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

MIT © [Carloluis](https://github.com/carloluis)
