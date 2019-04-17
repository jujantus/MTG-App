import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ManaCheckbox from './ManaCheckbox/ManaCheckbox2';

const styles = (theme) => ({
	root: {
		width: '100%',
		padding: '5px'
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular
	}
});

function SimpleExpansionPanel(props) {
	const { classes } = props;
	return (
		<div className={classes.root}>
			<ExpansionPanel>
				<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
					<Typography className={classes.heading}>Expansion Panel 1</Typography>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					<ManaCheckbox />
				</ExpansionPanelDetails>
			</ExpansionPanel>
		</div>
	);
}

SimpleExpansionPanel.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleExpansionPanel);
