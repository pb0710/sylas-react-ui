import _Select, { SelectProps } from './Select'
import Option from './Option'

interface SelectExports extends React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<HTMLElement>> {
	Option: typeof Option
}

const Select = _Select as SelectExports
Select.Option = Option

export default Select
