import { InternalCheckBox } from './CheckBox'

type InternalCheckBoxType = typeof InternalCheckBox
interface CheckBoxType extends InternalCheckBoxType {
	Group: any
}

const CheckBox = InternalCheckBox as CheckBoxType
CheckBox.Group = 'Group'

export default CheckBox
