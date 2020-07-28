import React from 'react'
import Input, { IInputProps, InputTypes } from './Input'

const _Search: React.ForwardRefRenderFunction<unknown, IInputProps> = (props, ref) => (
	<Input {...props} ref={ref as any} type={InputTypes.SEARCH} />
)

const Search = React.memo(React.forwardRef<unknown, IInputProps>(_Search))
Search.displayName = 'Search'

export default Search
