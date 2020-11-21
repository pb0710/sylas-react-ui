import * as React from 'react'
import { createStyles, withStyles, WithStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { InternalListItem, ListItemProps } from '../list/ListItem'
import { MenuContext, SubMenuContext } from './context'
import { actionType } from './reducer'

const styles = createStyles({
	menuItem: {
		borderRadius: 0,
		fontWeight: 500,
		'&:first-child,&:last-child': {
			borderRadius: 0
		}
	},
	actived: {
		color: '#409eff',
		'&:hover': {
			color: '#409eff'
		}
	}
})

interface MenuItemProps extends WithStyles<typeof styles>, ListItemProps {
	className?: string
	menuKey: string
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
	const { classes, children, className = '', menuKey, ...rest } = props

	const {
		state: { menuStore },
		dispatch
	} = React.useContext(MenuContext)
	const actived = Boolean(menuStore[menuKey])

	const { register, unregister } = React.useContext(SubMenuContext)

	// register & unregister.
	React.useEffect(() => {
		dispatch({ type: actionType.REGISTER_MENU_LIST, payload: menuKey })
		register?.(menuKey)
		return () => {
			dispatch({ type: actionType.UNREGISTER_MENU_LIST, payload: menuKey })
			unregister?.(menuKey)
		}
	}, [dispatch, menuKey, register, unregister])

	// only support single selected.
	const handleSelect = React.useCallback((): void => {
		dispatch({ type: actionType.SELECT_KEY, payload: menuKey })
	}, [dispatch, menuKey])

	const menuCls = clsx({
		[classes.menuItem]: true,
		[classes.actived]: actived,
		[className]: true
	})

	return (
		<InternalListItem {...rest} className={menuCls} hovered ripple onClick={handleSelect}>
			{children}
		</InternalListItem>
	)
}

export const InternalMenuItem = React.memo(withStyles(styles, { name: 'MenuItem' })(MenuItem))
InternalMenuItem.displayName = 'MenuItem'
