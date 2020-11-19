import * as React from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { Transition } from 'react-transition-group'

type heightType = number | string

interface CollpaseProps extends React.HTMLAttributes<HTMLElement> {
	className?: string
	in?: boolean
	timeout?: number
}

interface StyleProps {
	timeout: number
	height: heightType
}

const useStyles = makeStyles(
	createStyles({
		container: ({ height, timeout }: StyleProps) => ({
			minHeight: 0,
			height,
			transition: `height ${timeout}ms ease-out`,
			overflow: 'hidden'
		}),
		entered: {
			height: 'auto',
			overflow: 'visible'
		},
		hidden: {
			visibility: 'hidden'
		},
		wrapper: {
			display: 'flex',
			width: '100%'
		},
		inner: {
			width: '100%',
			paddingTop: 8,
			paddingBottom: 8
		}
	})
)

const InternalCollapse: React.FC<CollpaseProps> = (props) => {
	const { children, className = '', in: inProp = false, timeout = 250, ...restProps } = props

	const nodeRef = React.useRef(Object.create(null))
	const wrapperRef = React.useRef(Object.create(null))

	const defaultHeight: heightType = inProp ? 'auto' : 0
	const [height, setHeight] = React.useState<heightType>(defaultHeight)

	const classes = useStyles({ height, timeout })

	/**
	 * css height属性 0 到 auto 间切换无法触发 transition
	 * 解决方案：
	 * 1、先通过 ref 获取 wrapper 的 height
	 * 2、入场动画 从 0 设置 height 触发过渡动画，transition 结束时设置为 auto；
	 * 3、退场动画 反之从 auto 到 height 再到 0
	 */
	const wrapperHeight: heightType = wrapperRef.current ? wrapperRef.current?.clientHeight : 0
	const transitionNodeRef = Object.keys(nodeRef.current).length
		? nodeRef
		: React.createRef<JSX.Element>()

	const handleEnter = (): void => {
		setHeight(0)
	}
	const handleEntering = (): void => {
		setHeight(wrapperHeight)
	}
	const handleEntered = (): void => {
		setHeight('auto')
	}
	const handleExit = (): void => {
		setHeight(wrapperHeight)
	}
	const handleExiting = (): void => {
		setHeight(0)
	}

	const getCollapseCls = (state: string): string =>
		clsx({
			[classes.container]: true,
			[classes.entered]: state === 'entered',
			[classes.hidden]: state === 'exited' && !inProp,
			[className]: true
		})

	return (
		<Transition
			in={inProp}
			onEnter={handleEnter}
			onEntered={handleEntered}
			onEntering={handleEntering}
			onExit={handleExit}
			onExiting={handleExiting}
			nodeRef={transitionNodeRef}
			timeout={timeout}
			{...restProps}
		>
			{(state: string, childProps: CollpaseProps) => (
				<div className={getCollapseCls(state)} ref={nodeRef} {...childProps}>
					<div className={classes.wrapper} ref={wrapperRef}>
						<div className={classes.inner}>{children}</div>
					</div>
				</div>
			)}
		</Transition>
	)
}

const Collapse = React.memo(InternalCollapse)
Collapse.displayName = 'Collapse'

export default Collapse
