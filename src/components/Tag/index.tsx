import * as React from 'react'
import { WithStyles, createStyles, withStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { CloseOutlined } from '@ant-design/icons'

import { Theme, ColorType } from '../jssBaseline/theme'
import { capitalize } from '../../utils'

const styles = (theme: Theme) =>
	createStyles({
		tag: {
			boxSizing: 'border-box',
			display: 'inline-flex',
			alignItems: 'center',
			height: 24,
			minWidth: 40,
			padding: '0 8px',
			borderRadius: 4,
			fontSize: 12,
			fontWeight: 500,
			cursor: 'default'
		},
		tagPrimary: {
			color: theme.palette.primary.main,
			background: theme.palette.primary.ripple
		},
		tagSuccess: {
			color: theme.palette.success.main,
			background: theme.palette.success.ripple
		},
		tagWarning: {
			color: theme.palette.warning.main,
			background: theme.palette.warning.ripple
		},
		tagError: {
			color: theme.palette.error.main,
			background: theme.palette.error.ripple
		},
		close: {
			fontSize: 10,
			marginLeft: 8,
			outline: 'none',
			cursor: 'pointer'
		}
	})

interface TagProps extends React.HTMLAttributes<HTMLElement>, WithStyles<typeof styles> {
	className?: string
	color?: ColorType
	closeable?: boolean
	onClose?(event: React.MouseEvent<HTMLElement>): void
}

const InternalTag: React.FC<TagProps> = (props) => {
	const {
		classes,
		className,
		children,
		color = 'primary',
		closeable = false,
		onClose = () => {}
	} = props

	const tagCls = clsx(classes.tag, classes[`tag${capitalize(color)}`], className)

	return (
		<div className={tagCls}>
			{children}
			{closeable && <CloseOutlined className={classes.close} onClick={onClose} />}
		</div>
	)
}

const Tag = React.memo(withStyles(styles, { name: 'Tag' })(InternalTag))
Tag.displayName = 'Tag'

export default Tag
