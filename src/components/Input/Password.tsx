import React from 'react'
import Input, { IInputProps, InputTypes } from './Input'

const _Password: React.ForwardRefRenderFunction<unknown, IInputProps> = (props, ref) => {
	return <Input {...props} ref={ref as any} type={InputTypes.PASSWORD} />
}

const Password = React.memo(React.forwardRef<unknown, IInputProps>(_Password))
Password.displayName = 'Password'

export default Password
