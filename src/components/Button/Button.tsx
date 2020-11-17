import * as React from 'react'
import clsx from 'clsx'
import { makeStyles, createStyles } from '@material-ui/styles'
import { ThemeNames, Colors, selectColor } from '../../common/themeColors'
import ButtonBase from './ButtonBase'
import TouchRipple from '../../components/touchRipple'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLElement> {
	className?: string
	color?: 'default' | 'primary' | 'success' | 'warning' | 'error'
	disabled?: boolean
	prefixes?: JSX.Element
	suffixes?: JSX.Element
	htmlType?: string
	error?: boolean
	submit?(): void
}

interface StyleProps {
	color: Colors
	disabled: boolean
}

const flexCenter = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center'
}

const useStyles = makeStyles(
	createStyles({
		btn: ({ color, disabled }: StyleProps) => ({
			boxSizing: 'border-box',
			display: 'inline-flex',
			alignItems: 'center',
			justifyContent: 'center',
			position: 'relative',
			fontSize: 14,
			fontWeight: 500,
			whiteSpace: 'nowrap',
			textAlign: 'center',
			minWidth: 80,
			height: 32,
			background: color.main,
			padding: '4px 16px',
			borderRadius: 4,
			// when use default color, the shadow looks too obvious, so individual adjustment.
			boxShadow: `0 ${color.name === ThemeNames.DEFAULT ? '0 1px' : '1px 3px'} rgba(26,26,26,.1)`,
			color: color.text,
			opacity: disabled ? 0.5 : 1,
			cursor: disabled ? 'not-allowed' : 'pointer',
			transition: 'all 0.2s ease-out',

			'&>span': {
				'&:first-child': {
					...flexCenter,
					marginRight: 8
				},
				'&:last-child': {
					...flexCenter,
					marginLeft: 8
				}
			},

			'&:hover': {
				background: disabled ? '' : color.dim
			}
		})
	})
)

const Button: React.ForwardRefRenderFunction<any, ButtonProps> = (props, ref) => {
	const {
		children,
		className,
		color = ThemeNames.DEFAULT,
		disabled = false,
		prefixes = null,
		suffixes = null,
		htmlType,
		error = false,
		onClick = null,
		submit,
		...restProps
	} = props

	const { rippleRef, handleStart, handleStop } = TouchRipple.useRipple(disabled)

	const stylesProps: StyleProps = { color: selectColor(color), disabled }
	const classes = useStyles(stylesProps)

	const customClick = React.useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			onClick && onClick(e)
			submit && submit()
		},
		[onClick, submit]
	)

	const btnCls = clsx(classes.btn, className)

	const renderChildren = () => {
		if (
			typeof children === 'string' &&
			children.length === 2 &&
			!/[^\u4e00-\u9fa5]/.test(children)
		) {
			// chinese characters add gaps.
			return children[0] + ' ' + children[1]
		}
		return children
	}

	return (
		<ButtonBase
			type="button"
			ref={ref}
			className={btnCls}
			onClick={customClick}
			onMouseDown={handleStart}
			onMouseUp={handleStop}
			onMouseLeave={handleStop}
			{...restProps}
		>
			<span>{prefixes}</span>
			<TouchRipple ref={rippleRef} color={color} />
			{renderChildren()}
			<span>{suffixes}</span>
		</ButtonBase>
	)
}

export const InternalButton = React.memo(React.forwardRef<unknown, ButtonProps>(Button))
InternalButton.displayName = 'Button'
