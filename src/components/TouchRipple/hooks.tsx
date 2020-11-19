import * as React from 'react'

/**
 * 绑定水波纹特效
 * @param {boolean} muted 是否禁用
 */
export function useRipple(
	muted = false
): {
	rippleRef: React.RefObject<unknown>
	handleStart(event: React.MouseEvent<HTMLElement>): void | null
	handleStop(): void | null
} {
	const rippleRef: React.RefObject<any> = React.useRef<any>(null)

	const handleStart = React.useCallback(
		(event: React.MouseEvent<HTMLElement>): void => {
			event.preventDefault()
			event.stopPropagation()
			return muted ? null : rippleRef.current.start(event)
		},
		[muted]
	)

	const handleStop = React.useCallback(() => (muted ? null : rippleRef.current.stop()), [muted])

	return { rippleRef, handleStart, handleStop }
}
