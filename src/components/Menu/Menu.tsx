import React from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'
import clsx from 'clsx'
import List from '../List'
import { ThemeNames } from '../../common/themeColors'
import { IMenu, IIds, IIdEffect, useMenu } from './hooks'

export interface IMenuProps extends React.HTMLAttributes<HTMLElement> {
	className?: string
	color?: string
	menu?: IMenu
	onSelected?(id?: string): void | null
}

export interface IStyleProps {}

export interface IMenuCtx {
	syncMenuId: IIdEffect
	onSelected: IIdEffect
	ids: IIds
}

const useStyles = makeStyles(
	createStyles({
		root: {
			width: '100%',
			fontSize: 14,
			cursor: 'pointer',
			userSelect: 'none'
		}
	})
)

const defaultCtx: IMenuCtx = {
	syncMenuId(id) {},
	onSelected(id) {},
	ids: {}
}

export const MenuContext = React.createContext(defaultCtx)

const _Menu: React.FC<IMenuProps> = props => {
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

	const onCustomSelect: IIdEffect = id => {
		onSelected(id)
		menu?.setCurrentKey(id)
	}

	const menuCtx = { color, ...menu, onSelected: onCustomSelect }

	const menuCls = clsx(classes.root, className)

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
