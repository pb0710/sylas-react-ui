import React from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { useTransition, ITransitionOpts } from '../../common/hooks'
import Paper from '../Paper'

export enum Direction {
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
	direction?: Direction
}

export interface IStyleProps {
	direction: string
}

const useStyles = makeStyles(
	createStyles({
		root: {
			width: 360,
			minHeight: 400,
			fontSize: 14,
			color: '#303133',
			boxShadow: '0 4px 24px rgba(26,26,26,.14)',
			position: 'fixed',
			userSelect: 'none',
			transformOrigin: ({ direction }: IStyleProps) => direction?.replace('-', ' '),
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
				transform: 'scale(.9)'
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

const _Window: React.ForwardRefRenderFunction<unknown, IWindowProps> = (props, ref) => {
	const {
		children,
		className,
		direction = Direction.CENTER,
		timeout = 150,
		in: inProp,
		onExited = () => {},
		...restProps
	} = props

	const classes = useStyles({ direction } as IStyleProps)

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
