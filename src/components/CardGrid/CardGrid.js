import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import CardItem from '../CardItem/CardItem';

const styles = (theme) => ({
	root: {
		flexGrow: 1,
		marginTop: 0
	},
	card: {
		height: 400,
		objectFit: 'contain'
	}
});

class CardGrid extends React.Component {
	state = {
		spacing: '16'
	};

	render() {
		const { classes } = this.props;
		const { spacing } = this.state;

		return (
			<Grid container className={classes.root} justify="center" spacing={Number(spacing)}>
				{this.props.cards.map((card, index) => (
					<CardItem key={card.oracle_id} card={card} timeout={index * 100} classes={classes} />
				))}
			</Grid>
		);
	}
}

CardGrid.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CardGrid);
