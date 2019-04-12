import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import CardGrid from '../../components/CardGrid/CardGrid';
import Spinner from '../../components/Spinner/Spinner';
import axios from 'axios';

class Layout extends React.Component {
	state = {
		qSearchCards: null,
		loading: false
	};

	search = (card) => {
		this.setState({ loading: true });
		axios
			.get('/cards/search', {
				params: {
					q: card
				}
			})
			.then((res) => {
				this.setState({ qSearchCards: { data: [] } });

				let count = res.data.data.length;
				console.log(res.data.data);
				res.data.data.forEach((card) => {
					let img = new Image();
					img.src = card.image_uris.normal;
					img.onload = () => {
						console.log(card.name, count);
						count--;
						if (count === 0) {
							this.setState({ loading: false, qSearchCards: res.data });
						}
					};
				});
			});
	};

	renderSearch = () => {
		if (this.state.qSearchCards) {
			return <CardGrid cards={this.state.qSearchCards.data} />;
		}
	};

	render() {
		return (
			<React.Fragment>
				<Navbar search={this.search}>
					{this.state.loading ? <Spinner /> : null}
					{this.renderSearch()}
				</Navbar>
			</React.Fragment>
		);
	}
}

export default Layout;
