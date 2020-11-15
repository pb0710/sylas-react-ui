import * as React from 'react'
import { createStyles, withStyles, WithStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { omit } from 'lodash-es'

const styles = createStyles({
	option: {
		display: 'flex',
		alignItems: 'center',
		padding: '0 16px',
		width: '100%',
		height: 36,
		fontSize: 14,
		fontWeight: 500,
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis',
		overflow: 'hidden',
		transition: 'background-color .2s',
		'&:hover': {
			background: '#eee'
		}
	},
	default: {
		fontWeight: 600,
		background: '#ecf5ff',
		'&:hover': {
			background: '#ecf5ff'
		}
	}
})

export interface Chosen {
	value: string
	description: React.ReactNode
}

interface OptionProps
	extends React.OptionHTMLAttributes<HTMLOptionElement>,
		WithStyles<typeof styles> {
	className?: string
	value: string
	chosen?: Chosen
	onChoose?(chosen: Chosen): void
}

const Option: React.FC<OptionProps> = (props) => {
	const { classes, children, className = '', value, chosen, onChoose, ...rest } = props

	const handleSelect = React.useCallback(
		(event: React.MouseEvent<HTMLOptionElement>) => {
			event.preventDefault()
			event.stopPropagation()
			onChoose?.({
				value,
				description: children
			})
		},
		[children, onChoose, value]
	)

	const restProps = omit(rest, ['value', 'onClick'])

	const optionCls = clsx({
		[classes.option]: true,
		[classes.default]: value === chosen?.value,
		[className]: true
	})

	return (
		<option className={optionCls} onClick={handleSelect} value={value} {...restProps}>
			{children}
		</option>
	)
}

export const InternalOption = withStyles(styles, { name: 'Option' })(Option)
InternalOption.displayName = 'Option'
