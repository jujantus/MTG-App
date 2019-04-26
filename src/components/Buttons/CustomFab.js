import React from 'react';
import Fab from '@material-ui/core/Fab';
// import { withStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
// import PropTypes from 'prop-types';
import classes from './CustomFab.module.css';

// const styles = (theme) => ({

// })

class CustomFab extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			clicked: false
		};
	}
	render() {
		return (
			<Fab
				style={this.props.style}
				className={classes.Button}
				size={this.props.size}
				variant={this.props.variant}
			>
				<SvgIcon
					className={[ classes.FirstIcon, classes.icon ]}
					children={this.props.defaultIcon}
					component={this.props.defaultIcon}
				/>
				<SvgIcon
					className={[ classes.SecondIcon, classes.icon ]}
					children={this.props.clickedIcon}
					component={this.props.clickedIcon}
				/>
			</Fab>
		);
	}
}

// CustomFab.propTypes = {
// 	classes: PropTypes.object.isRequired,
// 	theme: PropTypes.object.isRequired
// };

export default CustomFab;
