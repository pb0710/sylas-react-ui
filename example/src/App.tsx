import * as React from 'react'
import { Progress, Divider } from 'sylas-react-ui'
import ButtonExample from './examples/ButtonExample'
import FormExample from './examples/FormExample'
import ListExample from './examples/ListExample'
import LoadingExample from './examples/LoadingExample'
import PopupExample from './examples/PopupExample'

function App() {
	return (
		<>
			<Progress percent={33} fixedTop />
			<div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
				<h1>Example</h1>
				<Divider />
				<FormExample />
				<Divider />
				<ListExample />
				<Divider />
				<LoadingExample />
				<Divider />
				<ButtonExample />
				<Divider />
				<PopupExample />
				<Divider />
			</div>
		</>
	)
}
export default App
