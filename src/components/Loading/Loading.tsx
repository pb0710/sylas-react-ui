import React from 'react'

export interface ILoadingProps {}

const _Loading: React.FC<ILoadingProps> = props => {
	return <div></div>
}

const Loading = React.memo(_Loading)
Loading.displayName = 'Loading'

export default Loading
