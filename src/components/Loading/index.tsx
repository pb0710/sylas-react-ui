import * as React from 'react'
import _Loading, { LoadingProps } from './Loading'
import Bounce from './Bounce'
import Line from './Line'

interface LoadingExports extends React.MemoExoticComponent<React.FC<LoadingProps>> {
	Bounce: typeof Bounce
	Line: typeof Line
}

const Loading = _Loading as LoadingExports

Loading.Bounce = Bounce
Loading.Line = Line

export default Loading
