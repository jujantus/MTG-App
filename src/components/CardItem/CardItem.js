import React from 'react';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';

const cardItem = (props) => (
	<Grow in style={{ transformOrigin: '0 0 0' }} timeout={props.timeout}>
		<Grid item>
			<img src={props.card.image_uris.normal} alt={props.card.name} className={props.classes.card} />
		</Grid>
	</Grow>
);

export default cardItem;
