import { createStyles, withStyles, WithStyles } from '@material-ui/styles'
import clsx from 'clsx'
import * as React from 'react'

const styles = createStyles({
	checkBox: {}
})

interface CheckBoxProps extends WithStyles<typeof styles> {
	className?: string
}

const CheckBox: React.FC<CheckBoxProps> = (props) => {
	const { classes, children, className } = props
	const checkBoxCls = clsx(classes.checkBox, className)
	return (
		<label className={checkBoxCls}>
			<div>
				<input />
			</div>
		</label>
	)
}

export const InternalCheckBox = React.memo(withStyles(styles, { name: 'CheckBox' })(CheckBox))
InternalCheckBox.displayName = 'CheckBox'
