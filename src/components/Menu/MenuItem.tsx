import * as React from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'
import clsx from 'clsx'
import List from '../list'
import { ListItemProps } from '../list/ListItem'
import { MenuContext } from './Menu'
import { selectColor, ThemeNames, Colors } from '../../common/themeColors'

export interface MenuItemProps extends ListItemProps {
	className?: string
	id: string
	color?: 'default' | 'primary' | 'success' | 'warning' | 'error'
}

interface StyleProps {
	selected: boolean
	color: Colors
}

const useStyles = makeStyles(
	createStyles({
		menu: ({ color, selected }: StyleProps) => {
			const textColor = selected ? color.main : '#303133'
			return {
				color: textColor,

				'&:hover': {
					color: textColor
				}
			}
		}
	})
)

const _MenuItem: React.FC<MenuItemProps> = (props) => {
	const { children, className, id, color = ThemeNames.PRIMARY } = props

	const ctxProps = React.useContext(MenuContext)
	const { syncMenuId, onSelected, ids } = ctxProps

	const selected: boolean = ids[id]

	const styleProps: StyleProps = { selected, color: selectColor(color) }
	const classes = useStyles(styleProps)

	const handleSelect = () => (id && onSelected ? onSelected(id) : null)

	React.useEffect(() => {
		id && syncMenuId(id)
		// context state 不必放入 deps
	}, [id, syncMenuId])

	const menuItemCls = clsx(classes.menu, className)

	return (
		<List.Item className={menuItemCls} hovered ripple bordered={false} onClick={handleSelect}>
			{children}
		</List.Item>
	)
}

const MenuItem = React.memo(_MenuItem)
MenuItem.displayName = 'MenuItem'

export default MenuItem
