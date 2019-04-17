import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Black from '../../../assets/Mana_B.png';
import Blue from '../../../assets/Mana_U.png';
import Red from '../../../assets/Mana_R.png';
import White from '../../../assets/Mana_W.png';
import Green from '../../../assets/Mana_G.png';
import BlackU from '../../../assets/Mana_B_unchecked.png';
import BlueU from '../../../assets/Mana_U_unchecked.png';
import RedU from '../../../assets/Mana_R_unchecked.png';
import WhiteU from '../../../assets/Mana_W_unchecked.png';
import GreenU from '../../../assets/Mana_G_unchecked.png';

class ManaCheckbox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			icons: [],
			iconSize: 40,
			iconPadding: 5,
			width: 250,
			height: 250
		};
		this.state.icons.push({ name: 'W', state: false, srcOn: White, srcOff: WhiteU });
		this.state.icons.push({ name: 'U', state: false, srcOn: Blue, srcOff: BlueU });
		this.state.icons.push({ name: 'B', state: false, srcOn: Black, srcOff: BlackU });
		this.state.icons.push({ name: 'R', state: false, srcOn: Red, srcOff: RedU });
		this.state.icons.push({ name: 'G', state: false, srcOn: Green, srcOff: GreenU });
	}

	handleChange = (index) => {
		let icons = [ ...this.state.icons ];
		let newIcon = { ...icons[index] };
		newIcon.state = !newIcon.state;
		icons[index] = newIcon;

		this.setState({ icons });
	};

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
						<Checkbox
							style={{
								position: 'absolute',
								top: y + 'px',
								left: x + 'px',
								padding: this.state.iconPadding + 'px'
							}}
							checkedIcon={
								<img src={icon.srcOn} alt="checked" height={this.state.iconSize} objectFit="contain" />
							}
							icon={
								<img
									src={icon.srcOff}
									alt="unchecked"
									height={this.state.iconSize}
									objectFit="contain"
								/>
							}
							checked={this.state.checkedW}
							onChange={() => this.handleChange(index)}
						/>
					);
				})}
			</div>
		);
	}
}

export default ManaCheckbox;
