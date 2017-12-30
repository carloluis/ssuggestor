import React from 'react';
import PropTypes from 'prop-types';

const Section = ({ title, description = '', children }) => (
	<div style={{ padding: '10px 0' }}>
		<h4>{title}</h4>
		<div>{children}</div>
		{!!description && <p style={{ padding: '10px' }}>{description}</p>}
	</div>
);

Section.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string,
	children: PropTypes.node.isRequired
};

export default Section;
