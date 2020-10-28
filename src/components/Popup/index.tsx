import _Popup, { PopupProps } from './Popup'
import { usePopupVisible } from './hooks'

interface PopupExports
	extends React.MemoExoticComponent<
		React.ForwardRefExoticComponent<PopupProps & React.HTMLAttributes<HTMLElement>>
	> {
	usePopupVisible: typeof usePopupVisible
}

const Popup = _Popup as PopupExports
Popup.usePopupVisible = usePopupVisible

Popup.displayName = 'Popup'

export default Popup
