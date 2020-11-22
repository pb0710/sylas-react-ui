import * as React from 'react'
import { createStyles, WithStyles, withStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { Theme, ColorType } from '../jssBaseline/theme'
import { capitalize } from '../../utils'

const ballCommon = {
	opacity: 0.6,
	top: 0,
	left: 0,
	width: '100%',
	height: '100%',
	borderRadius: '50%',
	// mixBlendMode: 'multiply',
	animation: '$kf_ball_stretch 2s infinite ease-in-out'
}

const styles = (theme: Theme) =>
	createStyles({
		bounce: {
			width: 40,
			height: 40,
			position: 'relative'
		},
		ballPrimary: {
			...ballCommon,
			position: 'absolute',
			background: theme.palette.primary.main
		},
		ballSuccess: {
			...ballCommon,
			position: 'absolute',
			background: theme.palette.success.main
		},
		ballWarning: {
			...ballCommon,
			position: 'absolute',
			background: theme.palette.warning.main
		},
		ballError: {
			...ballCommon,
			position: 'absolute',
			background: theme.palette.error.main
		},
		ball1: {},
		ball2: {
			animationDelay: '-1000ms'
		},
		'@keyframes kf_ball_stretch': {
			'0%, 100%': {
				transform: 'scale(0)'
			},
			'50%': {
				transform: 'scale(1)'
			}
		}
	})

interface BounceProps extends WithStyles<typeof styles> {
	color?: ColorType
}

const Bounce: React.FC<BounceProps> = (props) => {
	const { classes, color = 'primary' } = props
	const ballCls = classes[`ball${capitalize(color)}`]
	return (
		<div className={classes.bounce}>
			<div className={clsx(ballCls, classes.ball1)}></div>
			<div className={clsx(ballCls, classes.ball2)}></div>
		</div>
	)
}

export const InternalBounce = React.memo(withStyles(styles, { name: 'LoaddingBounce' })(Bounce))
InternalBounce.displayName = 'Bounce'
