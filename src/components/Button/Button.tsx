import React from 'react'
import clsx from 'clsx'
import { makeStyles, createStyles } from '@material-ui/styles'
import { ThemeNames, Colors, selectColor } from '../../common/themeColors'
import ButtonBase from './ButtonBase'
import TouchRipple from '../TouchRipple'
import { FormContext } from '../Form/Form'

enum IHtmlType {
	SUBMIT = 'submit'
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLElement> {
	className?: string
	color?: string
	disabled?: boolean
	prefixes?: JSX.Element
	suffixes?: JSX.Element
	htmlType?: string
	error?: boolean
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
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			position: 'relative',
			fontSize: 14,
			fontWeight: 'bolder',
			whiteSpace: 'nowrap',
			textAlign: 'center',
			minWidth: 80,
			height: 32,
			background: color.main,
			padding: '4px 16px',
			borderRadius: 4,
			// default背景色太浅导致阴影明显，使得轮廓看起来比较大。单独调整下阴影
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

const _Button: React.ForwardRefRenderFunction<unknown, ButtonProps> = (props, ref) => {
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
		...restProps
	} = props

	const ctxProps = React.useContext(FormContext)
	const { submit } = ctxProps

	const { rippleRef, handleStart, handleStop } = TouchRipple.useRipple(disabled)

	const stylesProps: StyleProps = { color: selectColor(color), disabled }
	const classes = useStyles(stylesProps)

	const customClick = React.useCallback(
		(e: React.MouseEvent<HTMLElement>) => {
			onClick && onClick(e)
			if (htmlType === IHtmlType.SUBMIT) {
				submit()
			}
		},
		[submit, onClick, htmlType]
	)

	const btnCls = clsx(classes.btn, className)

	const renderChildren = () => {
		if (typeof children === 'string' && children.length === 2 && !/[^\u4e00-\u9fa5]/.test(children)) {
			// 两字中文中间加空格
			return children[0] + ' ' + children[1]
		} else {
			return children
		}
	}

	return (
		<ButtonBase
			type="button"
			{...restProps}
			ref={ref as any}
			className={btnCls}
			onClick={customClick}
			onMouseDown={handleStart}
			onMouseUp={handleStop}
			onMouseLeave={handleStop}
		>
			<span>{prefixes}</span>
			<TouchRipple ref={rippleRef} color={color} />
			{renderChildren()}
			<span>{suffixes}</span>
		</ButtonBase>
	)
}

const Button = React.memo(React.forwardRef<unknown, ButtonProps>(_Button))
Button.displayName = 'Button'

export default Button
