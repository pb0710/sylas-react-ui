import * as React from 'react'
import { createStyles, makeStyles } from '@material-ui/styles'
import clsx from 'clsx'

interface GroupProps extends React.HTMLAttributes<HTMLElement> {
	className?: string
}

const useStyles = makeStyles(
	createStyles({
		root: {
			display: 'flex',
			justifyContent: 'center'
		},
		firstOne: {
			borderTopRightRadius: 0,
			borderBottomRightRadius: 0
		},
		lastOne: {
			borderTopLeftRadius: 0,
			borderBottomLeftRadius: 0,
			borderLeft: 'none'
		},
		compact: {
			borderRadius: 0,
			borderLeft: 'none'
		}
	})
)

const _Group: React.FC<GroupProps> = (props) => {
	const { children, className } = props
	const classes = useStyles()
	const childNum = React.Children.count(children)
	return (
		<div className={clsx(classes.root, className)}>
			{React.Children.map(children as any, (child: JSX.Element, index) => {
				const {
					props: { inputClassName: oldInputCls }
				} = child

				const compactStyles =
					index === 0
						? classes.firstOne
						: index === childNum - 1
						? classes.lastOne
						: classes.compact

				return React.cloneElement(child, {
					inputClassName: clsx(oldInputCls, compactStyles)
				})
			})}
		</div>
	)
}

const Group = React.memo(_Group)

export default Group
