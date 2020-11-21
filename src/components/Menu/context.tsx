import * as React from 'react'
import { Action, State } from './reducer'

interface MenuContextValue {
	state: State
	dispatch: React.Dispatch<Action>
}

export const initialMenuValue: MenuContextValue = {
	state: { menuStore: {}, subMenus: {} },
	dispatch() {}
}
export const MenuContext = React.createContext(initialMenuValue)

interface SubMenuContextValue {
	register(key: string): void
	unregister(key: string): void
	subRegister(key: string): void
	subUnregister(key: string): void
}

export const initialSubMenuValue: SubMenuContextValue = {
	register() {},
	unregister() {},
	subRegister() {},
	subUnregister() {}
}
export const SubMenuContext = React.createContext(initialSubMenuValue)
