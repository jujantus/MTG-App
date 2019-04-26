import React from 'react';
import Grow from '@material-ui/core/Grow';
import Black from '../../assets/Mana_B.png';
import Blue from '../../assets/Mana_U.png';
import Red from '../../assets/Mana_R.png';
import White from '../../assets/Mana_W.png';
import Green from '../../assets/Mana_G.png';

class SimpleGrow extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			count: 0,
			iconSize: 70,
			iconPadding: 5,
			width: 500,
			height: 500,
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
		return (
			<div
				style={{
					height: this.state.height + 'px',
					width: this.state.width + 'px',
					position: 'relative'
				}}
			>
				{this.state.icons.map((icon, index) => {
					const a0 = -Math.PI / 2;
					const a = a0 + index * 2 * Math.PI / this.state.icons.length;
					const r = this.state.width / 2 - this.state.iconSize - this.state.iconPadding * 2;
					const dx = r * Math.cos(a);
					const dy = r * Math.sin(a);
					const x = this.state.width / 2 + dx - this.state.iconSize / 2 - this.state.iconPadding;
					const y = this.state.height / 2 + dy - this.state.iconSize / 2 - this.state.iconPadding;

					return (
						<Grow
							key={index}
							style={{
								position: 'absolute',
								top: y + 'px',
								left: x + 'px',
								padding: this.state.iconPadding + 'px',
								transformOrigin: '0 0 0'
							}}
							in={index === this.state.count}
							timeout={{ enter: 100, exit: 400 }}
						>
							<img
								src={icon}
								style={{ objectfit: 'contain' }}
								alt="spinner"
								height={this.state.iconSize}
								width={this.state.iconSize}
							/>
						</Grow>
					);
				})}
			</div>
		);
	}
}

export default SimpleGrow;
