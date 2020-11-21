import * as React from 'react'
import { Progress, Divider } from 'sylas-react-ui'
import ButtonExample from './examples/ButtonExample'
import FormExample from './examples/FormExample'
import ListExample from './examples/ListExample'
import LoadingExample from './examples/LoadingExample'
import PopupExample from './examples/PopupExample'
import MenuExample from './examples/MenuExample'

function App() {
	return (
		<>
			<Progress percent={33} fixedTop />
			<div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
				<h1>Example</h1>
				<Divider />
				<FormExample />
				<Divider />
				<MenuExample />
				<Divider />
				<PopupExample />
				<Divider />
				<LoadingExample />
				<Divider />
				<ButtonExample />
				<Divider />
				<ListExample />
				<Divider />
			</div>
		</>
	)
}
export default App
