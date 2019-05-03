import React from 'react';
import Autocomplete from '../../Autocomplete/Autocomplete';
import * as types from '../../../utils/types.js';

class CardTypes extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			availableTypes: {
				super: [],
				sub: []
			},
			selectedTypes: {
				super: [],
				sub: []
			}
		};
	}
	render() {
		return (
			<div>
				<Autocomplete suggestions={this.props.suggestions} />
			</div>
		);
	}
}

class CardStats extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			filterBy: [],
			criteria: {
				CMC: false,
				power: false,
				toughness: false,
				loyalty: false
			}
		};
	}
	render() {
		return <React.Fragment />;
	}
}

export { CardStats, CardTypes };
