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

export function useInternalState<S = unknown>(outerState: S): [S, React.Dispatch<React.SetStateAction<S>>] {
	const [state, setState] = React.useState(outerState)

	React.useEffect(() => {
		setState(outerState)
	}, [outerState])

	return [state, setState]
}

export function useForceUpdate(): () => void {
	const [, dispatch] = React.useState(Object.create(null))

	// turn dispatch(required_parameter) into dispatch().
	const memoizedDispatch = React.useCallback((): void => {
		dispatch(Object.create(null))
	}, [dispatch])
	return memoizedDispatch
}
