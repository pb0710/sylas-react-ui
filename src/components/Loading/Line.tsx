import * as React from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { ThemeNames, Colors, selectColor } from '../../common/themeColors'

interface LineProps {
	color?: 'default' | 'primary' | 'success' | 'warning' | 'error'
}

interface StyleProps {
	color: Colors
}

const useStyles = makeStyles(
	createStyles({
		line: {
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
			width: 64
		},
		dotCommon: {
			width: 16,
			height: 16,
			borderRadius: '100%',
			display: 'inline-block',
			opacity: 1,
			animation: '$kf_dot_stretch 1.4s infinite ease-in-out both',
			background: ({ color }: StyleProps) =>
				color.name === ThemeNames.DEFAULT ? '#888' : color.main
		},
		dot1: {},
		dot2: {
			animationDelay: '160ms'
		},
		dot3: {
			animationDelay: '320ms'
		},
		'@keyframes kf_dot_stretch': {
			'0%, 80%, 100%': {
				transform: 'scale(0)'
			},
			'40%': {
				transform: 'scale(1)'
			}
		}
	})
)

const Line: React.FC<LineProps> = (props) => {
	const { color = ThemeNames.PRIMARY } = props
	const classes = useStyles({ color: selectColor(color) })

	return (
		<div className={classes.line}>
			<div className={clsx(classes.dotCommon, classes.dot1)}></div>
			<div className={clsx(classes.dotCommon, classes.dot2)}></div>
			<div className={clsx(classes.dotCommon, classes.dot3)}></div>
		</div>
	)
}

export const InternalLine = React.memo(Line)
InternalLine.displayName = 'Line'
