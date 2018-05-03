import React from 'react';
import Suggestor from '../../../src';
import Section from '../section/Section';
import { countries, suggestions } from '../../data';
import styles from './update.css';

class Update extends React.Component {
	constructor(props) {
		super(props);

		this.updateSuggestions = this.updateSuggestions.bind(this);
		this.updateValue = this.updateValue.bind(this);
		this.updateNone = this.updateNone.bind(this);
		this.autoUpdate = this.autoUpdate.bind(this);

		this.suggestor = React.createRef();

		this.state = {
			suggestions: countries,
			value: ''
		};
	}

	autoUpdate() {
		if (!this.timerId) {
			this.timerId = setInterval(this.updateSuggestions, 4000);
		} else {
			clearInterval(this.timerId);
			this.timerId = undefined;
		}
	}

	componentWillUnmount() {
		clearInterval(this.timerId);
	}

	updateSuggestions() {
		this.setState(state => ({
			suggestions: state.suggestions.length === suggestions.length ? countries : suggestions
		}));
	}

	updateValue() {
		this.setState(({ value }) => ({
			value: value === 'default' ? 'albania' : 'default'
		}));
	}

	updateNone() {
		this.suggestor.current.focus();
		this.forceUpdate();
	}

	render() {
		const { value, suggestions } = this.state;

		return (
			<div className={styles.container}>
				<Section title="Suggestor Props" description="Updating <Suggestor> Props">
					<Suggestor
						value={value}
						list={suggestions}
						onChange={console.info}
						placeholder="..."
						tooltip="Type Something"
						style={{ width: '100%' }}
						ref={this.suggestor}
					/>
					<br />
					<div className={styles.actions}>
						<button onClick={this.updateSuggestions}>Update suggestions</button>
						<button onClick={this.updateValue}>Update value</button>
						<button onClick={this.updateNone}>Focus</button>
					</div>
					<br />
					<label title="auto-update every 4s">
						<input type="checkbox" onClick={this.autoUpdate} /> auto-update the suggestions
					</label>
				</Section>
			</div>
		);
	}
}

export default Update;
