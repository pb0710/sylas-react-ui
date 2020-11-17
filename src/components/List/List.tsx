import * as React from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'
import clsx from 'clsx'

interface StyleProps {
	bordered: boolean
}

export interface ListProps {
	className?: string
	bordered?: boolean
}

const useStyles = makeStyles(
	createStyles({
		list: {
			boxSizing: 'border-box',
			position: 'relative',
			width: '100%',
			minWidth: 200,
			fontSize: 14,
			color: '#303133',
			margin: 0,
			padding: 0,
			border: ({ bordered }: StyleProps): string => (bordered ? '1px solid #dadce0' : '0px'),
			borderRadius: 4
		}
	})
)

const _List: React.FC<ListProps> = (props) => {
	const { children, className, bordered = false, ...restProps } = props
	const classes = useStyles({ bordered })
	const ulCls = clsx(classes.list, className)
	return (
		<ul {...restProps} className={ulCls}>
			{children}
		</ul>
	)
}

const List = React.memo(_List)
List.displayName = 'List'

export default List
