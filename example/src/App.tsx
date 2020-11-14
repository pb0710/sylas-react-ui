import * as React from 'react'
import { Form, Input, Switch } from 'sylas-react-ui'

const App = () => {
	const handleFinsh = (values) => {
		console.log('submit values:', values)
	}
	const handleFail = (errors) => {
		console.log('submit errors:', errors)
	}
	const [check, setCheck] = React.useState<boolean>(false)
	const handleToggle = () => {
		setCheck((oldCheck) => !oldCheck)
	}
	return (
		<div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
			<h1>App</h1>
			<div style={{ width: 400 }}>
				<button onClick={handleToggle}>Password confirm is necessary: {check ? 'Yes' : 'No'}</button>
				<Form onFinsh={handleFinsh} onFail={handleFail}>
					<Form.Field
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
					</Form.Field>
					<Form.Field
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
					</Form.Field>
					<Form.Field
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
					</Form.Field>
					{/* no validate rules. */}
					<Form.Field name="remember" initialValue={true}>
						<Switch />
					</Form.Field>
					<button type="submit">Submit</button>
				</Form>
			</div>
		</div>
	)
}
export default App
