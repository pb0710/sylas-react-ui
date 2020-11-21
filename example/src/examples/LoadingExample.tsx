import * as React from 'react'
import { Button, Collapse, Loading } from 'sylas-react-ui'
import { useVisible } from '../hooks'

export default function ListExample() {
	const [visible, toggle] = useVisible(false)

	return (
		<>
			<Button color="primary" onClick={toggle}>
				{visible ? 'Hide' : 'Show'}Loading Example
			</Button>
			<Collapse in={visible}>
				<div style={{ minWidth: 600, padding: 16 }}>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<Loading />
						<Loading.Bounce />
						<Loading.Line />
					</div>
					<br />
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<Loading color="default" />
						<Loading color="primary" />
						<Loading color="success" />
						<Loading color="warning" />
						<Loading color="error" />
					</div>
					<br />
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<Loading.Line color="default" />
						<Loading.Line color="primary" />
						<Loading.Line color="success" />
						<Loading.Line color="warning" />
						<Loading.Line color="error" />
					</div>
				</div>
			</Collapse>
		</>
	)
}
