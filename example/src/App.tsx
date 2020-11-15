import * as React from 'react'
import { Form, Input, Switch, Select } from 'sylas-react-ui'

const App = () => {
	const [form] = Form.useForm()
	const handleFinsh = (values) => {
		console.log('submit finshed values:', values)
	}
	const handleFail = (errors) => {
		console.error('submit failed errors:', errors)
	}
	const [check, setCheck] = React.useState<boolean>(false)
	const handleToggle = () => {
		setCheck((oldCheck) => !oldCheck)
	}
	return (
		<div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
			<h1>App</h1>
			<div style={{ width: 320 }}>
				<button style={{ marginBottom: 16 }} onClick={handleToggle}>
					Password confirm is necessary: {check ? 'Yes' : 'No'}
				</button>
				<Form form={form} onFinsh={handleFinsh} onFail={handleFail}>
					<Form.Item
						name="username"
						initialValue="i am a user"
						// validate rules with promise.
						rules={[
							{
								validator(value) {
									if (!value) {
										return Promise.reject('username is required!')
									}
									return Promise.resolve()
								}
							}
						]}
					>
						<Input placeholder="username" />
					</Form.Item>
					<Form.Item
						name="password"
						initialValue=""
						// multiple validate rules.
						rules={[
							{
								async validator(value) {
									if (value.length <= 4) {
										// async function be allow to throw 'explain'. its equal to return Promise.reject('explain').
										throw 'password length is greater than 4 digits!'
									}
								}
							},
							(form) => ({
								async validator(value) {
									const enPattern = new RegExp('^[a-z]+$', 'i')
									if (!enPattern.test(value)) {
										return Promise.reject('password must consist of alphabets!')
									}
								}
							}),
							({ getFieldValue, setFieldsValue }) => ({
								async validator(value) {
									// fields linkage
									const confirmPasswordValue = getFieldValue('confirmPassword')
									if (value !== confirmPasswordValue) {
										setFieldsValue({ confirmPassword: '' })
									}
								}
							})
						]}
					>
						<Input placeholder="password" />
					</Form.Item>
					<Form.Item
						name="confirmPassword"
						initialValue=""
						// dynamic validate rules.
						rules={[
							check
								? ({ getFieldValue }) => ({
										async validator(value) {
											if (value !== getFieldValue('password')) {
												return Promise.reject('Twice inputs are not equal!')
											}
										}
								  })
								: {
										// it is equal to validate() { return Promise.resolve() }.
										async validator() {}
								  }
						]}
					>
						<Input placeholder="confirm password" />
					</Form.Item>
					{/* no validate rules. */}
					<Form.Item name="remember" initialValue={false}>
						<Switch description="remember password" />
					</Form.Item>
					<Form.Item name="lang" initialValue="en_US">
						<Select description="language">
							<Select.Option value="en_US">English</Select.Option>
							<Select.Option value="zh_CN">简体中文</Select.Option>
							<Select.Option value="zh_TW">繁體中文</Select.Option>
						</Select>
					</Form.Item>
					<button type="submit">Submit</button>
				</Form>
			</div>
		</div>
	)
}
export default App
