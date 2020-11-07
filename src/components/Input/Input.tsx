import * as React from 'react'
import { createStyles, makeStyles } from '@material-ui/styles'
import clsx from 'clsx'

const useStyles = makeStyles(
	createStyles({
		input: {
			width: '100%',
			height: 32,
			padding: '0 8px'
		}
	})
)

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	className?: string
	value?: string
	onValueChange?(value: string): void
}

const Input: React.FC<InputProps> = (props) => {
	const { className, value = '', onChange, onValueChange, ...rest } = props

	const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		const keywords = event.currentTarget.value
		onChange && onChange(event)
		onValueChange && onValueChange(keywords)
	}

	const classes = useStyles()
	const inputCls = clsx(classes.input, className)
	return (
		<div>
			<input className={inputCls} value={value} onChange={handleInput} {...rest} />
		</div>
	)
}

const internalInput = Input
internalInput.displayName = 'Input'
export default internalInput
