import React from 'react'
import _ from 'lodash'
import Input, { IInputProps, InputTypes } from './Input'

const _Password: React.ForwardRefRenderFunction<unknown, IInputProps> = (props, ref) => {
	const newProps = _.omit(props, ['placeholder'])
	return <Input {...newProps} ref={ref as any} type={InputTypes.PASSWORD} />
}

const Password = React.memo(React.forwardRef<unknown, IInputProps>(_Password))
Password.displayName = 'Password'

export default Password
