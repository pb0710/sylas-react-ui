import React from 'react'

export interface LoadingProps {}

const _Loading: React.FC<LoadingProps> = props => {
	return <div></div>
}

const Loading = React.memo(_Loading)
Loading.displayName = 'Loading'

export default Loading
