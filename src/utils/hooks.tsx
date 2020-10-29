import React from 'react'

export interface TransitionOpts {
	in?: boolean
	timeout?: number
	onExited?(): void
	callback?(): void
}

export const useTransition = (options: TransitionOpts): void => {
	const { in: inProp = false, onExited = () => {}, timeout = 0, callback } = options
	React.useEffect(() => {
		if (!inProp) {
			callback && callback()
			// 组件延迟卸载
			const exitTimer = setTimeout(onExited, timeout)
			return () => {
				clearTimeout(exitTimer)
			}
		}
	}, [callback, inProp, onExited, timeout])
}
