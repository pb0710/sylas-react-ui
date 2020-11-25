import * as React from 'react'
import { useBoolean } from '../../utils/hooks'

export function usePopup(
	initial: boolean = false
): [
	boolean,
	React.MutableRefObject<unknown>,
	{
		show: () => void
		hide: () => void
		toggle: () => void
	}
] {
	const [visible, { setTrue, setFalse, toggle: setToggle }] = useBoolean(initial)
	const popupRef = React.useRef(Object.create(null))

	const hidePopup = React.useCallback(
		(event: MouseEvent): void => {
			const elem = event.target
			const contained = popupRef.current?.contains(elem)
			if (!contained) {
				setFalse()
			}
		},
		[setFalse]
	)

	const show = React.useCallback((): void => {
		setTrue()
	}, [setTrue])

	const toggle = React.useCallback((): void => {
		setToggle()
	}, [setToggle])

	const hide = React.useCallback((): void => {
		setFalse()
	}, [setFalse])

	React.useEffect(() => {
		const root = document.querySelector('#root')
		if (root && visible) {
			root.removeEventListener('click', hidePopup)
			root.addEventListener('click', hidePopup)
		}
		return () => {
			document.querySelector('#root')?.removeEventListener('click', hidePopup)
		}
	}, [hidePopup, visible])

	return [visible, popupRef, { show, hide, toggle }]
}
