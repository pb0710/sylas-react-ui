import * as React from 'react'
import { Button, Collapse } from 'sylas-react-ui'
import { UserOutlined } from '@ant-design/icons'
import { useVisible } from '../hooks'
import { ThemeContext } from '../App'

export default function ButtonExample() {
	const color = React.useContext(ThemeContext)
	const [visible, toggle] = useVisible(false)

	return (
		<>
			<Button color={color} light onClick={toggle}>
				{visible ? 'Hide' : 'Show'}Button Example
			</Button>
			<Collapse in={visible}>
				<div style={{ minWidth: 560, padding: 16 }}>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<Button color="primary">Primary</Button>
						<Button color="success">Success</Button>
						<Button color="warning">Warning</Button>
						<Button color="error">Error</Button>
					</div>
					<br />
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<Button color="primary" light>
							Primary
						</Button>
						<Button color="success" light>
							Success
						</Button>
						<Button color="warning" light>
							Warning
						</Button>
						<Button color="error" light>
							Error
						</Button>
					</div>
					<br />
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<Button color={color}>Button</Button>
						<Button color={color} disabled>
							Button
						</Button>
						<Button color={color} disabled light>
							Button
						</Button>
					</div>
					<br />
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<Button.Icon>
							<UserOutlined />
						</Button.Icon>
						<Button.Icon focus>
							<UserOutlined />
						</Button.Icon>
						<Button.Icon disabled>
							<UserOutlined />
						</Button.Icon>
						<Button.Icon style={{ color: 'purple' }}>
							<UserOutlined />
						</Button.Icon>
						<Button.Icon style={{ fontSize: 24 }}>
							<UserOutlined />
						</Button.Icon>
					</div>
				</div>
			</Collapse>
		</>
	)
}
