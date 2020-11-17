import * as React from 'react'
import Input, { InputProps, InputTypes } from './Input'

const _Search: React.ForwardRefRenderFunction<unknown, InputProps> = (props, ref) => (
	<Input {...props} ref={ref as any} type={InputTypes.SEARCH} />
)

const Search = React.memo(React.forwardRef<unknown, InputProps>(_Search))
Search.displayName = 'Search'

export default Search
