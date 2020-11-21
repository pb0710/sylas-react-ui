import * as React from 'react'
import { Button, Collapse, List } from 'sylas-react-ui'
import { useVisible } from '../hooks'

export default function ListExample() {
	const [visible, toggle] = useVisible(false)

	return (
		<>
			<Button color="primary" onClick={toggle}>
				{visible ? 'Hide' : 'Show'}List Example
			</Button>
			<Collapse in={visible}>
				<div style={{ width: 440, padding: 16 }}>
					<List bordered>
						<List.Item>Normal</List.Item>
						<List.Item>Normal</List.Item>
						<List.Item hovered>Hovered</List.Item>
						<List.Item bordered={false}>No border</List.Item>
						<List.Item ripple>has click ripple</List.Item>
						<List.Item bordered hovered ripple>
							Has all effects
						</List.Item>
					</List>
				</div>
			</Collapse>
		</>
	)
}
