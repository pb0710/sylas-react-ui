import * as React from 'react'
import { Tabs } from 'sylas-react-ui'
import { ThemeContext } from '../App'
import Markdown from '../markdown/Markdown'

export function Example(props) {
	const { children, code } = props
	const color = React.useContext(ThemeContext)
	return (
		<div style={{ width: 800 }}>
			<Tabs activeKey="demo" color={color}>
				<Tabs.Panel title="Demo" tabKey="demo">
					<div style={{ padding: 16, display: 'flex', justifyContent: 'center' }}>{children}</div>
				</Tabs.Panel>
				<Tabs.Panel title="Code" tabKey="code">
					<div
						style={{
							width: 800,
							maxHeight: 600,
							overflow: 'auto'
						}}
					>
						<Markdown>{`\`\`\`javascript${code}\`\`\``}</Markdown>
					</div>
				</Tabs.Panel>
			</Tabs>
		</div>
	)
}
