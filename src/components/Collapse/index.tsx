import React from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'
import clsx from 'clsx'

interface ICollpaseProps extends React.HTMLAttributes<HTMLElement> {
	className?: string
	visible?: boolean
}

interface IStyleProps {
	visible: boolean
}

const useStyles = makeStyles(
	createStyles({
		root: ({ visible }: IStyleProps) => ({
			overflow: 'hidden',
			transition: 'max-height .4s cubic-bezier(0, 1, 0, 1) -.1s',
			// 因为 height 的 auto 到 0 不会触发transition，所以用 max-height 代替，需动态调整 cubic-bezier
			...(visible
				? {
						// 确保高度不超过 1600px 即可
						maxHeight: 1600,
						transitionTimingFunction: 'cubic-bezier(0.5, 0, 1, 0)',
						transitionDelay: '0s'
				  }
				: {
						maxHeight: 0
				  })
		}),
		wrapper: {
			paddingTop: 8,
			paddingBottom: 8
		}
	})
)

const _Collapse: React.FC<ICollpaseProps> = props => {
	const { children, className, visible = false, ...restProps } = props

	const classes = useStyles({ visible } as IStyleProps)

	const containerCls = clsx(classes.root, className)

	return (
		<div {...restProps} className={containerCls}>
			<div className={classes.wrapper}>{children}</div>
		</div>
	)
}

const Collapse = React.memo(_Collapse)
Collapse.displayName = 'Collapse'

export default Collapse
