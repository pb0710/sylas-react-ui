import * as React from 'react'

export interface TransitionOpts {
	in?: boolean
	timeout?: number
	onExited?(): void
	callback?(): void
}

export function useTransition(options: TransitionOpts): void {
	const { in: inProp = false, onExited = () => {}, timeout = 0, callback } = options
	React.useEffect(() => {
		if (!inProp) {
			callback && callback()
			// delay unmount for animations
			const exitTimer = setTimeout(onExited, timeout)
			return () => {
				clearTimeout(exitTimer)
			}
		}
	}, [callback, inProp, onExited, timeout])
}

export function useBoolean(
	initial: boolean
): [
	boolean,
	{
		setTrue: () => void
		setFalse: () => void
		setToggle: () => void
	}
] {
	const [state, setState] = React.useState(initial)
	const setTrue = React.useCallback(() => {
		setState(true)
	}, [])
	const setFalse = React.useCallback(() => {
		setState(false)
	}, [])
	const setToggle = React.useCallback(() => {
		setState((prev) => !prev)
	}, [])
	return [state, { setTrue, setFalse, setToggle }]
}

export function useInternalState<S = unknown>(
	outerState: S
): [S, React.Dispatch<React.SetStateAction<S>>] {
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
