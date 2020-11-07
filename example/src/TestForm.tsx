import * as React from 'react'
import { createStyles, makeStyles } from '@material-ui/styles'
import { Form, Button, Input, Switch } from 'sylas-react-ui'

const useStyles = makeStyles(
	createStyles({
		app: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			width: '100vw',
			height: '100vh'
		},
		form: {
			width: 400,
			height: 400
		}
	})
)

const TestForm: React.FC = () => {
	const classes = useStyles()
	const handleFinsh = (values) => {
		console.log('submit fulfilled values: ', values)
	}
	const handleChange = (values) => {
		console.log('changed values: ', values)
	}

	return (
		<div className={classes.app}>
			<Form className={classes.form} name="login" onFinsh={handleFinsh} onValuesChange={handleChange}>
				<Form.Item name="username" label="用户名">
					<div>
						<Input />
					</div>
				</Form.Item>
				<Form.Item name="password" label="密码">
					<Input />
				</Form.Item>
				<Form.Item name="remember" label="记住密码">
					<Switch />
				</Form.Item>
				<Form.Item>
					<Button htmlType="submit" color="primary">
						提交
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

export default TestForm
