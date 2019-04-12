import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grow from '@material-ui/core/Grow';
import Black from '../../assets/Mana_B.png';
import Blue from '../../assets/Mana_U.png';
import Red from '../../assets/Mana_R.png';
import White from '../../assets/Mana_W.png';
import Green from '../../assets/Mana_G.png';

const styles = (theme) => ({
	root: {
		height: 100
	},
	container: {
		display: 'flex',
		justifyContent: 'space-around'
	},
	img: {
		height: 60,
		display: 'flex',
		objectFit: 'contain'
	}
});

class SimpleGrow extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			count: 0,
			icons: [ White, Blue, Black, Red, Green ]
		};
	}

	componentDidMount() {
		this.timer = setInterval(() => {
			this._nextIcon();
		}, 300);
	}

	componentWillUnmount() {
		clearInterval(this.timer);
	}

	_nextIcon() {
		let count = this.state.count;
		count++;
		if (count === this.state.icons.length) {
			count = 0;
		}
		this.setState({ count });
	}

	render() {
		const { classes } = this.props;

		return (
			<div className={classes.root}>
				<div className={classes.container}>
					{this.state.icons.map((icon, index) => {
						return (
							<Grow
								key={index}
								style={{ transformOrigin: '0 0 0' }}
								in={index === this.state.count}
								timeout={{ enter: 100, exit: 400 }}
							>
								<img className={classes.img} src={icon} alt="blanco" />
							</Grow>
						);
					})}
				</div>
			</div>
		);
	}
}

SimpleGrow.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleGrow);
