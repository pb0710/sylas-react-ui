import * as React from 'react'
import { UserOutlined } from '@ant-design/icons'
import { Button, Collapse, Popup } from 'sylas-react-ui'
import { useVisible } from '../hooks'
import { ThemeContext } from '../App'

export default function PopupExample() {
	const color = React.useContext(ThemeContext)
	const [visible, toggle] = useVisible(false)
	const [popupVisible, popupToggle] = useVisible(false)
	const [popup2Visible, popup2Toggle] = useVisible(false)

	return (
		<>
			<Button color={color} light onClick={toggle}>
				{visible ? 'Hide' : 'Show'} Popup Example
			</Button>
			<Collapse in={visible}>
				<div style={{ minWidth: 640, height: 400, padding: 16 }}>
					<div
						style={{
							display: 'flex'
						}}
					>
						<Button color={color} onClick={popupToggle}>
							Toggle Popup
							<Popup
								visible={popupVisible}
								scaleOrigin="top-left"
								style={{ padding: 16, left: 0, top: 40 }}
							>
								<span
									style={{
										display: 'inline-flex',
										flexDirection: 'row',
										width: 320,
										whiteSpace: 'pre-wrap'
									}}
								>
									{`This HTML file is a template.
										If you open it directly in the browser, you will see an empty page.

										You can add webfonts, meta tags, or analytics to this file.
										The build step will place the bundled scripts into the <body> tag.

										To begin the development, run \`npm start\` or \`yarn start\`.
										To create a production bundle, use \`npm run build\` or \`yarn build\``}
								</span>
							</Popup>
						</Button>
					</div>
					<br />
					<br />
					<br />
					<div style={{ display: 'flex', flexDirection: 'row-reverse', position: 'relative' }}>
						<Button.Icon focus={popup2Visible} onClick={popup2Toggle}>
							<UserOutlined />
							<Popup
								visible={popup2Visible}
								scaleOrigin="right"
								style={{ padding: 16, right: 48, top: -80 }}
							>
								<span
									style={{
										display: 'inline-flex',
										flexDirection: 'row',
										width: 320,
										whiteSpace: 'pre-wrap'
									}}
								>
									{`This HTML file is a template.
										If you open it directly in the browser, you will see an empty page.

										You can add webfonts, meta tags, or analytics to this file.
										The build step will place the bundled scripts into the <body> tag.

										To begin the development, run \`npm start\` or \`yarn start\`.
										To create a production bundle, use \`npm run build\` or \`yarn build\``}
								</span>
							</Popup>
						</Button.Icon>
					</div>
				</div>
			</Collapse>
		</>
	)
}
