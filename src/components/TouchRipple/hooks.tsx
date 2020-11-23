import * as React from 'react'

/**
 * 绑定水波纹特效
 * @param {boolean} disabled 是否禁用
 */
export function useRipple(
	disabled = false
): [
	React.MutableRefObject<any>,
	(
		| {
				onMouseDown: (event: React.MouseEvent<HTMLElement>) => void
				onMouseUp: () => void
				onMouseLeave: () => void
		  }
		| {}
	)
] {
	const rippleRef = React.useRef(Object.create(null))

	const handleStart = React.useCallback((event: React.MouseEvent<HTMLElement>): void => {
		event.stopPropagation()
		return rippleRef.current?.start?.(event)
	}, [])

	const handleStop = React.useCallback(() => rippleRef.current?.stop?.(), [])

	const controlProps = React.useMemo(
		() =>
			disabled
				? {}
				: {
						onMouseDown: handleStart,
						onMouseUp: handleStop,
						onMouseLeave: handleStop
				  },
		[]
	)

	return [rippleRef, controlProps]
}
