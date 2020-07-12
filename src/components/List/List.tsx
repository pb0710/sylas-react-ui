import React from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'
import clsx from 'clsx'

interface IStyleProps {
	bordered: boolean
}

export interface IListProps {
	className?: string
	bordered?: boolean
}

const useStyles = makeStyles(
	createStyles({
		list: {
			boxSizing: 'border-box',
			position: 'relative',
			width: 400,
			minWidth: 200,
			minHeight: 40,
			fontSize: 14,
			color: '#303133',
			margin: 0,
			padding: 0,
			border: ({ bordered }: IStyleProps): string => (bordered ? '1px solid #dadce0' : '0px'),
			borderRadius: 4
		}
	})
)

const _List: React.FC<IListProps> = props => {
	const { children, className, bordered = false } = props
	const classes = useStyles({ bordered })
	const ulCls = clsx(classes.list, className)
	return <ul className={ulCls}>{children}</ul>
}

const List = React.memo(_List)

export default List
