import _Select, { ISelectProps } from './Select'
import Option from './Option'

interface ISelectExports
	extends React.ForwardRefExoticComponent<ISelectProps & React.RefAttributes<HTMLElement>> {
	Option: typeof Option
}

const Select = _Select as ISelectExports
Select.Option = Option

export default Select
