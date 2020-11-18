import { InternalOption } from './Option'
import { InternalSelect } from './Select'

type InternalSelectType = typeof InternalSelect
interface SelectType extends InternalSelectType {
	Option: typeof InternalOption
}

const Select = InternalSelect as SelectType
Select.Option = InternalOption

export default Select
