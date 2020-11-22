import * as React from 'react'
import { createStyles, withStyles, WithStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { useInternalState } from '../../utils/hooks'
import { InternalCheckBox, CheckItem } from './CheckBox'
import { ColorType } from '../jssBaseline/theme'

const styles = createStyles({
	checkBoxGroup: {
		display: 'inline-flex',
		alignItems: 'center'
	}
})

interface CheckBoxGroupProps
	extends WithStyles<typeof styles>,
		React.HTMLAttributes<HTMLDivElement> {
	className?: string
	options?: { label: string; name: string }[]
	color?: ColorType
	value?: CheckItem[]
	onValueChange?(value: CheckItem[]): void
}

const CheckBoxGroup: React.FC<CheckBoxGroupProps> = (props) => {
	const {
		classes,
		className,
		options = [],
		color = 'primary',
		value = [],
		onValueChange,
		...rest
	} = props

	const [checkList, setCheckList] = useInternalState<CheckItem[]>(value)

	const onCheckedChange = React.useCallback(
		(checkItem: CheckItem): void => {
			const result = checkList.map((item) => (item.name === checkItem.name ? checkItem : item))
			setCheckList(result)
			onValueChange?.(result)
		},
		[checkList, onValueChange, setCheckList]
	)

	const checkBoxCls = clsx(classes.checkBoxGroup, className)

	return (
		<div {...rest} className={checkBoxCls}>
			{options.map(({ label, name }) => {
				const value = checkList.find((check) => check.name === name)?.value
				return (
					<InternalCheckBox
						key={name}
						color={color}
						value={value}
						name={name}
						onCheckedChange={onCheckedChange}
					>
						{label}
					</InternalCheckBox>
				)
			})}
		</div>
	)
}

export const InternalCheckBoxGroup = React.memo(
	withStyles(styles, { name: 'CheckBoxGroup' })(CheckBoxGroup)
)
InternalCheckBoxGroup.displayName = 'CheckBoxGroup'
