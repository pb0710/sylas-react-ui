import { InternalInput, InputProps } from './Input'

type InputType = React.FC<Omit<InputProps, 'classes'>>

const Input = InternalInput as InputType

export default Input
