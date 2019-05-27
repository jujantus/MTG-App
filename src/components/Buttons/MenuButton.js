import React from 'react';
import classes from './MenuButton.module.css';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';

export default class MenuButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			clicked: false
		};
	}

	click = () => {
		this.setState({
			clicked: !this.state.clicked
		});
		if (this.props.onClick()) {
			this.props.onClick();
		}
	};

	render() {
		return (
			<IconButton color={this.props.color} aria-label={this.props.ariaLabel} onClick={this.click}>
				<div
					className={classNames(classes.animatedIcon, classes.menuArrowL, {
						[classes.anim]: this.state.clicked
					})}
				>
					<div className={classes.ani} />
				</div>
			</IconButton>
		);
	}
}
