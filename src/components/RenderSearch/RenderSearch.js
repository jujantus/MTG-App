import React from 'react';
import CardGrid from '../../components/CardGrid/CardGrid';
import Spinner from '../../components/Spinner/Spinner2';
import NotFound from '../../components/NotFound/notFound';
import eventsHub from '../../utils/eventsHub';
import webService from '../../utils/webService';
import ExpansionPanelFilter from '../Filtering/ExpansionPanelFilter';

class RenderSearch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cardList: null,
			loading: false,
			error: false
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

	render() {
		return (
			<React.Fragment>
				{this.state.loading ? (
					<Spinner />
				) : this.state.error ? (
					<NotFound />
				) : this.state.cardList ? (
					<React.Fragment>
						<ExpansionPanelFilter />
						<CardGrid cards={this.state.cardList.data} />
					</React.Fragment>
				) : null}
			</React.Fragment>
		);
	}
}

export default RenderSearch;
