import React from 'react';
import PropTypes from 'prop-types';
import styles from './section.css';

const Section = ({ title, description = '', children }) => (
	<div className={styles.container}>
		<h4>{title}</h4>
		<div>{children}</div>
		{!!description && <p>{description}</p>}
	</div>
);

Section.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string,
	children: PropTypes.node.isRequired
};

export default Section;
