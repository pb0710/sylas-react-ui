import * as React from 'react'
import { createStyles, withStyles, WithStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { useBoolean, useInternalState } from '../../utils/hooks'

const styles = createStyles({
	wrapper: {
		position: 'relative',
		'&>span': {
			position: 'absolute',
			top: -8,
			left: 8,
			background: '#fff',
			fontSize: 13,
			fontWeight: 600,
			color: '#3a8ee6',
			padding: '0 4px'
		}
	},
	input: {
		width: '100%',
		height: 40,
		padding: '0 10px',
		outline: 'none',
		borderRadius: 4,
		border: '2px solid #f8f8f8',
		background: '#f8f8f8',
		transition: 'background .3s, border .3s',
		fontWeight: 500,
		'&:hover': {
			borderColor: '#eee',
			background: '#eee'
		},
		'&:focus': {
			borderColor: '#409eff',
			background: '#fff'
		},
		'&::placeholder': {
			color: '#888',
			padding: '0 4px',
			fontSize: 13,
			fontWeight: 600
		}
	}
})

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, WithStyles<typeof styles> {
	className?: string
	value?: string
	onValueChange?(value: string): void
}

const Input: React.FC<InputProps> = (props) => {
	const { classes, className, value = '', onChange, onValueChange, placeholder, ...rest } = props
	const [inputValue, setInputValue] = useInternalState<string>(value)
	const [focus, { setTrue: handleFocus, setFalse: handleBlur }] = useBoolean(false)

	const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		const keywords = event.currentTarget.value
		onChange?.(event)
		onValueChange?.(keywords)
		setInputValue(keywords)
	}

	const inputCls = clsx(classes.input, className)
	return (
		<div className={classes.wrapper}>
			{focus && <span>{placeholder}</span>}
			<input
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
}

export const InternalInput = React.memo(withStyles(styles)(Input))
InternalInput.displayName = 'Input'
