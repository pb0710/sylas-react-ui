import * as React from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { useTransition, TransitionOpts } from '../../utils/hooks'
import Paper from '../paper'

export type ScaleOrigin =
	| 'center'
	| 'top'
	| 'right'
	| 'bottom'
	| 'left'
	| 'left-top'
	| 'left-bottom'
	| 'right-top'
	| 'right-bottom'
	| 'bottom-left'
	| 'bottom-right'
	| 'top-left'
	| 'top-right'

export interface WindowProps extends TransitionOpts {
	className?: string
	scaleOrigin: ScaleOrigin
}

export interface StyleProps {
	scaleOrigin: string
}

const useStyles = makeStyles(
	createStyles({
		window: {
			zIndex: 1,
			fontSize: 14,
			fontWeight: 'normal',
			color: '#303133',
			boxShadow: '0 4px 24px rgba(26,26,26,.14)',
			transformOrigin: ({ scaleOrigin }: StyleProps) => scaleOrigin?.replace('-', ' '),
			position: 'absolute',
			userSelect: 'none',
			cursor: 'default'
		},
		enter: {
			animation: '$kf_enter 200ms ease-out forwards'
		},
		leave: {
			animation: '$kf_leave 100ms ease-out forwards'
		},
		'@keyframes kf_enter': {
			'0%': {
				opacity: 0,
				transform: 'scale(.7)'
			},
			'100%': {
				opacity: 1,
				transform: 'scale(1)'
			}
		},
		'@keyframes kf_leave': {
			'0%': {
				opacity: 1,
				transform: 'scale(1)'
			},
			'100%': {
				opacity: 0,
				transform: 'scale(.9)'
			}
		}
	})
)

const Window: React.ForwardRefRenderFunction<any, WindowProps> = (props, ref) => {
	const {
		children,
		className,
		scaleOrigin,
		timeout = 150,
		in: inProp,
		onExited = () => {},
		...restProps
	} = props

	const classes = useStyles({ scaleOrigin })

	useTransition({ in: inProp, onExited, timeout })

	const containerCls = clsx(classes.window, className, inProp ? classes.enter : classes.leave)

	return (
		<Paper {...restProps} ref={ref} className={containerCls}>
			{children}
		</Paper>
	)
}

export const InternalWindow = React.memo(React.forwardRef<unknown, WindowProps>(Window))
InternalWindow.displayName = 'Window'
