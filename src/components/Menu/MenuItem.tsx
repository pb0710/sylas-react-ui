import React from 'react'
import clsx from 'clsx'
import { makeStyles, createStyles } from '@material-ui/styles'
import { ThemeNames, IColors, selectColor } from '../../common/themeColors'
import List from '../List'

export interface IMenuItemProps extends React.LiHTMLAttributes<HTMLElement> {
	className?: string
	color?: string
	onSelect?: (event: React.MouseEvent<HTMLElement>) => void
}

export interface IStyleProps {
	color: IColors
}

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

const _MenuItem: React.FC<IMenuItemProps> = props => {
	const { children, className, color = ThemeNames.PRIMARY, onSelect } = props

	const styleProps: IStyleProps = { color: selectColor(color) }
	const classes = useStyles(styleProps)

	const menuItemCls = clsx(classes.root, className)

	return (
		<List.Item className={menuItemCls} hovered ripple bordered={false} onClick={onSelect}>
			{children}
		</List.Item>
	)
}

const MenuItem = React.memo(_MenuItem)
MenuItem.displayName = 'MenuItem'

export default MenuItem
