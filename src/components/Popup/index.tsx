import _Popup, { PopupProps } from './Popup'
import { usePopup } from './hooks'

interface PopupExports
	extends React.MemoExoticComponent<React.ForwardRefExoticComponent<PopupProps & React.HTMLAttributes<HTMLElement>>> {
	usePopup: typeof usePopup
}

const Popup = _Popup as PopupExports
Popup.usePopup = usePopup
Popup.displayName = 'Popup'

export default Popup
