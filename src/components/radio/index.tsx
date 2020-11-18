import { InternalRadio } from './Radio'
import { InternalRadioGroup } from './RadioGroup'

type InternalRadioType = typeof InternalRadio
interface RadioType extends InternalRadioType {
	Group: typeof InternalRadioGroup
}

const Radio = InternalRadio as RadioType
Radio.Group = InternalRadioGroup

export default Radio
