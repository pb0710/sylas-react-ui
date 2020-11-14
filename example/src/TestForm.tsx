// import * as React from 'react'
// import { createStyles, makeStyles } from '@material-ui/styles'
// import { Form, Button, Input, Switch } from 'sylas-react-ui'

// const useStyles = makeStyles(
// 	createStyles({
// 		app: {
// 			display: 'flex',
// 			flexDirection: 'column',
// 			alignItems: 'center',
// 			width: '100vw',
// 			height: '100vh',
// 			'&>*': {
// 				margin: 10
// 			}
// 		},
// 		form: {
// 			width: 400
// 		}
// 	})
// )

// const TestForm: React.FC = () => {
// 	const classes = useStyles()
// 	const [check, setCheck] = React.useState(true)
// 	const [form] = Form.useForm()

// 	const handleFinsh = (values) => {
// 		console.log('submit fulfilled values: ', values)
// 	}
// 	const handleFailed = () => {
// 		console.log('submit rejected')
// 	}
// 	const handleChange = (values) => {
// 		console.log('changed values: ', values)
// 	}

// 	const handleClickPassword = React.useCallback(() => {
// 		form.validateFields('username', 'remember')
// 		form.updateFieldsValue({ password: 'xyz' })
// 	}, [form])

// 	return (
// 		<div className={classes.app}>
// 			<Input />
// 			<Form
// 				className={classes.form}
// 				form={form}
// 				name="login"
// 				onFinsh={handleFinsh}
// 				onFailed={handleFailed}
// 				onValuesChange={handleChange}
// 			>
// 				<div>
// 					<Form.Item
// 						name="username"
// 						label="用户名"
// 						initialValue="super one"
// 						rules={[
// 							({ getFieldValue, validateFields, updateFieldsValue }) => ({
// 								async validator(value: any): Promise<unknown> {
// 									// updateFieldsValue({ password: 'wwwtttfff!' })
// 									// validateFields('password')
// 									if (!value) return Promise.reject('用户名不能为空！')
// 									return
// 								}
// 							}),
// 							(form) => ({
// 								async validator(value: any): Promise<unknown> {
// 									if (value.length > 6) return Promise.reject('不能超过6个字符！')
// 									return
// 								}
// 							}),
// 							(form) => ({
// 								validator(value: any): Promise<unknown> {
// 									if (value.length > 8) return Promise.reject('不能超过8个字符！')
// 									return Promise.resolve()
// 								}
// 							})
// 						]}
// 					>
// 						<div>
// 							<Input />
// 						</div>
// 					</Form.Item>
// 				</div>
// 				<Form.Item
// 					name="password"
// 					label="密码"
// 					initialValue="1234qwer"
// 					rules={[
// 						({ getFieldValue, validateFields, updateFieldsValue }) => ({
// 							async validator(value: any): Promise<unknown> {
// 								validateFields('username')
// 								// updateFieldsValue({ username: 'wtf', remember: true })
// 								if (check && !value) return Promise.reject('密码不能为空！')
// 								const username = getFieldValue('username')
// 								console.log('username: ', username)
// 								if (value !== username) {
// 									return Promise.reject('两次输入应一致！')
// 								}
// 								return
// 							}
// 						})
// 					]}
// 				>
// 					<Input />
// 				</Form.Item>
// 				<Form.Item name="remember" label="记住密码">
// 					<Switch />
// 				</Form.Item>
// 				<Form.Item>
// 					<Button htmlType="submit" color="primary">
// 						提交
// 					</Button>
// 				</Form.Item>
// 			</Form>
// 			<Button
// 				onClick={() => {
// 					setCheck((prev) => !prev)
// 				}}
// 			>
// 				用户名必填：{check ? 'true' : 'false'}
// 			</Button>
// 			<Button onClick={handleClickPassword}>点击设置密码</Button>
// 		</div>
// 	)
// }

// export default TestForm
export const a = 123
