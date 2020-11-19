import * as React from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { ThemeNames, Colors, selectColor } from '../../common/themeColors'

interface BounceProps {
	color?: 'default' | 'primary' | 'success' | 'warning' | 'error'
}

interface StyleProps {
	color: Colors
}

const useStyles = makeStyles(
	createStyles({
		bounce: {
			width: 40,
			height: 40,
			position: 'relative'
		},
		ballCommon: {
			width: '100%',
			height: '100%',
			borderRadius: '50%',
			position: 'absolute',
			top: 0,
			left: 0,
			opacity: 0.6,
			// mixBlendMode: 'multiply',
			animation: '$kf_ball_stretch 2s infinite ease-in-out',
			background: ({ color }: StyleProps) =>
				color.name === ThemeNames.DEFAULT ? '#888' : color.main
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
)

const Bounce: React.FC<BounceProps> = (props) => {
	const { color = ThemeNames.PRIMARY } = props
	const classes = useStyles({ color: selectColor(color) })

	return (
		<div className={classes.bounce}>
			<div className={clsx(classes.ballCommon, classes.ball1)}></div>
			<div className={clsx(classes.ballCommon, classes.ball2)}></div>
		</div>
	)
}

export const InternalBounce = React.memo(Bounce)
InternalBounce.displayName = 'Bounce'
