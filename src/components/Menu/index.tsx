import _Menu, { MenuProps } from './Menu'
import { useMenu } from './hooks'
import MenuItem from './MenuItem'
import SubMenu from './SubMemu'

interface MenuExports extends React.MemoExoticComponent<React.FC<MenuProps>> {
	useMenu: typeof useMenu
	Item: typeof MenuItem
	SubMenu: typeof SubMenu
}

const Menu = _Menu as MenuExports
Menu.useMenu = useMenu
Menu.Item = MenuItem
Menu.SubMenu = SubMenu

export default Menu
