import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
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
import '../../../../node_modules/mana-font/css/mana.min.css';

const styles = (theme) => ({
	root: {
		display: 'flex'
	},
	formControl: {
		margin: theme.spacing.unit * 2
	}
});

class ManaCheckbox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			icons: [],
			iconSize: 40,
			iconPadding: 5,
			width: 250,
			height: 250,
			filter: null
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

	handleCriteriaChange = (event) => {
		this.setState({ filter: event.target.value });
	};

	render() {
		const { classes } = this.props;
		const selectedColors = this.state.icons.filter((icon) => icon.state === true);
		const MANASYMBOL = {
			W: <i className="ms ms-w" />,
			U: <i className="ms ms-u" />,
			B: <i className="ms ms-b" />,
			R: <i className="ms ms-r" />,
			G: <i className="ms ms-g" />
		};
		const colors = [];
		selectedColors.forEach((color) => {
			colors.push(MANASYMBOL[color.name]);
		});
		const FILTERS =
			selectedColors.length > 0
				? selectedColors.length === 1
					? { soft: 'May include others', softStrict: 'No other colors' }
					: {
							soft: 'May include others',
							composed: 'Must include combination',
							softStrict: 'No other colors',
							composedStrict: 'Include exact combination'
						}
				: null;

		return (
			<div>
				<div
					style={{
						height: this.state.height + 'px',
						width: this.state.width + 'px',
						position: 'relative',
						float: 'left'
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
								key={index}
								style={{
									position: 'absolute',
									top: y + 'px',
									left: x + 'px',
									padding: this.state.iconPadding + 'px'
								}}
								checkedIcon={<img src={icon.srcOn} alt="checked" height={this.state.iconSize} />}
								icon={
									<img
										style={{ opacity: 0.7 }}
										src={icon.srcOff}
										alt="unchecked"
										height={this.state.iconSize}
									/>
								}
								checked={this.state.checkedW}
								onChange={() => this.handleChange(index)}
							/>
						);
					})}
				</div>
				<div style={{ float: 'right' }}>
					<FormControl component="fieldset" className={classes.formControl}>
						<FormLabel component="legend">Filter criteria</FormLabel>
						<RadioGroup value={this.state.filter} onChange={this.handleCriteriaChange}>
							{FILTERS ? (
								Object.keys(FILTERS).map((key) => {
									return (
										<FormControlLabel
											value={key}
											control={<Radio />}
											label={
												<p>
													{FILTERS[key]} {colors}
												</p>
											}
										/>
									);
								})
							) : null}
						</RadioGroup>
					</FormControl>
				</div>
			</div>
		);
	}
}

ManaCheckbox.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ManaCheckbox);
