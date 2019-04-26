import React from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';

function renderInputComponent(inputProps) {
	const { classes, inputRef = () => {}, ref, ...other } = inputProps;

	return (
		<TextField
			fullWidth
			InputProps={{
				inputRef: (node) => {
					ref(node);
					inputRef(node);
				},
				classes: {
					input: classes.input
				}
			}}
			{...other}
		/>
	);
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
	const matches = match(suggestion, query);
	const parts = parse(suggestion, matches);

	return (
		<MenuItem selected={isHighlighted} component="div">
			<div>
				{parts.map(
					(part, index) =>
						part.highlight ? (
							<span key={String(index)} style={{ fontWeight: 500 }}>
								{part.text}
							</span>
						) : (
							<strong key={String(index)} style={{ fontWeight: 300 }}>
								{part.text}
							</strong>
						)
				)}
			</div>
		</MenuItem>
	);
}

function getSuggestions(value) {
	const inputValue = deburr(value.trim()).toLowerCase();
	const inputLength = inputValue.length;

	return inputLength >= 2 ? [] : this.autoComplete(value).then((res) => res.data.data);
}

function getSuggestionValue(suggestion) {
	return suggestion;
}

const styles = (theme) => ({
	root: {
		height: 250,
		flexGrow: 1
	},
	container: {
		position: 'relative'
	},
	suggestionsContainerOpen: {
		position: 'absolute',
		zIndex: 1,
		marginTop: theme.spacing.unit,
		left: 0,
		right: 0
	},
	suggestion: {
		display: 'block'
	},
	suggestionsList: {
		margin: 0,
		padding: 0,
		listStyleType: 'none'
	},
	divider: {
		height: theme.spacing.unit * 2
	}
});

class IntegrationAutosuggest extends React.Component {
	state = {
		searchValue: '',
		suggestions: []
	};

	componentDidMount() {
		this.autoComplete(this.state.searchValue)
			.then((res) => {
				console.log(res.data.data);
				this.setState({ suggestions: res.data.data });
			})
			.catch((err) => console.error(err));
	}

	handleSuggestionsFetchRequested = ({ value }) => {
		this.setState({
			suggestions: getSuggestions(value)
		});
	};

	handleSuggestionsClearRequested = () => {
		this.setState({
			suggestions: []
		});
	};

	handleChange = (e) => {
		this.setState({
			searchValue: e.target.value
		});
	};

	autoComplete = (q) => {
		return axios.get('https://api.scryfall.com/cards/autocomplete', {
			params: {
				q: q
			}
		});
	};

	render() {
		const { classes } = this.props;

		const autosuggestProps = {
			renderInputComponent,
			suggestions: this.state.suggestions,
			onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
			onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
			getSuggestionValue,
			renderSuggestion
		};

		return (
			<div className={classes.root}>
				<Autosuggest
					{...autosuggestProps}
					inputProps={{
						classes,
						placeholder: 'Search a country (start with a)',
						value: this.state.searchValue,
						onChange: this.handleChange
					}}
					theme={{
						container: classes.container,
						suggestionsContainerOpen: classes.suggestionsContainerOpen,
						suggestionsList: classes.suggestionsList,
						suggestion: classes.suggestion
					}}
					renderSuggestionsContainer={(options) => (
						<Paper {...options.containerProps} square>
							{options.children}
						</Paper>
					)}
				/>
				<div className={classes.divider} />
			</div>
		);
	}
}

IntegrationAutosuggest.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(IntegrationAutosuggest);
