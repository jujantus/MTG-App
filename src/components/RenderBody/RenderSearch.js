import React from 'react';
import CardGrid from '../../components/CardGrid/CardGrid';
import Spinner from '../Spinner/Spinner';
import NotFound from '../../components/NotFound/notFound';
import eventsHub from '../../utils/eventsHub';
import webService from '../../utils/webService';
import FilterIcon from '@material-ui/icons/FilterList';
import Fab from '@material-ui/core/Fab';
import ManaCheckbox from '../Filtering/ManaCheckbox/ManaCheckbox';
import LineGridList from '../LineGridList';
import Collapse from '@material-ui/core/Collapse';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
	root: {
		position: 'relative'
	},
	spinner: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)'
	}
});

class RenderSearch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cardList: null,
			loading: false,
			error: false,
			filter: false
		};
	}

	onQuickSearchChanged = null;

	componentDidMount() {
		this.onQuickSearchChanged = eventsHub.onQuickSearchChanged().subscribe((value) => {
			if (value) {
				webService
					.quickSearch(value)
					.then((res) => {
						console.log(res);
						this.setState({ loading: true, error: false }, this.waitForImages(res));
					})
					.catch((err) => {
						console.error(err);
						this.setState({
							loading: false,
							error: true,
							qSearchCards: null
						});
					});
			}
		});
	}

	componentWillUnmount() {
		this.onQuickSearchChanged.unsubscribe();
		this.onQuickSearchChanged = null;
	}

	waitForImages = (res) => {
		this.setState({ cardList: { data: [] } });
		let count = res.data.data.length;
		res.data.data.forEach((card) => {
			let img = new Image();
			img.src = card.hasOwnProperty('image_uris') ? card.image_uris.normal : card.card_faces[0].image_uris.normal;
			img.onload = () => {
				console.log(card.name, count);
				count--;
				if (count === 0) {
					this.setState({ loading: false, cardList: res.data });
				}
			};
		});
	};

	toggleFilter = () => {
		let state = { ...this.state };
		state.filter = !state.filter;
		this.setState({ ...state });
	};

	renderFilter = () => {
		return (
			<React.Fragment>
				<Fab
					onClick={this.toggleFilter}
					style={{
						position: 'absolute',
						top: 78,
						right: 15,
						color: 'primary'
					}}
				>
					<FilterIcon />
				</Fab>

				<Collapse in={this.state.filter}>
					<LineGridList>{[ <ManaCheckbox key={'hola'} /> ]}</LineGridList>
				</Collapse>
			</React.Fragment>
		);
	};

	render() {
		const { classes } = this.props;
		return (
			<React.Fragment>
				{this.state.loading ? (
					<div className={classes.spinner}>
						<Spinner />
					</div>
				) : this.state.error ? (
					<NotFound />
				) : this.state.cardList ? (
					<React.Fragment>
						{this.renderFilter()}
						<CardGrid cards={this.state.cardList.data} />
					</React.Fragment>
				) : null}
			</React.Fragment>
		);
	}
}

RenderSearch.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RenderSearch);
