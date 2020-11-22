import * as React from 'react'
import { withStyles, createStyles, WithStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { useTransition, TransitionOpts } from '../../utils/hooks'
import { Theme, ColorType } from '../jssBaseline/theme'
import { capitalize } from '../../utils'

interface Rect {
	width: number
	height: number
	left: number
	top: number
}

const styles = (theme: Theme) =>
	createStyles({
		ripple: {
			position: 'absolute'
		},
		inner: {
			display: 'block',
			width: '100%',
			height: '100%',
			borderRadius: '50%',
			background: '#606266'
		},
		innerPrimary: {
			background: theme.palette.primary.ripple
		},
		innerSuccess: {
			background: theme.palette.success.ripple
		},
		innerWarning: {
			background: theme.palette.warning.ripple
		},
		innerError: {
			background: theme.palette.error.ripple
		},
		enter: {
			animation: '$kf_enter ease-out forwards'
		},
		leave: {
			animation: '$kf_leave ease-out forwards'
		},
		'@keyframes kf_enter': {
			from: {
				transform: 'scale(0)',
				opacity: 0.1
			},
			to: {
				transform: 'scale(1)',
				opacity: 0.4
			}
		},
		'@keyframes kf_leave': {
			from: {
				opacity: 1
			},
			to: {
				opacity: 0
			}
		}
	})

export interface RippleProps
	extends TransitionOpts,
		WithStyles<typeof styles>,
		React.HTMLAttributes<HTMLSpanElement> {
	rippleX: number
	rippleY: number
	rippleSize: number
	color?: ColorType
}

const Ripple: React.FC<RippleProps> = (props) => {
	const {
		classes,
		rippleX,
		rippleY,
		rippleSize,
		in: inProp,
		onExited,
		color,
		timeout = 400
	} = props

	const style: Rect = {
		width: rippleSize,
		height: rippleSize,
		left: rippleX - rippleSize / 2,
		top: rippleY - rippleSize / 2
	}

	const [leave, setLeave] = React.useState<boolean>(false)

	useTransition({
		onExited,
		timeout,
		in: inProp,
		callback: () => {
			setLeave(true)
		}
	})
	const duration = { animationDuration: `${timeout}ms` }

	return (
		<span className={clsx(classes.ripple, classes.enter)} style={{ ...style, ...duration }}>
			<span
				className={clsx(classes.inner, color && classes[`inner${capitalize(color)}`], {
					[classes.leave]: leave
				})}
				style={duration}
			></span>
		</span>
	)
}

export const InternalRipple = React.memo(withStyles(styles, { name: 'Ripple' })(Ripple))
InternalRipple.displayName = 'Ripple'
