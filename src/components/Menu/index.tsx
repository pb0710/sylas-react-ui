import _Menu, { IMenuProps } from './Menu'
import _MenuItem from './MenuItem'
import _SubMenu from './SubMemu'

interface IMenuExports extends React.MemoExoticComponent<React.FC<IMenuProps>> {
	Item: typeof _MenuItem
	SubMenu: typeof _SubMenu
}

const Menu = _Menu as IMenuExports
Menu.Item = _MenuItem
Menu.SubMenu = _SubMenu

export default Menu
