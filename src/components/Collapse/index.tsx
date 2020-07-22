import React from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { Transition } from 'react-transition-group'

type typeHeight = number | string

interface ICollpaseProps extends React.HTMLAttributes<HTMLElement> {
	className?: string
	in?: boolean
	timeout?: number
}

interface IStyleProps {
	timeout: number
	height: typeHeight
}

const useStyles = makeStyles(
	createStyles({
		container: ({ height, timeout }: IStyleProps) => ({
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

const _Collapse: React.FC<ICollpaseProps> = props => {
	const { children, className, in: inProp = false, timeout = 300, ...restProps } = props

	const nodeRef = React.useRef<any>()
	const wrapperRef = React.useRef<any>()

	const defaultHeight: typeHeight = inProp ? 'auto' : 0
	const [height, setHeight] = React.useState<typeHeight>(defaultHeight)

	const styleProps: IStyleProps = { height, timeout }
	const classes = useStyles(styleProps)

	/**
	 * css height属性 0 到 auto 间切换无法触发 transition
	 * 解决方案：
	 * 1、先通过 ref 获取 wrapper 的 height
	 * 2、入场动画 从 0 设置 height 触发过渡动画，transition 结束时设置为 auto；
	 * 3、退场动画 反之从 auto 到 height 再到 0
	 */
	const wrapperHeight: typeHeight = wrapperRef.current ? wrapperRef.current?.clientHeight : 0

	const handleEnter = () => {
		setHeight(0)
	}

	const handleEntering = () => {
		setHeight(wrapperHeight)
	}

	const handleEntered = () => {
		setHeight('auto')
	}

	const handleExit = () => {
		setHeight(wrapperHeight)
	}

	const handleExiting = () => {
		setHeight(0)
	}

	return (
		<Transition
			in={inProp}
			onEnter={handleEnter}
			onEntered={handleEntered}
			onEntering={handleEntering}
			onExit={handleExit}
			onExiting={handleExiting}
			nodeRef={nodeRef}
			timeout={timeout}
			{...restProps}
		>
			{(state: string, childProps) => (
				<div
					className={clsx(
						classes.container,
						{
							[classes.entered]: state === 'entered',
							[classes.hidden]: state === 'exited' && !inProp
						},
						className
					)}
					ref={nodeRef}
					{...childProps}
				>
					<div className={classes.wrapper} ref={wrapperRef}>
						<div className={classes.inner}>{children}</div>
					</div>
				</div>
			)}
		</Transition>
	)
}

const Collapse = React.memo(_Collapse)
Collapse.displayName = 'Collapse'

export default Collapse
