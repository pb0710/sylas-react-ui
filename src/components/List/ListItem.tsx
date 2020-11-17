import * as React from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'
import clsx from 'clsx'
import TouchRipple from '../../components/touchRipple'
import { ThemeNames, Colors, selectColor } from '../../common/themeColors'

export interface ListItemProps extends React.LiHTMLAttributes<HTMLElement> {
	className?: string
	bordered?: boolean
	ripple?: boolean
	hovered?: boolean
	color?: string
}

interface StyleProps {
	color: Colors
	bordered: boolean
	hovered: boolean
}

const useStyles = makeStyles(
	createStyles({
		listItem: ({ bordered, hovered }: StyleProps) => ({
			boxSizing: 'border-box',
			display: 'flex',
			alignItems: 'center',
			position: 'relative',
			width: '100%',
			minHeight: 40,
			padding: '0 24px',
			margin: 0,
			borderBottom: bordered ? '1px solid #f0f0f0' : 0,
			borderRadius: bordered ? 0 : 4,
			textDecoration: 'none',
			color: '#303133',
			transition: 'background .2s ease-out,color .2s ease-out',

			...(hovered
				? {
						'&:hover': {
							color: '#303133',
							background: 'rgba(160, 160, 160, .1)'
						}
				  }
				: {}),

			'&:first-child': {
				borderTopLeftRadius: 4,
				borderTopRightRadius: 4
			},

			'&:last-child': {
				borderBottom: 0,
				borderBottomLeftRadius: 4,
				borderBottomRightRadius: 4
			}
		})
	})
)

const _ListItem: React.FC<ListItemProps> = (props) => {
	const {
		children,
		className,
		bordered = true,
		ripple = false,
		hovered = false,
		color = ThemeNames.DEFAULT,
		...restProps
	} = props

	const styleProps: StyleProps = {
		color: selectColor(color),
		bordered,
		hovered
	}
	const classes = useStyles(styleProps)

	const { rippleRef, handleStart, handleStop } = TouchRipple.useRipple(!ripple)

	const listItemCls = clsx(classes.listItem, className)

	return (
		<li
			{...restProps}
			className={listItemCls}
			onMouseDown={handleStart}
			onMouseUp={handleStop}
			onMouseLeave={handleStop}
		>
			<TouchRipple ref={rippleRef} color={color} />
			{children}
		</li>
	)
}

const ListItem = React.memo(_ListItem)
ListItem.displayName = 'ListItem'

export default ListItem
