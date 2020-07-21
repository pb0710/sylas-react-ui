import React from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { useTransition, ITransitionOpts } from '../../utils/hooks'
import Paper from '../Paper'

export enum ScaleOrigin {
	CENTER = 'center',
	TOP = 'top',
	RIGHT = 'right',
	BOTTOM = 'bottom',
	LEFT = 'left',
	LEFT_TOP = 'left-top',
	LEFT_BOTTOM = 'left-bottom',
	RIGHT_TOP = 'right-top',
	RIGHT_BOTTOM = 'right-bottom',
	BOTTOM_LEFT = 'bottom-left',
	BOTTOM_RIGHT = 'bottom-right',
	TOP_LEFT = 'top-left',
	TOP_RIGHT = 'top-right'
}

export interface IWindowProps extends ITransitionOpts {
	className?: string
	scaleOrigin?: ScaleOrigin
}

export interface IStyleProps {
	scaleOrigin: string
}

const useStyles = makeStyles(
	createStyles({
		root: {
			width: 360,
			minHeight: 400,
			fontSize: 14,
			color: '#303133',
			boxShadow: '0 4px 24px rgba(26,26,26,.14)',
			transformOrigin: ({ scaleOrigin }: IStyleProps) => scaleOrigin?.replace('-', ' '),
			position: 'fixed',
			userSelect: 'none',
			zIndex: 999
		},
		enter: {
			animation: '$kf_enter 200ms ease-out forwards'
		},
		leave: {
			animation: '$kf_leave 150ms ease-out forwards'
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
				transform: 'scale(.7)'
			}
		}
	})
)

const _Window: React.ForwardRefRenderFunction<unknown, IWindowProps> = (props, ref) => {
	const {
		children,
		className,
		scaleOrigin = ScaleOrigin.CENTER,
		timeout = 150,
		in: inProp,
		onExited = () => {},
		...restProps
	} = props

	const classes = useStyles({ scaleOrigin } as IStyleProps)

	useTransition({ in: inProp, onExited, timeout })

	const containerCls = clsx(classes.root, className, inProp ? classes.enter : classes.leave)

	return (
		<Paper {...restProps} ref={ref as any} className={containerCls}>
			{children}
		</Paper>
	)
}

const Window = React.memo(React.forwardRef<unknown, IWindowProps>(_Window))

export default Window
