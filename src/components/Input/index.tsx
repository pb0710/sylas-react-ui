import { InternalInput } from './Input'
import { InternalTextarea } from './Textarea'

type InternalInputType = typeof InternalInput
interface InputType extends InternalInputType {
	Textarea: typeof InternalTextarea
}

const Input = InternalInput as InputType
Input.Textarea = InternalTextarea

export default Input
