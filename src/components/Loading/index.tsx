import React from 'react'
import _Loading, { ILoadingProps } from './Loading'
import Bounce from './Bounce'
import Line from './Line'

interface ILoadingExports extends React.MemoExoticComponent<React.FC<ILoadingProps>> {
	Bounce: typeof Bounce
	Line: typeof Line
}

const Loading = _Loading as ILoadingExports

Loading.Bounce = Bounce
Loading.Line = Line

export default Loading
