import _Input, { IInputProps } from './Input'
import Search from './Search'
import Password from './Password'
import TextArea from './TextArea'
import Group from './Group'

interface IInputExport
	extends React.MemoExoticComponent<
		React.ForwardRefExoticComponent<IInputProps & React.RefAttributes<HTMLElement>>
	> {
	Password: typeof Password
	Search: typeof Search
	TextArea: typeof TextArea
	Group: typeof Group
}

const Input = _Input as IInputExport
Input.Search = Search
Input.Password = Password
Input.TextArea = TextArea
Input.Group = Group

export default Input
