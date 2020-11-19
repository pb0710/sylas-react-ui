import * as React from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'
import clsx from 'clsx'

interface StyleProps {
	bordered: boolean
}

export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
	className?: string
	bordered?: boolean
}

const useStyles = makeStyles(
	createStyles({
		list: {
			boxSizing: 'border-box',
			position: 'relative',
			fontSize: 14,
			color: '#303133',
			margin: 0,
			padding: 0,
			border: ({ bordered }: StyleProps): string => (bordered ? '1px solid #dadce0' : '0px'),
			borderRadius: 4
		}
	})
)

const List: React.FC<ListProps> = (props) => {
	const { children, className, bordered = false, ...rest } = props
	const classes = useStyles({ bordered })
	const listCls = clsx(classes.list, className)
	return (
		<ul {...rest} className={listCls}>
			{children}
		</ul>
	)
}

export const InternalList = React.memo(List)
InternalList.displayName = 'List'
