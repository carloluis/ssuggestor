import React from 'react';
import PropTypes from 'prop-types';

const PADDING_STYLE = { padding: '10px 0' };

const Section = ({ title, description = '', children }) => (
	<div style={PADDING_STYLE}>
		<h4>
			{title}
		</h4>
		<div>
			{children}
		</div>
		{
			!!description &&
			<p style={PADDING_STYLE}>
				{description}
			</p>
		}
	</div>
);
Section.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string,
	children: PropTypes.node.isRequired
};

export default Section;
