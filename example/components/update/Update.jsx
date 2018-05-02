import React from 'react';
import Suggestor from '../../../src';
import Section from '../section/Section';
import { countries, suggestions } from '../../data';

const action_styles = {
	display: 'flex',
	justifyContent: 'space-between'
};

const DEFAULT_VALUE = 'default';

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
		if (this.timerId) {
			clearInterval(this.timerId);
			this.timerId = undefined;
		} else {
			this.timerId = setInterval(() => {
				this.updateSuggestions();
			}, 4000);
		}
	}

	componentWillUnmount() {
		clearInterval(this.timerId);
	}

	updateSuggestions() {
		this.setState({
			suggestions: this.state.suggestions.length === suggestions.length ? countries : suggestions
		});
	}

	updateValue() {
		this.setState({
			value: this.state.value === DEFAULT_VALUE ? 'albania' : DEFAULT_VALUE
		});
	}

	updateNone() {
		this.suggestor.current.focus();
		this.forceUpdate();
	}

	render() {
		const { value, suggestions } = this.state;

		return (
			<div style={{ padding: '10px 0 160px' }}>
				<Section title="Suggestor Props" description="Updating props (value, suggestions list)">
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
					<div style={action_styles}>
						<button onClick={this.updateSuggestions}>Update suggestions</button>
						<button onClick={this.updateValue}>Update value</button>
						<button onClick={this.updateNone}>Focus</button>
					</div>
					<br />
					<label title="auto update suggestions list">
						<input type="checkbox" onClick={this.autoUpdate} /> auto-update
					</label>
				</Section>
			</div>
		);
	}
}

export default Update;
