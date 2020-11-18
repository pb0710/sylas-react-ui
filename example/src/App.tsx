import * as React from 'react'
import { Form, Input, Switch, Select, Button, CheckBox } from 'sylas-react-ui'

function App() {
	const [form] = Form.useForm()
	const handleFinsh = (values) => {
		console.log('submit finshed values:', values)
	}
	const handleFail = (errors) => {
		console.error('submit failed errors:', errors)
	}
	const handleValuesChange = (values) => {
		console.log('values changed', values)
	}
	const [check, setCheck] = React.useState<boolean>(false)
	const handleToggle = () => {
		setCheck((oldCheck) => !oldCheck)
	}
	return (
		<div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
			<h1>App</h1>
			<div style={{ width: 320 }}>
				<Button style={{ marginBottom: 16 }} onClick={handleToggle}>
					Password confirm is necessary: {check ? 'Yes' : 'No'}
				</Button>
				<Form
					form={form}
					onFinsh={handleFinsh}
					onFail={handleFail}
					onValuesChange={handleValuesChange}
				>
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
					<Form.Item name="selfIntroduction" initialValue="">
						<Input.Textarea placeholder="self introduction" />
					</Form.Item>

					<Form.Item name="remember" initialValue={false}>
						<Switch description="remember password" />
					</Form.Item>
					<Form.Item name="lang" initialValue="en-US">
						<Select description="language">
							<Select.Option value="en-US">English</Select.Option>
							<Select.Option value="es-ES">Español</Select.Option>
							<Select.Option value="ru-RU">русский</Select.Option>
							<Select.Option value="zh-CN">简体中文</Select.Option>
							<Select.Option value="zh-TW">繁體中文</Select.Option>
						</Select>
					</Form.Item>
					<Form.Item name="agree" initialValue={false}>
						<CheckBox>checking means agree to XXX terms</CheckBox>
					</Form.Item>
					<Form.Item
						name="fruit"
						initialValue={[
							{ name: 'apple', value: false },
							{ name: 'pear', value: true },
							{ name: 'orange', value: false }
						]}
					>
						<CheckBox.Group
							options={[
								{ label: 'Apple', name: 'apple' },
								{ label: 'Pear', name: 'pear' },
								{ label: 'Orange', name: 'orange' }
							]}
						/>
					</Form.Item>
					<Button type="submit" color="primary">
						Submit
					</Button>
				</Form>
			</div>
		</div>
	)
}
export default App
