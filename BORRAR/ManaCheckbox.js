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
// import { withStyles } from '@material-ui/core/styles';
// import PropTypes from 'prop-types';

// const styles = (theme) => ({
//     container:{
//         display: 'grid',
//         height:200,
//         width:200
//     }
// })

class ManaCheckbox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			checkedW: false,
			checkedU: false,
			checkedB: false,
			checkedR: false,
			checkedG: false
		};
	}

	handleChange = (name) => (event) => {
		this.setState({ [name]: event.target.checked });
	};

	render() {
		// const { classes } = this.props;
		return (
			<div
				style={{
					height: '200px',
					width: '200px'
				}}
			>
				<Checkbox
					style={{
						position: 'absolute',
						top: '0px',
						left: '75px',
						padding: '5px'
					}}
					checkedIcon={<img src={White} alt="checked" height="40" objectFit="contain" />}
					icon={<img src={WhiteU} alt="unchecked" height="40" objectFit="contain" />}
					checked={this.state.checkedW}
					onChange={this.handleChange('checkedW')}
					value="checkedW"
				/>
				<Checkbox
					style={{
						position: 'absolute',
						top: '60px',
						left: '150px',
						padding: '5px'
					}}
					checkedIcon={<img src={Blue} alt="checked" height="40" objectFit="contain" />}
					icon={<img src={BlueU} alt="unchecked" height="40" objectFit="contain" />}
					checked={this.state.checkedU}
					onChange={this.handleChange('checkedU')}
					value="checkedU"
				/>
				<Checkbox
					style={{
						position: 'absolute',
						top: '150px',
						left: '117px',
						padding: '5px'
					}}
					checkedIcon={<img src={Black} alt="checked" height="40" objectFit="contain" />}
					icon={<img src={BlackU} alt="unchecked" height="40" objectFit="contain" />}
					checked={this.state.checkedB}
					onChange={this.handleChange('checkedB')}
					value="checkedB"
				/>
				<Checkbox
					style={{
						position: 'absolute',
						top: '150px',
						left: '33px',
						padding: '5px'
					}}
					checkedIcon={<img src={Red} alt="checked" height="40" objectFit="contain" />}
					icon={<img src={RedU} alt="unchecked" height="40" objectFit="contain" />}
					checked={this.state.checkedR}
					onChange={this.handleChange('checkedR')}
					value="checkedR"
				/>
				<Checkbox
					style={{
						position: 'absolute',
						top: '60px',
						left: '0px',
						padding: '5px'
					}}
					checkedIcon={<img src={Green} alt="checked" height="40" objectFit="contain" />}
					icon={<img src={GreenU} alt="unchecked" height="40" objectFit="contain" />}
					checked={this.state.checkedG}
					onChange={this.handleChange('checkedG')}
					value="checkedG"
				/>
			</div>
		);
	}
}

// ManaCheckbox.propTypes = {
// 	classes: PropTypes.object.isRequired,
// 	theme: PropTypes.object.isRequired
// };
export default ManaCheckbox;
// export default withStyles(styles, { withTheme: true })(ManaCheckbox);
