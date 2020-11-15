import { InternalOption } from './Option'
import { InternalSelect, SelectProps } from './Select'

interface SelectType extends React.FC<Omit<SelectProps, 'classes'>> {
	Option: typeof InternalOption
}

const Select = InternalSelect as SelectType
Select.Option = InternalOption

export default Select
