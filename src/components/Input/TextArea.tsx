import React from 'react'
import Input, { InputProps } from './Input'
import { TextAreaBase } from './baseComponents'

const _TextArea: React.ForwardRefRenderFunction<unknown, InputProps> = (props, ref) => {
	return <Input {...props} ref={ref as any} Component={TextAreaBase} />
}

const TextArea = React.memo(React.forwardRef<unknown, InputProps>(_TextArea))
TextArea.displayName = 'TextArea'

export default TextArea
