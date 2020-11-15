import { createStyles, WithStyles, withStyles } from '@material-ui/styles'
import clsx from 'clsx'
import React from 'react'
import { Field, FieldProps } from './Field'

const styles = createStyles({
	formItem: {
		marginBottom: 16
	}
})

interface FormItemProps extends FieldProps, WithStyles<typeof styles> {
	className?: string
}

const FormItem: React.FC<FormItemProps> = (props) => {
	const { classes, className } = props
	const formItemCls = clsx(classes.formItem, className)
	return (
		<div className={formItemCls}>
			<Field {...props} />
		</div>
	)
}

export const InternalFormItem = withStyles(styles, { name: 'FormItem' })(FormItem)
InternalFormItem.displayName = 'FormItem'
