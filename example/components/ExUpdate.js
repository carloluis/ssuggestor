import React from 'react';
import SSuggestor from '../../src/suggestor/Suggestor';
import Section from './Section';
import { countries, suggestions } from '../data/index';

const action_styles = {
	'display': 'flex',
	'justify-content': 'space-between'
};

const DEFAULT_VALUE = 'default';

class ExUpdate extends React.Component {
	constructor(props) {
		super(props);

		this.updateSuggestions = this.updateSuggestions.bind(this);
		this.updateValue = this.updateValue.bind(this);
		this.updateNone = this.updateNone.bind(this);

		this.state = {
			suggestions: countries,
			value: DEFAULT_VALUE
		};
	}

	// componentDidMount() {
	// 	this.timerId = setInterval(() => {
	// 		this.updateSuggestions();
	// 	}, 2000);
	// }

	// componentWillUnmount() {
	// 	clearInterval(this.timerId);
	// }

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
		this.forceUpdate();
	}

	render() {
		const { value, suggestions } = this.state;

		return (
			<div style={{ padding: '20px 0 200px' }}>
				<Section
					title="Suggestor Props"
					description="Updating values from PROPS  (value, suggestions list)"
				>
					<SSuggestor
						value={value}
						list={suggestions}
						onChange={console.info}
						placeholder="..."
						tooltip="type something.."
						style={{ width: '100%' }}
					/>
					<br />
					<div style={action_styles}>
						<button onClick={this.updateSuggestions}>Update suggestions...</button>
						<button onClick={this.updateValue}>Update value...</button>
						<button onClick={this.updateNone}>Update none...</button>
					</div>
				</Section>
			</div>
		);
	}
}

export default ExUpdate;
