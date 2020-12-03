import * as React from 'react'
import { Button, Collapse, Menu } from 'sylas-react-ui'
import { ThemeContext } from '../App'
import { useVisible } from '../hooks'
import { Example } from './Example'

const codeExample = `
import * as React from 'react'
import { Button, Menu } from 'sylas-react-ui'

function MenuExample() {
  const [openKey, setOpenKey] = React.useState('11')

  const handleSelect = (key: string) => {
    console.log('current selected key: ', key)
  }

  React.useEffect(() => {
    setTimeout(() => {
      setOpenKey('www')
    }, 4000)
    setTimeout(() => {
      setOpenKey('uuu')
    }, 8000)
  }, [])

  return (
    <div style={{ minWidth: 280, padding: 0, borderRight: '1px solid #ddd' }}>
      <Menu openKey={openKey} onMenuSelect={handleSelect}>
        <Menu.Item menuKey="11">Menu Item 11</Menu.Item>
        <Menu.Item menuKey="22">Menu Item 22</Menu.Item>
        <Menu.Sub menuKey="subaaa" title="SubMenu aaa">
          <Menu.Item menuKey="xxx">Menu Item xxx</Menu.Item>
          <Menu.Sub menuKey="subrrr" title="SubMenu rrr">
            <Menu.Item menuKey="qqq">Menu Item qqq</Menu.Item>
            <Menu.Item menuKey="www">Menu Item www</Menu.Item>
            <Menu.Item menuKey="eee">Menu Item eee</Menu.Item>
            <Menu.Sub menuKey="subppp" title="SubMenu ppp">
              <Menu.Item menuKey="ooo">Menu Item ooo</Menu.Item>
              <Menu.Item menuKey="iii">Menu Item iii</Menu.Item>
              <Menu.Item menuKey="uuu">Menu Item uuu</Menu.Item>
            </Menu.Sub>
          </Menu.Sub>
          <Menu.Item menuKey="yyy">Menu Item yyy</Menu.Item>
          <Menu.Item menuKey="zzz">Menu Item zzz</Menu.Item>
        </Menu.Sub>
        <Menu.Item menuKey="33">Menu Item 33</Menu.Item>
      </Menu>
    </div>
  )
}
`

export default function MenuExample() {
	const color = React.useContext(ThemeContext)
	const [visible, toggle] = useVisible(false)

	const [openKey, setOpenKey] = React.useState('11')

	const handleSelect = (key: string) => {
		console.log('current selected key: ', key)
	}

	React.useEffect(() => {
		setTimeout(() => {
			setOpenKey('www')
		}, 4000)
		setTimeout(() => {
			setOpenKey('uuu')
		}, 8000)
	}, [])

	return (
		<>
			<Button color={color} light onClick={toggle}>
				{visible ? 'Hide' : 'Show'} Menu Example
			</Button>
			<Collapse in={visible}>
				<Example code={codeExample}>
					<div style={{ minWidth: 280, padding: 0, borderRight: '1px solid #ddd' }}>
						<Menu color={color} openKey={openKey} onMenuSelect={handleSelect}>
							<Menu.Item menuKey="11">Menu Item 11</Menu.Item>
							<Menu.Item menuKey="22">Menu Item 22</Menu.Item>
							<Menu.Sub menuKey="subaaa" title="SubMenu aaa">
								<Menu.Item menuKey="xxx">Menu Item xxx</Menu.Item>
								<Menu.Sub menuKey="subrrr" title="SubMenu rrr">
									<Menu.Item menuKey="qqq">Menu Item qqq</Menu.Item>
									<Menu.Item menuKey="www">Menu Item www</Menu.Item>
									<Menu.Item menuKey="eee">Menu Item eee</Menu.Item>
									<Menu.Sub menuKey="subppp" title="SubMenu ppp">
										<Menu.Item menuKey="ooo">Menu Item ooo</Menu.Item>
										<Menu.Item menuKey="iii">Menu Item iii</Menu.Item>
										<Menu.Item menuKey="uuu">Menu Item uuu</Menu.Item>
									</Menu.Sub>
								</Menu.Sub>
								<Menu.Item menuKey="yyy">Menu Item yyy</Menu.Item>
								<Menu.Item menuKey="zzz">Menu Item zzz</Menu.Item>
							</Menu.Sub>
							<Menu.Item menuKey="33">Menu Item 33</Menu.Item>
						</Menu>
					</div>
				</Example>
			</Collapse>
		</>
	)
}
