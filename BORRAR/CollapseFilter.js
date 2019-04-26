import React from 'react';
import Collapse from '@material-ui/core/Collapse';
import LineGridList from '../src/components/LineGridList';
import ManaCheckbox from '../src/components/Filtering/ManaCheckbox/ManaCheckbox';

export default class CollapseFilter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<Collapse in={this.props.in}>
				<LineGridList>{[ <ManaCheckbox /> ]}</LineGridList>
			</Collapse>
		);
	}
}
