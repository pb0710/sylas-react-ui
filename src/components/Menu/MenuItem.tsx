import React from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'
import clsx from 'clsx'
import List from '../List'
import { IListItemProps } from '../List/ListItem'
import { MenuContext } from './Menu'
import { selectColor, ThemeNames, IColors } from '../../common/themeColors'

export interface IMenuItemProps extends IListItemProps {
	className?: string
	id: string
	color?: string
}

interface IStyleProps {
	selected: boolean
	color: IColors
}

const useStyles = makeStyles(
	createStyles({
		root: ({ color, selected }: IStyleProps) => {
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

const _MenuItem: React.FC<IMenuItemProps> = props => {
	const { children, className, id, color = ThemeNames.PRIMARY } = props

	const ctxProps = React.useContext(MenuContext)
	const { syncMenuId, onSelected, ids } = ctxProps

	const selected: boolean = ids[id]

	const styleProps: IStyleProps = { selected, color: selectColor(color) }
	const classes = useStyles(styleProps)

	const handleSelect = () => (id && onSelected ? onSelected(id) : null)

	React.useEffect(() => {
		id && syncMenuId(id)
		// context state 不必放入 deps
	}, [])

	const menuItemCls = clsx(classes.root, className)

	return (
		<List.Item className={menuItemCls} hovered ripple bordered={false} onClick={handleSelect}>
			{children}
		</List.Item>
	)
}

const MenuItem = React.memo(_MenuItem)
MenuItem.displayName = 'MenuItem'

export default MenuItem
