import _Menu, { IMenuProps } from './Menu'
import MenuItem from './MenuItem'
import SubMenu from './SubMemu'

interface IMenuExports extends React.MemoExoticComponent<React.FC<IMenuProps>> {
	Item: typeof MenuItem
	SubMenu: typeof SubMenu
}

const Menu = _Menu as IMenuExports
Menu.Item = MenuItem
Menu.SubMenu = SubMenu

export default Menu
