import React from 'react';
import classes from './MenuButton.module.css';
import classNames from 'classnames';
import MenuIcon from '@material-ui/icons/Menu';

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
			<button onClick={this.click}>
				<MenuIcon
					className={classNames(classes.animatedIcon, classes.menuArrowL, classes.ani, {
						[classes.anim]: this.state.clicked
					})}
				/>
			</button>
		);
	}
}
