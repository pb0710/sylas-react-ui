import * as React from 'react'

type ShowParam = { nativeEvent: { stopImmediatePropagation: () => void } }

export function usePopup(
	blurNotHidden = false
): { visible: boolean; show(e?: ShowParam): void; hide(): void; ref: React.RefObject<HTMLElement> } {
	const [visible, setVisible] = React.useState(false)
	const ref = React.useRef<HTMLElement>(null)

	const blurCauseHide = React.useCallback(
		(e) => {
			const dom = ref.current
			if (blurNotHidden) return
			if (dom?.contains(e?.target)) return

			console.log('hide')
			setVisible(false)
		},
		[blurNotHidden]
	)

	const hide = () => {
		setVisible(false)
	}

	const show = (e?: ShowParam) => {
		e?.nativeEvent?.stopImmediatePropagation()
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
