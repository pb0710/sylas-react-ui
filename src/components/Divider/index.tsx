import * as React from 'react'
import clsx from 'clsx'
import { makeStyles, createStyles } from '@material-ui/styles'

interface StyleProps {
	dashed: boolean
	titleCentered: boolean
}

interface DividerProps extends React.HTMLAttributes<HTMLElement> {
	className?: string
	title?: string
	titleCentered?: boolean
	dashed?: boolean
}

const useStyles = makeStyles(
	createStyles({
		divider: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			width: '100%',
			border: 0,
			borderTopWidth: 1,
			borderTopStyle: ({ dashed }: StyleProps) => (dashed ? 'dashed' : 'solid'),
			borderTopColor: '#f1f1f1',
			margin: '8px 0',
			padding: 0,
			position: 'relative'
		},
		title: ({ titleCentered }: StyleProps) => ({
			background: '#fff',
			padding: '0 8px',
			position: 'absolute',
			[titleCentered ? 'none' : 'left']: 16
		})
	})
)

const InternalDivider: React.FC<DividerProps> = (props) => {
	const { children, className, dashed = false, titleCentered = true } = props
	const classes = useStyles({ dashed, titleCentered })
	const dividerCls = clsx(classes.divider, className)

	return (
		<div className={dividerCls}>
			<span className={classes.title}>{children}</span>
		</div>
	)
}

const Divider = React.memo(InternalDivider)
Divider.displayName = 'Divider'

export default Divider
