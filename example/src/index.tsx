import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import App from './App'
import { JSSBaseline } from 'sylas-react-ui'

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			{/* JSS 样式优先级较高，若要使用自定义样式覆盖，需将 style 前置插入 */}
			<JSSBaseline>
				<Route path="/" exact component={App} />
			</JSSBaseline>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
)
