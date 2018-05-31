import React from 'react';
import PropTypes from 'prop-types';
import Suggestor from '../../../src';
import '../../../src/styles/index.scss';
import { bootstrap3 as theme } from '../../../src/themes';

const valueSelected = (value, item) => console.info('select: %s -> %o', value, item);

const valueChanged = value => console.info('change value to:', value);

const SuggestorWrapper = props => (
	<Suggestor
		theme={theme}
		onChange={valueChanged}
		onSelect={valueSelected}
		placeholder="..."
		style={{ width: '100%' }}
		ref={props.ssRef}
		{...props}
	/>
);

SuggestorWrapper.propTypes = {
	ssRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
};

export default SuggestorWrapper;
