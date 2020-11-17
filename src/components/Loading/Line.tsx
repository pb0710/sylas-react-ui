import * as React from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { ThemeNames, Colors, selectColor } from '../../common/themeColors'

interface LineProps {
	color?: string
}

interface StyleProps {
	color: Colors
}

const useStyles = makeStyles(
	createStyles({
		root: {
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

const _Line: React.FC<LineProps> = (props) => {
	const { color = ThemeNames.PRIMARY } = props
	const stylesProps: StyleProps = { color: selectColor(color) }
	const classes = useStyles(stylesProps)

	return (
		<div className={classes.root}>
			<div className={clsx(classes.dotCommon, classes.dot1)}></div>
			<div className={clsx(classes.dotCommon, classes.dot2)}></div>
			<div className={clsx(classes.dotCommon, classes.dot3)}></div>
		</div>
	)
}

const Line = React.memo(_Line)
Line.displayName = 'Line'

export default Line
