import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import classNames from 'classnames';
// import InputBase from '@material-ui/core/InputBase';
import '../../../node_modules/mana-font/css/mana.min.css';
import { withStyles } from '@material-ui/core/styles';
import webService from '../../utils/webService';

function getSuggestionValue(suggestion) {
	return suggestion;
}

const styles = (theme) => ({
	root: {
		color: 'inherit',
		width: '100%',
		display: 'flex'
	},
	input: {
		paddingTop: theme.spacing.unit,
		paddingRight: theme.spacing.unit,
		paddingBottom: theme.spacing.unit,
		paddingLeft: theme.spacing.unit * 10,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: 200
		}
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
	constructor(props) {
		super(props);
		this.state = {
			single: '',
			suggestions: []
		};
	}

	handleKeyPress = (e) => {
		if (this.props.onKeyPress) {
			this.props.onKeyPress(e);
		}
	};

	renderInputComponent = (inputProps) => {
		const { classes, inputRef = () => {}, ref, ...other } = inputProps;

		return (
			// <InputBase
			// 	InputProps={{
			// 		inputRef: (node) => {
			// 			ref(node);
			// 			inputRef(node);
			// 		},
			// 		classes: {
			// 			input: classes.input,
			// 			root: classes.root
			// 		}
			// 	}}
			// 	{...other}
			// 	onKeyPress={this.handleKeyPress}
			// />

			<TextField
				fullWidth
				onKeyPress={(e) => {
					if (this.props.onKeyPress) {
						this.props.onKeyPress(e);
					}
				}}
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
	};
	renderSuggestion = (suggestion, { query, isHighlighted }) => {
		const matches = match(suggestion, query);
		const parts = parse(suggestion, matches);

		return (
			<MenuItem selected={isHighlighted} component="div">
				{this.props.icons && this.props.icons.hasOwnProperty(suggestion) ? (
					<React.Fragment>
						<i className={classNames('ms', this.props.icons[suggestion])} />
					</React.Fragment>
				) : null}
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
	};

	getSuggestions = (value) => {
		const inputValue = value.trim().toLowerCase();
		const inputLength = inputValue.length;
		let count = 0;

		return inputLength === 0
			? []
			: this.props.suggestions.filter((suggestion) => {
					const keep = count < 5 && suggestion.slice(0, inputLength).toLowerCase() === inputValue;

					if (keep) {
						count += 1;
					}

					return keep;
				});
	};

	handleSuggestionsFetchRequested = ({ value }) => {
		if (this.props.quickSearch) {
			webService.autoComplete(value).then((res) => {
				let suggestions = res.data.data.slice(0, 10);
				this.setState({ suggestions });
			});
		} else {
			this.setState({
				suggestions: this.getSuggestions(value)
			});
		}
	};

	handleSuggestionsClearRequested = () => {
		this.setState({
			suggestions: []
		});
	};

	handleSuggestionSelected = (e, { suggestion }) => {
		if (this.props.onSuggestionSelected) {
			this.props.onSuggestionSelected(suggestion);
		}
	};

	handleChange = (name) => (event, { newValue }) => {
		this.setState({
			[name]: newValue
		});
	};

	render() {
		const { classes } = this.props;
		const placeholder = this.props.placeholder || 'Search...';

		const autosuggestProps = {
			renderInputComponent: this.renderInputComponent,
			suggestions: this.state.suggestions,
			onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
			onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
			onSuggestionSelected: this.handleSuggestionSelected,
			getSuggestionValue,
			renderSuggestion: this.renderSuggestion
		};

		return (
			<div className={classes.root}>
				<Autosuggest
					{...autosuggestProps}
					inputProps={{
						classes,
						placeholder: placeholder,
						value: this.state.single,
						onChange: this.handleChange('single')
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
