import React from 'react';
import Example from '../example/Example';
import styles from './app.scss';

const App = () => (
	<React.Fragment>
		<header className={styles.header}>
			<div className={styles.title}>
				<h1>{'<ssuggestor>'}</h1>
				<h2>React Simple Suggestor</h2>
			</div>
			<a
				className={styles.link}
				href="https://github.com/carloluis/ssuggestor"
				target="_blank"
				rel="noopener noreferrer"
			>
				Code and Docs on GitHub
			</a>
		</header>
		<section className={styles.container}>
			<Example />
		</section>
		<footer className={styles.footer}>
			<span>
				MIT &copy;{' '}
				<a href="https://twitter.com/carloluis_" target="_blank" rel="noopener noreferrer">
					Carloluis
				</a>{' '}
				2017
			</span>
		</footer>
	</React.Fragment>
);

export default App;
