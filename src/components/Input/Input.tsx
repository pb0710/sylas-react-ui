import * as React from 'react'
import { createStyles, withStyles, WithStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { useBoolean, useInternalState } from '../../utils/hooks'
import { Theme, ColorType } from '../jssBaseline/theme'
import { capitalize } from '../../utils'

const inputCommon = {
	width: '100%',
	height: 40,
	minWidth: 240,
	padding: '0 10px',
	outline: 'none',
	borderRadius: 4,
	border: '2px solid #f8f8f8',
	background: '#f8f8f8',
	transition: 'background .25s, border .25s',
	fontWeight: 500,
	'&:hover': {
		borderColor: '#eee',
		background: '#eee'
	},
	'&::placeholder': {
		color: '#777',
		padding: '0 4px',
		fontSize: 14,
		fontWeight: 500
	}
}

const labelCommon = {
	fontSize: 13,
	fontWeight: 600
}

const styles = (theme: Theme) =>
	createStyles({
		wrapper: {
			position: 'relative',
			'&>span': {
				position: 'absolute',
				top: -8,
				left: 8,
				background: '#fff',
				padding: '0 4px',
				whiteSpace: 'nowrap',
				textOverflow: 'ellipsis',
				overflow: 'hidden'
			}
		},
		labelPrimary: {
			...labelCommon,
			color: theme.palette.primary.dim
		},
		labelSuccess: {
			...labelCommon,
			color: theme.palette.success.dim
		},
		labelWarning: {
			...labelCommon,
			color: theme.palette.warning.dim
		},
		labelError: {
			...labelCommon,
			color: theme.palette.error.dim
		},
		inputPrimary: {
			...inputCommon,
			'&:focus': {
				borderColor: theme.palette.primary.main,
				background: '#fff'
			}
		},
		inputSuccess: {
			...inputCommon,
			'&:focus': {
				borderColor: theme.palette.success.main,
				background: '#fff'
			}
		},
		inputWarning: {
			...inputCommon,
			'&:focus': {
				borderColor: theme.palette.warning.main,
				background: '#fff'
			}
		},
		inputError: {
			...inputCommon,
			'&:focus': {
				borderColor: theme.palette.error.main,
				background: '#fff'
			}
		}
	})

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement>,
		WithStyles<typeof styles> {
	className?: string
	color?: ColorType
	value?: string
	onValueChange?(value: string): void
}

const Input = React.forwardRef<any, InputProps>((props, ref) => {
	const {
		classes,
		className,
		color = 'primary',
		value = '',
		onChange,
		onValueChange,
		placeholder,
		...rest
	} = props
	const [inputValue, setInputValue] = useInternalState<string>(value)
	const [focus, { setTrue: handleFocus, setFalse: handleBlur }] = useBoolean(false)

	const handleInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
		const keywords = event.currentTarget.value
		onChange?.(event)
		onValueChange?.(keywords)
		setInputValue(keywords)
	}

	const inputCls = clsx(classes[`input${capitalize(color)}`], className)
	return (
		<div className={classes.wrapper}>
			{focus && <span className={classes[`label${capitalize(color)}`]}>{placeholder}</span>}
			<input
				ref={ref}
				className={inputCls}
				value={inputValue}
				onChange={handleInput}
				onFocus={handleFocus}
				onBlur={handleBlur}
				placeholder={focus ? '' : placeholder}
				{...rest}
			/>
		</div>
	)
})

export const InternalInput = React.memo(withStyles(styles, { name: 'Input' })(Input))
Input.displayName = 'Input'
InternalInput.displayName = 'Input'
