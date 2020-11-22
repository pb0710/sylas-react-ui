import * as React from 'react'
import { createStyles, withStyles, WithStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { InternalListItem, ListItemProps } from '../list/ListItem'
import { MenuContext, SubMenuContext } from './context'
import { actionType } from './reducer'
import { Theme } from '../jssBaseline/theme'
import { capitalize } from '../../utils'

const styles = (theme: Theme) =>
	createStyles({
		menuItem: {
			borderRadius: 0,
			fontWeight: 500,
			'&:first-child,&:last-child': {
				borderRadius: 0
			}
		},
		activedPrimary: {
			color: theme.palette.primary.main,
			'&:hover': {
				color: theme.palette.primary.main
			}
		},
		activedSuccess: {
			color: theme.palette.success.main,
			'&:hover': {
				color: theme.palette.success.main
			}
		},
		activedWarning: {
			color: theme.palette.warning.main,
			'&:hover': {
				color: theme.palette.warning.main
			}
		},
		activedError: {
			color: theme.palette.error.main,
			'&:hover': {
				color: theme.palette.error.main
			}
		}
	})

interface MenuItemProps extends WithStyles<typeof styles>, ListItemProps {
	className?: string
	menuKey: string
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
	const { classes, children, className, menuKey, ...rest } = props

	const {
		color,
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

	const menuCls = clsx(
		classes.menuItem,
		{
			[classes[`actived${capitalize(color)}`]]: actived
		},
		className
	)

	return (
		<InternalListItem {...rest} className={menuCls} hovered ripple onClick={handleSelect}>
			{children}
		</InternalListItem>
	)
}

export const InternalMenuItem = React.memo(withStyles(styles, { name: 'MenuItem' })(MenuItem))
InternalMenuItem.displayName = 'MenuItem'
