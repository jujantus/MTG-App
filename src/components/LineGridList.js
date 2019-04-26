import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';

const styles = (theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		// justifyContent: 'space-around',
		overflow: 'hidden',
		backgroundColor: theme.palette.background.paper
	},
	gridList: {
		flexWrap: 'nowrap',
		// Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
		transform: 'translateZ(0)'
	}
});

function SingleLineGridList(props) {
	const { classes } = props;

	return (
		<div className={classes.root}>
			<GridList cellHeight={'auto'} className={classes.gridList}>
				{props.children.map((component, index) => (
					//LINEA NEGRA FEA
					<li style={{ width: 'auto', borderRight: '0.1em solid black', padding: '0.5em' }} key={index}>
						{component}
					</li>
				))}
			</GridList>
		</div>
	);
}

SingleLineGridList.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SingleLineGridList);
