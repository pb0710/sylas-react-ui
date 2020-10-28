import React from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { CloseOutlined } from '@ant-design/icons'
import { ThemeNames, Colors, selectColor } from '../../common/themeColors'

interface TagProps extends React.HTMLAttributes<HTMLElement> {
	className?: string
	color?: string
	bordered?: boolean
	closeable?: boolean
	onClose?(event: React.MouseEvent<HTMLElement>): void
}

interface StyleProps {
	color: Colors
	bordered: boolean
}

const useStyles = makeStyles(
	createStyles({
		root: ({ bordered, color }: StyleProps) => ({
			boxSizing: 'border-box',
			display: 'flex',
			alignItems: 'center',
			height: 20,
			minWidth: 32,
			fontSize: 12,
			color: color.main,
			background: color.ripple,
			padding: '0 4px',
			border: bordered ? `1px solid ${color.bright}` : 0,
			borderRadius: 4,
			cursor: 'default'
		}),
		close: {
			display: 'flex',
			alignItems: 'center',
			height: '100%',
			fontSize: 10,
			marginLeft: 4,
			outline: 0,
			cursor: 'pointer',
			transition: 'color 250ms',

			'&:hover': {
				color: ({ color }: StyleProps) => color.dim
			}
		}
	})
)

const _Tag: React.FC<TagProps> = props => {
	const {
		className,
		children,
		color = ThemeNames.PRIMARY,
		bordered = true,
		closeable = false,
		onClose = () => {}
	} = props

	const stylesProps: StyleProps = {
		bordered,
		color: selectColor(color)
	}
	const classes = useStyles(stylesProps)
	const tagCls = clsx(classes.root, className)

	return (
		<div className={tagCls}>
			{children}
			{closeable && <CloseOutlined className={classes.close} onClick={onClose} />}
		</div>
	)
}

const Tag = React.memo(_Tag)
Tag.displayName = 'Tag'

export default Tag
