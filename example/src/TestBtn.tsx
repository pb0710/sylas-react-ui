import React from 'react'
import { createStyles, makeStyles } from '@material-ui/styles'
import { UserOutlined, NotificationOutlined } from '@ant-design/icons'
import { Button } from 'sylas-react-ui'

interface AppProps {}

const useStyles = makeStyles(
	createStyles({
		app: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			width: '100vw',
			height: '100vh'
		}
	})
)

const TestBtn: React.FC = () => {
	const classes = useStyles()
	const handleClick = () => {
		console.log('11111')
	}
	return (
		<div className={classes.app}>
			<Button onClick={handleClick} prefixes={<UserOutlined />} suffixes={<NotificationOutlined />}>
				测试
			</Button>
		</div>
	)
}

export default TestBtn
