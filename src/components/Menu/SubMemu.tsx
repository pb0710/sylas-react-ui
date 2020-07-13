import React from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'
import clsx from 'clsx'

interface ISubMenuProps extends React.HTMLAttributes<HTMLElement> {
	className?: string
}

export interface IStyleProps {}

const useStyles = makeStyles(
	createStyles({
		root: {
			width: '100%'
		}
	})
)

const _Submenu: React.FC<ISubMenuProps> = props => {
	const { children, className } = props

	const classes = useStyles()

	const subMenuCls = clsx(classes.root, className)

	return <div className={subMenuCls}>{children}</div>
}

const SubMenu = _Submenu
SubMenu.displayName = 'SubMenu'

export default SubMenu
