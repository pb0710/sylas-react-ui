import React from 'react';
import { makeStyles, createStyles } from '@material-ui/styles'

interface ICardProps {}

const useStyles = makeStyles(createStyles({
	root: {
		width: 200,
		height: 200,
		background: 'orange'
	}
}))

const Card: React.FC<ICardProps> = (props) => {
	const { children } = props
	const classes = useStyles()
	return (
		<div className={classes.root}>
			{children}
		</div>
	);
};

export default Card;
