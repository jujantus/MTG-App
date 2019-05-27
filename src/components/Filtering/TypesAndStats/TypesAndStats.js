import React from 'react';
import Autocomplete from '../../Autocomplete/Autocomplete';
import '../../../../node_modules/mana-font/css/mana.min.css';
import * as types from '../../../utils/types.js';

class CardTypes extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}
	render() {
		return <div>{<Autocomplete suggestions={types.types} icons={types.icons} />}</div>;
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
