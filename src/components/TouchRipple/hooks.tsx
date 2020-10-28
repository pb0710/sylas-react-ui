import React from 'react'

export interface UseRipple {
	(muted?: boolean): UseRippleReturn
}

export interface UseRippleReturn {
	rippleRef: React.RefObject<any>
	handleStart(event: React.MouseEvent<HTMLElement>): void | null
	handleStop(): void | null
}

/**
 * 绑定水波纹特效
 * @param {boolean} muted 是否禁用
 */
export const useRipple: UseRipple = (muted = false) => {
	const rippleRef: React.MutableRefObject<any> = React.useRef()

	const handleStart = React.useCallback(e => (muted ? null : rippleRef.current.start(e)), [muted])

	const handleStop = React.useCallback(() => (muted ? null : rippleRef.current.stop()), [muted])

	return { rippleRef, handleStart, handleStop }
}
