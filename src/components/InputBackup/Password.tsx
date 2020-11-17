import * as React from 'react'
import Input, { InputProps, InputTypes } from './Input'

const _Password: React.ForwardRefRenderFunction<unknown, InputProps> = (props, ref) => {
	return <Input {...props} ref={ref as any} type={InputTypes.PASSWORD} />
}

const Password = React.memo(React.forwardRef<unknown, InputProps>(_Password))
Password.displayName = 'Password'

export default Password
