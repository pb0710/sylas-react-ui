import * as React from 'react'
import { Button, Collapse } from 'sylas-react-ui'
import { PictureOutlined } from '@ant-design/icons'
import { useVisible } from '../hooks'

export default function ButtonExample() {
	const [visible, toggle] = useVisible(false)

	return (
		<>
			<Button color="primary" onClick={toggle}>
				{`${visible ? 'Hide' : 'Show'} Button Example`}
			</Button>
			<Collapse in={visible}>
				<div style={{ minWidth: 600, padding: 16 }}>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<Button>Button</Button>
						<Button.Icon>
							<PictureOutlined />
						</Button.Icon>
						<Button.Icon style={{ color: 'orange' }}>
							<PictureOutlined />
						</Button.Icon>
						<Button.Icon style={{ fontSize: 24 }}>
							<PictureOutlined />
						</Button.Icon>
					</div>
					<br />
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<Button color="default">Default</Button>
						<Button color="primary">Primary</Button>
						<Button color="success">Success</Button>
						<Button color="warning">Warning</Button>
						<Button color="error">Error</Button>
					</div>
				</div>
			</Collapse>
		</>
	)
}
