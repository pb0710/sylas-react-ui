import * as React from 'react'
import clsx from 'clsx'
import { withStyles, createStyles, WithStyles } from '@material-ui/styles'
import TouchRipple from '../touchRipple'

const styles = createStyles({
	iconBtn: {
		position: 'relative',
		whiteSpace: 'nowrap',
		display: 'inline-flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: 40,
		height: 40,
		margin: 0,
		padding: 0,
		border: 0,
		outline: 'none',
		borderRadius: '50%',
		background: 'transparent',
		color: 'inherit',
		fontSize: 18,
		transition: 'all 0.25s ease-out',
		cursor: 'pointer',
		'&:hover': {
			background: 'rgba(120,120,120,.1)'
		}
	},
	focus: {
		background: 'rgba(120,120,120,.1)'
	},
	disabled: {
		opacity: 0.5,
		cursor: 'not-allowed',
		'&:hover': {
			background: 'transparent'
		}
	}
})

export interface IconButtonProps
	extends React.ButtonHTMLAttributes<HTMLElement>,
		WithStyles<typeof styles> {
	className?: string
	focus?: boolean
	disabled?: boolean
}

const IconButton = React.forwardRef<any, IconButtonProps>((props, ref) => {
	const { classes, children, className, disabled = false, focus = false, ...rest } = props

	const [rippleRef, controlProps] = TouchRipple.useRipple(disabled)

	const btnCls = clsx(
		classes.iconBtn,
		{
			[classes.disabled]: disabled,
			[classes.focus]: focus
		},
		className
	)

	return (
		<button {...rest} type="button" ref={ref} className={btnCls} {...controlProps}>
			{disabled || <TouchRipple ref={rippleRef} centered timeout={500} />}
			{children}
		</button>
	)
})

export const InternalIconButton = React.memo(withStyles(styles, { name: 'IconButton' })(IconButton))
IconButton.displayName = 'IconButton'
InternalIconButton.displayName = 'IconButton'
