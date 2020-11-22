import * as React from 'react'
import { Progress, Divider, Select } from 'sylas-react-ui'
import ButtonExample from './examples/ButtonExample'
import FormExample from './examples/FormExample'
import ListExample from './examples/ListExample'
import LoadingExample from './examples/LoadingExample'
import PopupExample from './examples/PopupExample'
import MenuExample from './examples/MenuExample'
import TagExample from './examples/TagExample'
import TabsExample from './examples/TabsExample'

export const ThemeContext = React.createContext<any>('primary')

function App() {
	const [theme, setTheme] = React.useState<any>('primary')
	return (
		<>
			<ThemeContext.Provider value={theme}>
				<Progress percent={33} fixedTop />
				<div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
					<br />
					<h1>Example</h1>
					<br />
					<Divider />
					<Select value={theme} onValueChange={setTheme} description="Theme" color={theme}>
						<Select.Option value="primary">Primary</Select.Option>
						<Select.Option value="success">Success</Select.Option>
						<Select.Option value="warning">Warning</Select.Option>
						<Select.Option value="error">Error</Select.Option>
					</Select>
					<Divider />
					<TabsExample />
					<Divider />
					<FormExample />
					<Divider />
					<MenuExample />
					<Divider />
					<ButtonExample />
					<Divider />
					<LoadingExample />
					<Divider />
					<PopupExample />
					<Divider />
					<ListExample />
					<Divider />
					<TagExample />
					<Divider />
				</div>
			</ThemeContext.Provider>
		</>
	)
}
export default App
