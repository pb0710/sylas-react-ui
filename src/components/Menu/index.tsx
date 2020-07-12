import _Menu, { IMenuProps } from './Menu'
import _MenuItem from './MenuItem'

interface IMenuExports extends React.MemoExoticComponent<React.FC<IMenuProps>> {
	Item: typeof _MenuItem
}

const Menu = _Menu as IMenuExports
Menu.Item = _MenuItem

export default Menu
