import { InternalPopup } from './Popup'
import { usePopup } from './hooks'

type InternalPopupType = typeof InternalPopup
interface PopupType extends InternalPopupType {
	usePopup: typeof usePopup
}

const Popup = InternalPopup as PopupType
Popup.usePopup = usePopup

export default Popup
