import * as React from 'react'
import { Button, Collapse, List } from 'sylas-react-ui'
import { ThemeContext } from '../App'
import { useVisible } from '../hooks'
import { Example } from './Example'

const codeExample = `
import * as React from 'react'
import { Button, List } from 'sylas-react-ui'
import { Example } from './Example'

function ListExample() {
  
  return (
    <div style={{ width: 440, padding: 16 }}>
      <List bordered>
        <List.Item>Normal</List.Item>
        <List.Item>Normal</List.Item>
        <List.Item hovered>Hovered</List.Item>
        <List.Item bordered={false}>No border</List.Item>
        <List.Item ripple>Has click ripple</List.Item>
        <List.Item bordered hovered ripple>
          Has all effects
        </List.Item>
      </List>
    </div>
  )
}
`

export default function ListExample() {
	const color = React.useContext(ThemeContext)
	const [visible, toggle] = useVisible(false)

	return (
		<>
			<Button color={color} light onClick={toggle}>
				{visible ? 'Hide' : 'Show'} List Example
			</Button>
			<Collapse in={visible}>
				<Example code={codeExample}>
					<div style={{ width: 440, padding: 16 }}>
						<List bordered>
							<List.Item>Normal</List.Item>
							<List.Item>Normal</List.Item>
							<List.Item hovered>Hovered</List.Item>
							<List.Item bordered={false}>No border</List.Item>
							<List.Item ripple>Has click ripple</List.Item>
							<List.Item bordered hovered ripple>
								Has all effects
							</List.Item>
						</List>
					</div>
				</Example>
			</Collapse>
		</>
	)
}
