import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ManaCheckbox from '../src/components/Filtering/ManaCheckbox/ManaCheckbox';

const styles = (theme) => ({
	root: {
		width: '100%',
		padding: '5px'
	},
	panel: {
		width: '200px'
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular
	}
});

function SimpleExpansionPanel(props) {
	const { classes } = props;
	return (
		<div className={classes.panel}>
			<ExpansionPanel>
				<ExpansionPanelSummary className={classes.panel} expandIcon={<ExpandMoreIcon />}>
					{/* <Typography className={classes.heading}>Expansion Panel 1</Typography> */}
				</ExpansionPanelSummary>
				<ExpansionPanelDetails className={classes.root}>
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
