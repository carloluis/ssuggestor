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

> React component that enables users to quickly find and select from a pre-populated list of values as they type.
> Current themes provided use [Bootstrap](http://getbootstrap.com/) and custom styles.

## Demo

Live Demo: [carloluis.github.io/ssuggestor](https://carloluis.github.io/ssuggestor/)

## Instalation

```bash
# using yarn
yarn add ssuggestor

# using npm
npm i ssuggestor
```

## Usage

Include `react` dependencies and `ssuggestor` script. Also include `ssuggestor` styles and theme if required.

### npm

```jsx
import React from 'react';
import { render } from 'react-dom';
import 'ssuggestor/dist/styles.css';
import b3Theme from 'ssuggestor/dist/bootstrap-3.json';
import Suggestor from 'ssuggestor';

render(
    <Suggestor
        list={['suggestion-a', 'suggestion-b', 'suggestion-c', '...', 'suggestion-z']}
        theme={b3Theme}
        onChange={value => {}}
        onSelect={(value, suggestion) => {}}
        placeholder="placeholder text..."
    />,
    document.querySelector('#app')
);
```

### browser

```html
<!-- scripts: react, react-dom, ssuggestor -->
<script src="https://unpkg.com/react@16.4.0/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@16.4.0/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/ssuggestor@1.0.0/dist/ssuggestor.min.js"></script>

<!-- styles: bootstrap, custom -->
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<link href="https://unpkg.com/ssuggestor@1.0.0/dist/styles.min.css">
```

Check suggestor example on [CodePen](http://codepen.io/carloluis/pen/rjpLYw/).

## Description

Simple Suggestor package provides a React component as default export.
Clicks outside of DOM component are tracked in order to close the suggestion list.
Pattern matches are highlighted in bold.

Example:

* input pattern: `sugge`
* items on suggestion list: _autoSuggest_, _ssüggèstor_ and _suggests_

Then,

* matches are case insensitive: _auto**Sugge**st_
* pattern test is performed removing accents: _s**süggè**stor_

### Suggestion Objects

The usage of suggestion objects requires a `selector` function to convert each object into string representation which will be displayed on the suggestion list.

### Props:

| Prop        | Type     | Default       | Description                                                 |
| :---------- | :------- | :------------ | :---------------------------------------------------------- |
| accents     | Boolean  | `false`       | whether to differentiate chars with accents or not          |
| arrow       | Boolean  | `true`        | ▼ icon - open suggestion list                               |
| theme       | Object   | `{}`          | JSON theme with css classes for each dom element            |
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

#### Supported Keys

<kbd>Up</kbd>, <kbd>Down</kbd>, <kbd>Enter</kbd>, <kbd>Escape</kbd> & <kbd>Tab</kbd>.

#### Theme

Provide `JSON` with classes for styling the component:

```json
{
    "root": "class(es) used on wrapper element",
    "input": "<input> element class(es)",
    "arrow": "open <span> indicator class(es)",
    "close": "remove <span> indicator class(es)",
    "list": "<ul> class(es)",
    "item": "<li> class(es)",
    "activeItem": "active <li> class(es)"
}
```

This package also provides a theme using custom classes from `styles.css` and others from Bootstrap.
- Custom class names start with the `ss-` prefix. Required to import `ssuggestor/dist/styles.css`
- Bootstrap classes: `input-group`, `form-group` and `dropdown-menu`.

<details>
<summary>Bootstrap 3 Theme</summary>

```json
{
    "root": "input-group ss-root",
    "input": "form-control ss-input",
    "arrow": "ss-arrow",
    "close": "ss-remove",
    "list": "dropdown-menu ss-list",
    "item": "",
    "activeItem": "ss-over-item"
}
```

Note that you need to import the _Bootstrap3_ theme from `ssuggestor/dist/bootstrap-3.json`

Check usage on [npm](#npm) section.

</details>

<details>
<summary>Bootstrap 4 Theme</summary>

```json
{
    "root": "input-group ss-root",
    "input": "form-control ss-input",
    "arrow": "ss-arrow",
    "close": "ss-remove",
    "list": "dropdown-menu ss-list",
    "item": "dropdown-item",
    "activeItem": "ss-over-item"
}
```

Note that you need to import the _Bootstrap4_ theme from `ssuggestor/dist/bootstrap-4.json`

Check usage on [npm](#npm) section.

</details>

### Focus

Use public method `focus` to set focus in `<input>` element.

```js
<suggestor-instance>.focus();
```

## Development

In order to run locally: first clone the [git repo](https://github.com/carloluis/ssuggestor.git), then restore dependencies and execute the `dev` task:

```bash
git clone https://github.com/carloluis/ssuggestor.git
cd ssuggestor
yarn
yarn dev
```

Open browser on [localhost:9000](http://localhost:9000/)

## License

MIT © [Carloluis](https://github.com/carloluis)
