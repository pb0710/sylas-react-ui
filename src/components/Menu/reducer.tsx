export const enum actionType {
	REGISTER_MENU_LIST = 'register_menu_list',
	UNREGISTER_MENU_LIST = 'unregister_menu_list',
	SELECT_KEY = 'select_key',
	UPDATE_SUB_MENU = 'update_sub_menu'
}

export type SubMenuItem = {
	items: string[]
	subs: string[]
}

export interface State {
	menuStore: Record<string, boolean>
	subMenus: Record<string, SubMenuItem>
}

export type Action =
	| { type: actionType.REGISTER_MENU_LIST; payload: string }
	| { type: actionType.UNREGISTER_MENU_LIST; payload: string }
	| { type: actionType.SELECT_KEY; payload: string }
	| { type: actionType.UPDATE_SUB_MENU; payload: Record<string, SubMenuItem> }

export function reducer(state: State, action: Action): State {
	switch (action.type) {
		case actionType.REGISTER_MENU_LIST:
			return ((): State => {
				const { payload } = action
				const { menuStore } = state
				return {
					...state,
					menuStore: {
						...menuStore,
						[payload]: false
					}
				}
			})()

		case actionType.UNREGISTER_MENU_LIST:
			return ((): State => {
				const { payload } = action
				const { menuStore } = state
				delete menuStore[payload]
				return { ...state, menuStore }
			})()

		case actionType.SELECT_KEY:
			return ((): State => {
				const { payload } = action
				const { menuStore } = state
				Object.keys(menuStore).forEach((key) => {
					menuStore[key] = key === payload
				})
				return { ...state, menuStore }
			})()

		case actionType.UPDATE_SUB_MENU:
			return ((): State => {
				const { payload } = action
				const { subMenus } = state
				return {
					...state,
					subMenus: {
						...subMenus,
						...payload
					}
				}
			})()

		default:
			throw new Error('Action not match')
	}
}
