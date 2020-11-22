import * as React from 'react'
import { Button, Collapse, Loading } from 'sylas-react-ui'
import { ThemeContext } from '../App'
import { useVisible } from '../hooks'

export default function ListExample() {
	const color = React.useContext(ThemeContext)
	const [visible, toggle] = useVisible(false)

	return (
		<>
			<Button color={color} light onClick={toggle}>
				{visible ? 'Hide' : 'Show'}Loading Example
			</Button>
			<Collapse in={visible}>
				<div style={{ minWidth: 520, padding: 16 }}>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<Loading color={color} />
						<Loading.Bounce color={color} />
						<Loading.Line color={color} />
					</div>
					<br />
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<Loading color="primary" />
						<Loading color="success" />
						<Loading color="warning" />
						<Loading color="error" />
					</div>
					<br />
					<br />
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
