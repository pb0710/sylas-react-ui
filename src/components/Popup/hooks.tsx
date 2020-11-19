import * as React from 'react'

export function usePopup(
	blurNotHidden = false
): {
	visible: boolean
	show(event?: React.MouseEvent<HTMLElement>): void
	hide(): void
	ref: React.RefObject<HTMLElement>
} {
	const [visible, setVisible] = React.useState(false)
	const ref = React.useRef<HTMLElement>(null)

	const blurCauseHide = React.useCallback(
		(event: React.MouseEvent<HTMLElement> | MouseEvent): void => {
			if (blurNotHidden) return
			const targetContained =
				event.target instanceof HTMLElement && ref.current?.contains(event?.target)
			if (targetContained) return
			setVisible(false)
		},
		[blurNotHidden]
	)

	const hide = (): void => {
		setVisible(false)
	}

	const show = (event?: React.MouseEvent<HTMLElement>): void => {
		event?.nativeEvent?.stopImmediatePropagation()
		setVisible(true)
	}

	React.useEffect(() => {
		document.addEventListener('click', blurCauseHide)
		return () => {
			document.removeEventListener('click', blurCauseHide)
		}
	}, [blurCauseHide])

	return { visible, show, hide, ref }
}
