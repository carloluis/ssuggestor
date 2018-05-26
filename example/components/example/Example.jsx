import React from 'react';
import Section from '../section/Section';
import SuggestorWrapper from '../wrapper';
import Update from '../update/Update';
import { countries, suggestions, numbers } from '../../data';
import styles from './example.scss';

const suggestionObjects = [{ x: 'One', y: 1 }, { x: 'Two', y: 2 }, { x: 'Three', y: 3 }, { x: 'Four', y: 4 }];
const selector = item => item.x;

/* eslint-disable max-len */

const Example = () => (
	<section className={styles.container}>
		<Section
			title="Using custom suggestion objects"
			description="When using objects as suggestions it's required to provide a selector property"
		>
			<SuggestorWrapper
				list={suggestionObjects}
				selector={selector}
				selectOnTab
				tooltip="using custom suggestions"
			/>
		</Section>

		<Section
			title="Select suggestion on <tab>"
			description="Select element hovered when hit the <tab> key. Prop selectOnTab is on."
		>
			<SuggestorWrapper list={countries} placeholder="Select a country..." tooltip="country names" selectOnTab />
		</Section>

		<Section
			title="Using custom styles"
			description="Use className and style props to change component appearance."
		>
			<SuggestorWrapper
				className="input-group suggestor"
				list={suggestions}
				placeholder="type a letter or number..."
			/>
		</Section>

		<Section
			title="Disabling keys navigation"
			description="You can only type or use mouse to view/navigate through suggestions."
		>
			<SuggestorWrapper
				list={countries}
				placeholder="type a country..."
				tooltip="no keys: type/scroll over list"
				useKeys={false}
			/>
		</Section>

		<Section title="Minimalistic" description="No arrow nor close icons.">
			<SuggestorWrapper
				list={countries}
				placeholder="what's your country?"
				tooltip="what's your country?"
				arrow={false}
				close={false}
			/>
		</Section>

		<Section
			title="Display suggestions with the second letter"
			description="Play with suggestOn and openOnClick properties."
		>
			<SuggestorWrapper
				list={countries}
				placeholder="countries..."
				tooltip="Type two letters to show up some completions"
				openOnClick={false}
				suggestOn={2}
			/>
		</Section>

		<Section
			title="Large suggestion list"
			description="Using a list with 2k numbers. Waiting until 2nd digit to display suggestions."
		>
			<SuggestorWrapper
				list={numbers}
				placeholder="enter two digits..."
				tooltip="numbers between 10 and 2010. (no icons, no keys, no click)"
				openOnClick={false}
				useKeys={false}
				suggestOn={2}
				arrow={false}
				close={false}
			/>
		</Section>

		<Update />
	</section>
);

/* eslint-enable max-len */

export default Example;
