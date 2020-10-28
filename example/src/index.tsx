import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { JSSBaseline } from 'sylas-react-ui'
import App from './App'
import TestComponent from './TestComponent'

ReactDOM.render(
	<React.StrictMode>
		{/* JSS 样式优先级较高，若要使用自定义样式覆盖，需将 style 前置插入 */}
		<JSSBaseline>
			{/* <App /> */}
			<TestComponent />
		</JSSBaseline>
	</React.StrictMode>,
	document.getElementById('root')
)
