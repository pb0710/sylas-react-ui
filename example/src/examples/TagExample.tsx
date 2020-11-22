import * as React from 'react'
import { Button, Collapse, Tag } from 'sylas-react-ui'
import { ThemeContext } from '../App'
import { useVisible } from '../hooks'

export default function TagExample() {
	const color = React.useContext(ThemeContext)
	const [visible, toggle] = useVisible(false)

	const handleClose = () => {
		console.log('tag closed')
	}

	return (
		<>
			<Button color={color} light onClick={toggle}>
				{visible ? 'Hide' : 'Show'} Tag Example
			</Button>
			<Collapse in={visible}>
				<div style={{ width: 440, padding: 16 }}>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<Tag color="primary">primary</Tag>
						<Tag color="success">success</Tag>
						<Tag color="warning">warning</Tag>
						<Tag color="error">error</Tag>
					</div>
					<br />
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<Tag color={color}>normal</Tag>
						<Tag color={color} closeable onClose={handleClose}>
							closable
						</Tag>
					</div>
				</div>
			</Collapse>
		</>
	)
}
