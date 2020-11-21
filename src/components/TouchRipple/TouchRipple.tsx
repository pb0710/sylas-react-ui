import * as React from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'
import { TransitionGroup } from 'react-transition-group'
import { InternalRipple } from './Ripple'

interface Rect {
	width: number
	height: number
	left: number
	top: number
}

export interface TouchRippleProps extends React.RefAttributes<HTMLElement> {
	centered?: boolean
	timeout?: number
	color?: 'default' | 'primary' | 'success' | 'warning' | 'error'
}

const useStyles = makeStyles(
	createStyles({
		touchRipple: {
			// safari hack. https://stackoverflow.com/questions/49066011/overflow-hidden-with-border-radius-not-working-on-safari
			WebkitMaskImage: '-webkit-radial-gradient(white, black)',
			overflow: 'hidden',
			pointerEvents: 'none',
			position: 'absolute',
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
			borderRadius: 'inherit'
		}
	})
)

const TouchRipple: React.ForwardRefRenderFunction<unknown, TouchRippleProps> = (props, ref) => {
	const { centered = false, timeout = 400, color = 'default' } = props

	const [ripples, setRipples] = React.useState<React.ReactNode[]>([])
	const key = React.useRef<number>(0)
	const container = React.useRef(Object.create(null))
	const classes = useStyles()

	const addRipple = React.useCallback(
		(rippleX: number, rippleY: number, rippleSize: number): void => {
			setRipples((oldRipples) => [
				...oldRipples,
				<InternalRipple
					key={key.current}
					rippleX={rippleX}
					rippleY={rippleY}
					rippleSize={rippleSize}
					timeout={timeout}
					color={color}
				/>
			])
			key.current++
		},
		[color, timeout]
	)

	const start = React.useCallback(
		(event: React.MouseEvent<HTMLElement>): void => {
			const element = container.current
			const rect: Rect | ClientRect = element
				? element.getBoundingClientRect()
				: {
						width: 0,
						height: 0,
						left: 0,
						top: 0
				  }
			let rippleX: number
			let rippleY: number
			let rippleSize: number

			if (centered) {
				rippleX = Math.round(rect.width / 2)
				rippleY = Math.round(rect.height / 2)
				rippleSize = Math.round(Math.sqrt(4 * (rippleX ** 2 + rippleY ** 2)))
			} else {
				rippleX = Math.round(event.clientX - rect.left)
				rippleY = Math.round(event.clientY - rect.top)

				const sizeX = Math.max(Math.abs(rect.width - rippleX), rippleX) * 2
				const sizeY = Math.max(Math.abs(rect.height - rippleY), rippleY) * 2

				rippleSize = Math.round(Math.sqrt(sizeX ** 2 + sizeY ** 2))
			}
			addRipple(rippleX, rippleY, rippleSize)
		},
		[addRipple, centered]
	)

	const stop = React.useCallback((): void => {
		setRipples((oldRipples) => (oldRipples.length > 0 ? oldRipples.slice(1) : oldRipples))
	}, [])

	// sub component provider function to super component by ref.
	React.useImperativeHandle(ref, () => ({ start, stop }), [start, stop])

	return (
		<span ref={container} className={classes.touchRipple}>
			<TransitionGroup component={null}>{ripples}</TransitionGroup>
		</span>
	)
}

export const InternalTouchRipple = React.memo(
	React.forwardRef<unknown, TouchRippleProps>(TouchRipple)
)
InternalTouchRipple.displayName = 'TouchRipple'
