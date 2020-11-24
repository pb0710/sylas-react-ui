import * as React from 'react'
import { createStyles, withStyles, WithStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { useBoolean, useInternalState } from '../../utils/hooks'
import { Theme, ColorType } from '../jssBaseline/theme'
import { capitalize } from '../../utils'

const textareaCommon = {
	maxWidth: '100%',
	minWidth: 240,
	minHeight: 40,
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
				padding: '0 4px'
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
		textareaPrimary: {
			...textareaCommon,
			'&:focus': {
				borderColor: theme.palette.primary.main,
				background: '#fff'
			}
		},
		textareaSuccess: {
			...textareaCommon,
			'&:focus': {
				borderColor: theme.palette.success.main,
				background: '#fff'
			}
		},
		textareaWarning: {
			...textareaCommon,
			'&:focus': {
				borderColor: theme.palette.warning.main,
				background: '#fff'
			}
		},
		textareaError: {
			...textareaCommon,
			'&:focus': {
				borderColor: theme.palette.error.main,
				background: '#fff'
			}
		}
	})

export interface TextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
		WithStyles<typeof styles> {
	className?: string
	color?: ColorType
	value?: string
	onValueChange?(value: string): void
}

const Textarea: React.FC<TextareaProps> = (props) => {
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
	const [TextareaValue, setTextareaValue] = useInternalState<string>(value)
	const [focus, { setTrue: handleFocus, setFalse: handleBlur }] = useBoolean(false)

	const handleTextarea = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
		const keywords = event.currentTarget.value
		onChange?.(event)
		onValueChange?.(keywords)
		setTextareaValue(keywords)
	}

	const TextareaCls = clsx(classes[`textarea${capitalize(color)}`], className)
	return (
		<div className={classes.wrapper}>
			{focus && <span className={classes[`label${capitalize(color)}`]}>{placeholder}</span>}
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
