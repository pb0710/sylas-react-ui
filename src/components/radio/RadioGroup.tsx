import * as React from 'react'
import { createStyles, withStyles, WithStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { useInternalState } from '../../utils/hooks'

const styles = createStyles({
	radioGroup: {
		display: 'inline-flex',
		alignItems: 'center'
	}
})

interface RadioGroupProps extends WithStyles<typeof styles> {
	className?: string
	value?: string
	onValueChange?(value: string): void
}

const RadioGroup: React.FC<RadioGroupProps> = (props) => {
	const { classes, children, className = '', value = '', onValueChange, ...rest } = props

	const [chosen, setChosen] = useInternalState<string>(value)

	const onCustomChange = React.useCallback(
		(newChosen: string): void => {
			onValueChange?.(newChosen)
			setChosen(newChosen)
		},
		[onValueChange, setChosen]
	)

	const radioGroupCls = clsx({
		[classes.radioGroup]: true,
		[className]: true
	})

	return (
		<div {...rest} className={radioGroupCls}>
			{React.Children.map(children, (child) =>
				React.isValidElement(child) ? React.cloneElement(child, { chosen, onCustomChange }) : child
			)}
		</div>
	)
}

export const InternalRadioGroup = React.memo(withStyles(styles, { name: 'RadioGroup' })(RadioGroup))
InternalRadioGroup.displayName = 'RadioGroup'
