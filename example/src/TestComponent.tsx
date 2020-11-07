// import React from 'react'
// import { createStyles, makeStyles } from '@material-ui/styles'
// import { UserOutlined, NotificationOutlined } from '@ant-design/icons'
// import { Button, Loading, Popup, Select } from 'sylas-react-ui'

// const useStyles = makeStyles(
// 	createStyles({
// 		app: {
// 			display: 'flex',
// 			// justifyContent: 'center',
// 			// alignItems: 'center',
// 			width: '100vw',
// 			height: '100vh'
// 		},
// 		app_center: {
// 			position: 'fixed',
// 			right: 0
// 		},
// 		btn: {}
// 	})
// )

// const _Sub = (props) => {
// 	const { hide } = props
// 	return (
// 		<div>
// 			<Button color="primary" onClick={hide}>
// 				hide
// 			</Button>
// 			<Loading.Line />
// 			<Loading.Line />
// 			<Loading.Line />
// 			<Loading.Line />
// 		</div>
// 	)
// }

// const Sub = React.memo(_Sub)

// const TestComponent: React.FC = () => {
// 	const classes = useStyles()
// 	const { visible, show, hide, ref } = Popup.usePopup(true)
// 	const [state, setState] = React.useState(false)
// 	const handleClick = () => {
// 		setState((prev) => !prev)
// 	}

// 	return (
// 		<div className={classes.app}>
// 			{state ? 'on' : 'off'}
// 			<Button.Icon onClick={handleClick}>
// 				<NotificationOutlined />
// 			</Button.Icon>
// 			<Button onClick={hide} prefixes={<NotificationOutlined />} suffixes={<NotificationOutlined />}>
// 				隐藏
// 			</Button>
// 			<Button.Icon className={classes.btn} focus={visible} onClick={show}>
// 				<UserOutlined />
// 			</Button.Icon>
// 			<div onClick={show}></div>
// 			<Popup ref={ref} className={classes.app_center} visible={visible} scaleOrigin="center">
// 				APP
// 				<Button onClick={hide}>按钮</Button>
// 				<Sub hide={hide} />
// 			</Popup>
// 		</div>
// 	)
// }
const TestComponent = 111
export default TestComponent
