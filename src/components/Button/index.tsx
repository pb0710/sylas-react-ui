import { InternalButton } from './Button'
import { InternalIconButton } from './IconButton'

type InternalButtonType = typeof InternalButton
interface ButtonType extends InternalButtonType {
	Icon: typeof InternalIconButton
}

const Button = InternalButton as ButtonType
Button.Icon = InternalIconButton

export default Button
