import { InternalMenu } from './Menu'
import { InternalMenuItem } from './MenuItem'
import { InternalSubMenu } from './SubMenu'

type InternalMenuType = typeof InternalMenu
interface MenuType extends InternalMenuType {
	Item: typeof InternalMenuItem
	Sub: typeof InternalSubMenu
}

const Menu = InternalMenu as MenuType
Menu.Item = InternalMenuItem
Menu.Sub = InternalSubMenu

export default Menu
