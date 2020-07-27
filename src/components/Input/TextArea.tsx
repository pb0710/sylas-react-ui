import React from 'react'
import Input, { IInputProps } from './Input'
import { TextAreaBase } from './baseComponents'

const _TextArea: React.ForwardRefRenderFunction<unknown, IInputProps> = (props, ref) => {
	return <Input {...props} ref={ref as any} Component={TextAreaBase} />
}

const TextArea = React.memo(React.forwardRef<unknown, IInputProps>(_TextArea))
TextArea.displayName = 'TextArea'

export default TextArea
