import React from 'react';
import image from '../../assets/NotFound.png';
import Grow from '@material-ui/core/Grow';

const notFound = () => (
	<Grow in style={{ transformOrigin: '0 0 0' }} timeout={150}>
		<img
			style={{
				display: 'block',
				marginLeft: 'auto',
				marginRight: 'auto'
			}}
			src={image}
			alt="Not Found"
		/>
	</Grow>
);

export default notFound;
