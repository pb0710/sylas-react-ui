import * as React from 'react'
import { Button, Collapse, Loading, Tabs } from 'sylas-react-ui'
import { ThemeContext } from '../App'
import { useVisible } from '../hooks'

export default function TabsExample() {
	const color = React.useContext(ThemeContext)
	const [visible, toggle] = useVisible(false)

	const containerStyle = {
		display: 'flex',
		justifyContent: 'center',
		flexFlow: 'column',
		alignItems: 'center',
		height: 280
	}

	return (
		<>
			<Button color={color} light onClick={toggle}>
				{visible ? 'Hide' : 'Show'} Tabs Example
			</Button>
			<Collapse in={visible}>
				<div style={{ width: 400, padding: 16 }}>
					<Tabs color={color} activeKey="aaa">
						<Tabs.Panel title="tabaaa" tabKey="aaa">
							<div style={containerStyle}>
								<h1>containeraaa</h1>
								<Loading color="success" />
								<br />
								<Loading.Line color="success" />
							</div>
						</Tabs.Panel>
						<Tabs.Panel title="tabbbb" tabKey="bbb">
							<div style={containerStyle}>
								<h1>containerbbb</h1>
								<Loading color="warning" />
								<br />
								<Loading.Line color="warning" />
							</div>
						</Tabs.Panel>
						<Tabs.Panel title="tabccc" tabKey="ccc">
							<div style={containerStyle}>
								<h1>containerccc</h1>
								<Loading color="error" />
								<br />
								<Loading.Line color="error" />
							</div>
						</Tabs.Panel>
					</Tabs>
				</div>
			</Collapse>
		</>
	)
}
