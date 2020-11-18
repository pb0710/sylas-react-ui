import { InternalCheckBox } from './CheckBox'
import { InternalCheckBoxGroup } from './CheckBoxGroup'

type InternalCheckBoxType = typeof InternalCheckBox
interface CheckBoxType extends InternalCheckBoxType {
	Group: typeof InternalCheckBoxGroup
}

const CheckBox = InternalCheckBox as CheckBoxType
CheckBox.Group = InternalCheckBoxGroup

export default CheckBox
