import * as React from 'react'
import { createStyles, withStyles, WithStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { useInternalState } from '../../utils/hooks'
import { InternalCheckBox, CheckItem } from './CheckBox'

const styles = createStyles({
	checkBoxGroup: {
		display: 'inline-flex',
		alignItems: 'center'
	}
})

interface CheckBoxGroupProps extends WithStyles<typeof styles> {
	className?: string
	options?: { label: string; name: string }[]
	value?: CheckItem[]
	onValueChange?(value: CheckItem[]): void
}

const CheckBoxGroup: React.FC<CheckBoxGroupProps> = (props) => {
	const { classes, className = '', options = [], value = [], onValueChange, ...rest } = props

	const [checkList, setCheckList] = useInternalState<CheckItem[]>(value)

	const onCheckedChange = React.useCallback(
		(checkItem: CheckItem) => {
			const result = checkList.map((item) => (item.name === checkItem.name ? checkItem : item))
			setCheckList(result)
			onValueChange?.(result)
		},
		[checkList, onValueChange, setCheckList]
	)

	const checkBoxCls = clsx({
		[classes.checkBoxGroup]: true,
		[className]: true
	})

	return (
		<div {...rest} className={checkBoxCls}>
			{options.map(({ label, name }) => (
				<InternalCheckBox key={name} name={name} onCheckedChange={onCheckedChange}>
					{label}
				</InternalCheckBox>
			))}
		</div>
	)
}

export const InternalCheckBoxGroup = React.memo(
	withStyles(styles, { name: 'CheckBoxGroup' })(CheckBoxGroup)
)
InternalCheckBoxGroup.displayName = 'CheckBoxGroup'
