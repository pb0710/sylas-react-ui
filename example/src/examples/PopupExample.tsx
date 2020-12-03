import * as React from 'react'
import { CloseOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Collapse, Popup } from 'sylas-react-ui'
import { useVisible } from '../hooks'
import { ThemeContext } from '../App'
import { Example } from './Example'

const codeExample = `
import * as React from 'react'
import { CloseOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Popup } from 'sylas-react-ui'

function PopupExample() {

  const [visible1, popupRef1, { show: show1, hide: hide1 }] = Popup.usePopup()
  const [visible2, popupRef2, { hide: hide2, toggle: toggle2 }] = Popup.usePopup()
  const [visible3, popupRef3, { hide: hide3, toggle: toggle3 }] = Popup.usePopup()

  return (
    <div style={{ minWidth: 560, height: 440, padding: 16, position: 'relative' }}>
      <div style={{ display: 'flex', position: 'relative' }}>
        <Button onClick={show1}>
          Show Popup
        </Button>
        <Popup
          ref={popupRef1}
          visible={visible1}
          scaleOrigin="top-left"
          style={{ display: 'flex', flexDirection: 'column', padding: 16, left: 0, top: 48 }}
        >
          <p
            style={{
              width: 320,
              whiteSpace: 'pre-wrap'
            }}
          >
            {\`This HTML file is a template.
                If you open it directly in the browser, you will see an empty page.
                You can add webfonts, meta tags, or analytics to this file.
                The build step will place the bundled scripts into the <body> tag.
                To begin the development, run \`npm start\` or \`yarn start\`.
                To create a production bundle, use \`npm run build\` or \`yarn build\`\`}
          </p>
          <Button onClick={hide1}>
            Hide
          </Button>
        </Popup>
      </div>
      <br />
      <div style={{ display: 'flex', position: 'absolute', right: 16 }}>
        <Button onClick={toggle2}>
          Toggle Popup
        </Button>
        <Popup
          ref={popupRef2}
          visible={visible2}
          scaleOrigin="top-right"
          style={{ display: 'flex', flexDirection: 'column', padding: 16, right: 0, top: 48 }}
        >
          <p
            style={{
              width: 320,
              whiteSpace: 'pre-wrap'
            }}
          >
            {\`This HTML file is a template.
                If you open it directly in the browser, you will see an empty page.
                You can add webfonts, meta tags, or analytics to this file.
                To create a production bundle, use \`npm run build\` or \`yarn build\`\`}
          </p>
          <Button onClick={hide2}>
            Hide
          </Button>
        </Popup>
      </div>
      <br />
      <br />
      <br />
      <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <Button.Icon focus={visible3} onClick={toggle3}>
          <UserOutlined />
        </Button.Icon>
        <Popup
          ref={popupRef3}
          visible={visible3}
          scaleOrigin="left"
          style={{
            padding: 16,
            left: 48,
            top: -80,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end'
          }}
        >
          <Button.Icon
            onClick={() => {
              console.log('closed')
              hide3()
            }}
          >
            <CloseOutlined />
          </Button.Icon>
          <p
            style={{
              width: 320,
              whiteSpace: 'pre-wrap'
            }}
          >
            {\`This HTML file is a template.
                If you open it directly in the browser, you will see an empty page.
                To begin the development, run \`npm start\` or \`yarn start\`.
                To create a production bundle, use \`npm run build\` or \`yarn build\`\`}
          </p>
        </Popup>
      </div>
    </div>
  )
}
`

export default function PopupExample() {
	const color = React.useContext(ThemeContext)
	const [opened, toggleOpened] = useVisible(false)

	const [visible1, popupRef1, { show: show1, hide: hide1 }] = Popup.usePopup()
	const [visible2, popupRef2, { hide: hide2, toggle: toggle2 }] = Popup.usePopup()
	const [visible3, popupRef3, { hide: hide3, toggle: toggle3 }] = Popup.usePopup()

	return (
		<>
			<Button color={color} light onClick={toggleOpened}>
				{opened ? 'Hide' : 'Show'} Popup Example
			</Button>
			<Collapse in={opened}>
				<Example code={codeExample}>
					<div style={{ minWidth: 560, height: 440, padding: 16, position: 'relative' }}>
						<div style={{ display: 'flex', position: 'relative' }}>
							<Button color={color} onClick={show1}>
								Show Popup
							</Button>
							<Popup
								ref={popupRef1}
								visible={visible1}
								scaleOrigin="top-left"
								style={{ display: 'flex', flexDirection: 'column', padding: 16, left: 0, top: 48 }}
							>
								<p
									style={{
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
								</p>
								<Button color={color} onClick={hide1}>
									Hide
								</Button>
							</Popup>
						</div>
						<br />
						<div style={{ display: 'flex', position: 'absolute', right: 16 }}>
							<Button color={color} onClick={toggle2}>
								Toggle Popup
							</Button>
							<Popup
								ref={popupRef2}
								visible={visible2}
								scaleOrigin="top-right"
								style={{ display: 'flex', flexDirection: 'column', padding: 16, right: 0, top: 48 }}
							>
								<p
									style={{
										width: 320,
										whiteSpace: 'pre-wrap'
									}}
								>
									{`This HTML file is a template.
										If you open it directly in the browser, you will see an empty page.
										You can add webfonts, meta tags, or analytics to this file.
										To create a production bundle, use \`npm run build\` or \`yarn build\``}
								</p>
								<Button color={color} onClick={hide2}>
									Hide
								</Button>
							</Popup>
						</div>
						<br />
						<br />
						<br />
						<div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
							<Button.Icon focus={visible3} onClick={toggle3}>
								<UserOutlined />
							</Button.Icon>
							<Popup
								ref={popupRef3}
								visible={visible3}
								scaleOrigin="left"
								style={{
									padding: 16,
									left: 48,
									top: -80,
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'flex-end'
								}}
							>
								<Button.Icon
									color={color}
									onClick={() => {
										console.log('closed')
										hide3()
									}}
								>
									<CloseOutlined />
								</Button.Icon>
								<p
									style={{
										width: 320,
										whiteSpace: 'pre-wrap'
									}}
								>
									{`This HTML file is a template.
										If you open it directly in the browser, you will see an empty page.
										To begin the development, run \`npm start\` or \`yarn start\`.
										To create a production bundle, use \`npm run build\` or \`yarn build\``}
								</p>
							</Popup>
						</div>
					</div>
				</Example>
			</Collapse>
		</>
	)
}
