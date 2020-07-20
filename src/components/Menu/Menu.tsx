import React from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'
import clsx from 'clsx'
import List from '../List'
import { ThemeNames } from '../../common/themeColors'

export interface IMenuProps extends React.HTMLAttributes<HTMLElement> {
	className?: string
	color?: string
	paddingLeft?: number
	onSelected?: (id?: string) => void | null
}

export interface IStyleProps {}

export interface IItems {
	[key: string]: boolean
}

export interface IMenuCtx {
	syncMenuItem: (id: string) => void
	onSelected: (id: string) => void
	items: IItems
}

const useStyles = makeStyles(
	createStyles({
		root: {
			width: '100%',
			fontSize: 14,
			cursor: 'pointer',
			userSelect: 'none'
		}
	})
)

const defaultCtx: IMenuCtx = {
	syncMenuItem(id) {},
	onSelected(id) {},
	items: {}
}

export const MenuContext = React.createContext(defaultCtx)

const _Menu: React.FC<IMenuProps> = props => {
	const {
		children,
		className,
		color = ThemeNames.PRIMARY,
		onSelected = () => {},
		...restProps
	} = props

	const [items, setItems] = React.useState<IItems>({})

	const classes = useStyles()

	const syncMenuItem = (id: string) => {
		id && setItems(prev => ({ ...prev, [id]: false }))
	}

	const onCustomSelected = React.useCallback(
		id => {
			onSelected(id)
			setItems(prev => {
				const res = {}
				for (const key in prev) {
					if (prev.hasOwnProperty(key)) {
						res[key] = key === id
					}
				}
				return res
			})
		},
		[onSelected]
	)

	const menuCtx = { color, syncMenuItem, items, onSelected: onCustomSelected }

	const menuCls = clsx(classes.root, className)

	return (
		<MenuContext.Provider value={menuCtx}>
			<List {...restProps} className={menuCls}>
				{children}
			</List>
		</MenuContext.Provider>
	)
}

const Menu = React.memo(_Menu)
Menu.displayName = 'Menu'

export default Menu
