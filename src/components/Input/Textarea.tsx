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
	textarea: {
		width: '100%',
		height: 72,
		padding: 10,
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

export interface TextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
		WithStyles<typeof styles> {
	className?: string
	value?: string
	onValueChange?(value: string): void
}

const Textarea: React.FC<TextareaProps> = (props) => {
	const { classes, className, value = '', onChange, onValueChange, placeholder, ...rest } = props
	const [TextareaValue, setTextareaValue] = useInternalState<string>(value)
	const [focus, { setTrue: handleFocus, setFalse: handleBlur }] = useBoolean(false)

	const handleTextarea = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
		const keywords = event.currentTarget.value
		onChange?.(event)
		onValueChange?.(keywords)
		setTextareaValue(keywords)
	}

	const TextareaCls = clsx(classes.textarea, className)
	return (
		<div className={classes.wrapper}>
			{focus && <span>{placeholder}</span>}
			<textarea
				className={TextareaCls}
				value={TextareaValue}
				onChange={handleTextarea}
				onFocus={handleFocus}
				onBlur={handleBlur}
				placeholder={focus ? '' : placeholder}
				{...rest}
			/>
		</div>
	)
}

export const InternalTextarea = React.memo(withStyles(styles, { name: 'Textarea' })(Textarea))
InternalTextarea.displayName = 'Textarea'
