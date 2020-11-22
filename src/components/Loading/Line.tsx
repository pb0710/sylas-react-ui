import * as React from 'react'
import { withStyles, createStyles, WithStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { Theme, ColorType } from '../jssBaseline/theme'
import { capitalize } from '../../utils'

const dotCommon = {
	opacity: 1,
	display: 'inline-block',
	width: 16,
	height: 16,
	borderRadius: '100%',
	animation: '$kf_dot_stretch 1.4s infinite ease-in-out both'
}

const styles = (theme: Theme) =>
	createStyles({
		line: {
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
			width: 64
		},
		dotPrimary: {
			...dotCommon,
			background: theme.palette.primary.main
		},
		dotSuccess: {
			...dotCommon,
			background: theme.palette.success.main
		},
		dotWarning: {
			...dotCommon,
			background: theme.palette.warning.main
		},
		dotError: {
			...dotCommon,
			background: theme.palette.error.main
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

interface LineProps extends WithStyles<typeof styles> {
	color?: ColorType
}

const Line: React.FC<LineProps> = (props) => {
	const { classes, color = 'primary' } = props
	const dotCls = classes[`dot${capitalize(color)}`]
	return (
		<div className={classes.line}>
			<div className={clsx(dotCls, classes.dot1)}></div>
			<div className={clsx(dotCls, classes.dot2)}></div>
			<div className={clsx(dotCls, classes.dot3)}></div>
		</div>
	)
}

export const InternalLine = React.memo(withStyles(styles, { name: 'LoadingLine' })(Line))
InternalLine.displayName = 'Line'
