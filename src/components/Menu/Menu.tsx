import * as React from 'react'
import { createStyles, withStyles, WithStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { InternalList, ListProps } from '../list/List'
import { MenuContext } from './context'
import { actionType, reducer } from './reducer'
import { ColorType } from '../jssBaseline/theme'

const styles = createStyles({
	menu: {}
})

interface MenuProps extends WithStyles<typeof styles>, ListProps {
	className?: string
	color?: ColorType
	openKey: string
	onMenuSelect?(key: string): void
}

const Menu: React.FC<MenuProps> = (props) => {
	const { classes, children, className, color = 'primary', openKey, onMenuSelect, ...rest } = props

	const [state, dispatch] = React.useReducer(reducer, { menuStore: {}, subMenus: {} })
	const previousKeyRef = React.useRef(Object.create(null))

	React.useEffect(() => {
		const { menuStore } = state
		const currentKey = Object.keys(menuStore).find((key) => menuStore[key])
		if (currentKey && currentKey !== previousKeyRef.current) {
			onMenuSelect?.(currentKey)
		}
		// save the lastest key.
		previousKeyRef.current = currentKey
	}, [onMenuSelect, state])

	React.useEffect(() => {
		dispatch({ type: actionType.SELECT_KEY, payload: openKey })
	}, [openKey])

	const menuCls = clsx(classes.menu, className)

	return (
		<InternalList {...rest} className={menuCls}>
			<MenuContext.Provider value={{ state, dispatch, color }}>{children}</MenuContext.Provider>
		</InternalList>
	)
}

export const InternalMenu = React.memo(withStyles(styles, { name: 'Menu' })(Menu))
InternalMenu.displayName = 'Menu'
