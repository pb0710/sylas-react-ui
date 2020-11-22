import * as React from 'react'
import { createStyles, WithStyles, withStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { Theme, ColorType } from '../jssBaseline/theme'

const styles = (theme: Theme) =>
	createStyles({
		progress: {
			position: 'relative',
			width: '100%',
			height: 2
		},
		line: {
			height: '100%',
			position: 'absolute',
			top: 0,
			left: 0,
			transition: 'all .2s'
		},
		primary: {
			background: theme.palette.primary.main
		},
		success: {
			background: theme.palette.success.main
		},
		warning: {
			background: theme.palette.warning.main
		},
		error: {
			background: theme.palette.error.main
		},
		fixedTop: {
			zIndex: 99,
			position: 'fixed',
			top: 0,
			left: 0
		}
	})
interface ProgressProps extends WithStyles<typeof styles>, React.HTMLAttributes<HTMLDivElement> {
	className?: string
	percent?: number
	color?: ColorType
	trailColor?: string
	fixedTop?: boolean
}

const InternalProgress: React.FC<ProgressProps> = (props) => {
	const {
		classes,
		className,
		percent = 0,
		color = 'primary',
		trailColor = 'rgba(0,0,0,0)',
		fixedTop = false,
		...rest
	} = props

	const progressCls = clsx(
		classes.progress,
		{
			[classes.fixedTop]: fixedTop
		},
		className
	)
	const lineCls = clsx(classes.line, classes[color])

	return (
		<div {...rest} className={progressCls} style={{ background: trailColor }}>
			<div className={lineCls} style={{ width: `${percent}%` }}></div>
		</div>
	)
}

const Progress = React.memo(withStyles(styles, { name: 'Progress' })(InternalProgress))
Progress.displayName = 'Progress'

export default Progress
