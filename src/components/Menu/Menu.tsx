import React from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'
import clsx from 'clsx'
import List from '../List'
import { ThemeNames } from '../../common/themeColors'

export interface IMenuProps extends React.HTMLAttributes<HTMLElement> {
	className?: string
	color?: string
	paddingLeft?: number
	onSelected?: (id?: string) => void
}

export interface IStyleProps {}

const useStyles = makeStyles(
	createStyles({
		root: {
			width: '100%',
			fontSize: 14,
			overflowY: 'auto',
			cursor: 'pointer',
			userSelect: 'none'
		}
	})
)

const _Menu: React.FC<IMenuProps> = props => {
	const {
		children,
		className,
		color = ThemeNames.PRIMARY,
		onSelected = () => {},
		...restProps
	} = props

	const classes = useStyles()

	const handleSelect = (e: React.MouseEvent<HTMLElement>) => {
		onSelected()
		console.log(e.target)
	}

	const menuCls = clsx(classes.root, className)

	return (
		<List {...restProps} className={menuCls}>
			{React.Children.map(children, (child: JSX.Element) =>
				child?.type?.displayName === 'MenuItem'
					? React.cloneElement(child, { color, handleSelect })
					: child
			)}
		</List>
	)
}

const Menu = React.memo(_Menu)
Menu.displayName = 'Menu'

export default Menu
