import React from 'react';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import ReactCardFlip from 'react-card-flip';

class CardItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isFlipped: false
		};
	}

	flip = (e) => {
		e.preventDefault();
		this.setState((prevState) => ({ isFlipped: !prevState.isFlipped }));
	};

	renderCard = () => {
		if (this.props.card.hasOwnProperty('image_uris')) {
			return (
				<img
					src={this.props.card.image_uris.normal}
					alt={this.props.card.name}
					className={this.props.classes.card}
				/>
			);
		} else if (this.props.card.hasOwnProperty('card_faces')) {
			return (
				<React.Fragment>
					<ReactCardFlip isFlipped={this.state.isFlipped}>
						<img
							key={'front'}
							src={this.props.card.card_faces[0].image_uris.normal}
							alt={this.props.card.name}
							className={this.props.classes.card}
						/>
						<img
							key={'back'}
							src={this.props.card.card_faces[1].image_uris.normal}
							alt={this.props.card.name}
							className={this.props.classes.card}
						/>
					</ReactCardFlip>
					<button onClick={this.flip}>FLIP</button>
				</React.Fragment>
			);
		}
	};

	render() {
		return (
			<Grow in style={{ transformOrigin: '0 0 0' }} timeout={this.props.timeout}>
				<Grid item>{this.renderCard()}</Grid>
			</Grow>
		);
	}
}

export default CardItem;
