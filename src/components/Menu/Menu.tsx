import * as React from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'
import clsx from 'clsx'
import List from '../list'
import { ThemeNames } from '../../common/themeColors'
import { Menu, Ids, IdEffect, useMenu } from './hooks'

export interface MenuProps extends React.HTMLAttributes<HTMLElement> {
	className?: string
	color?: 'default' | 'primary' | 'success' | 'warning' | 'error'
	menu?: Menu
	onSelected?(id?: string): void | null
}

export interface StyleProps {}

export interface MenuCtx {
	syncMenuId: IdEffect
	onSelected: IdEffect
	ids: Ids
}

const useStyles = makeStyles(
	createStyles({
		menu: {
			width: '100%',
			fontSize: 14,
			cursor: 'pointer',
			userSelect: 'none'
		}
	})
)

const defaultCtx: MenuCtx = {
	syncMenuId(id) {},
	onSelected(id) {},
	ids: {}
}

export const MenuContext = React.createContext(defaultCtx)

const _Menu: React.FC<MenuProps> = (props) => {
	const {
		children,
		className,
		color = ThemeNames.PRIMARY,
		// menu 不传时默认创建
		menu = useMenu(),
		onSelected = () => {},
		...restProps
	} = props

	const classes = useStyles()

	const onCustomSelect: IdEffect = (id) => {
		onSelected(id)
		menu?.setCurrentKey(id)
	}

	const menuCtx = { color, ...menu, onSelected: onCustomSelect }

	const menuCls = clsx(classes.menu, className)

	return (
		<MenuContext.Provider value={menuCtx}>
			<List {...restProps} className={menuCls}>
				{children}
			</List>
		</MenuContext.Provider>
	)
}

const Menu = React.memo(_Menu)
Menu.displayName = 'Menu'

export default Menu
