import { createStyles, withStyles, WithStyles } from '@material-ui/styles'
import clsx from 'clsx'
import * as React from 'react'

const styles = createStyles({
	aspectRatio: {
		position: 'relative',
		width: '100%',
		height: 0
	},
	content: {
		position: 'absolute',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		width: '100%',
		height: 'auto'
	}
})

interface AspectRatioProps extends WithStyles<typeof styles>, React.HTMLAttributes<HTMLElement> {
	className?: string
	aspectRatio?: number
}

const InternalAspectRatio: React.FC<AspectRatioProps> = (props) => {
	const { classes, children, className, aspectRatio = 1 / 2, style, ...rest } = props
	const aspectRatioCls = clsx(classes.aspectRatio, className)

	return (
		<div
			{...rest}
			className={aspectRatioCls}
			style={{
				...style,
				paddingBottom: `calc(${aspectRatio} * 100%)`
			}}
		>
			<div className={classes.content}>{children}</div>
		</div>
	)
}

const AspectRatio = React.memo(withStyles(styles, { name: 'AspectRatio' })(InternalAspectRatio))
AspectRatio.displayName = 'AspectRatio'

export default AspectRatio
