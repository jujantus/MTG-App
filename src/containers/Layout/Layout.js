import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import RenderSearch from '../../components/RenderSearch/RenderSearch';

class Layout extends React.Component {
	render() {
		return (
			<React.Fragment>
				<Navbar>
					<RenderSearch />
				</Navbar>
			</React.Fragment>
		);
	}
}

export default Layout;
