import React from 'react';
import Suggestor from '../../../../src';
import '../../../../src/styles/index.scss';
import { bootstrap3 as classSchema } from '../../../../src/themes';

const valueSelected = (value, item) => console.info('select: %s -> %o', value, item);

const valueChanged = value => console.info('change value to:', value);

const SuggestorWrapper = props => (
	<Suggestor
		classSchema={classSchema}
		onChange={valueChanged}
		onSelect={valueSelected}
		placeholder="..."
		style={{ width: '100%' }}
		{...props}
	/>
);

export default SuggestorWrapper;
