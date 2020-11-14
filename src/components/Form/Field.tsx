import * as React from 'react'
import { InternalExplains as Explains } from './Explains'
import { FormContext } from './formContext'
import { FormInstance } from './hooks'

export type RuleConfig = { validator: (value: any) => Promise<void | string> }
export type Rule = RuleConfig | ((form: FormInstance) => RuleConfig)
export interface FieldProps {
	name: string
	initialValue: any
	rules?: Rule[]
}
export interface FieldControlProps {
	value: any
	onValueChange: (value: unknown) => void
}

/**
 * form field core code.
 * use class component due to there needs more independent control from external,
 * and use functional component implementing it will increase the amount of code.
 */
export class Field extends React.Component<FieldProps> {
	static contextType = FormContext
	unsubscribeField: () => void
	explains: string[]

	constructor(props: Readonly<FieldProps>) {
		super(props)
		this.explains = []
	}

	componentDidMount(): void {
		const { subscribeField, setFieldsValue }: FormInstance = this.context
		this.unsubscribeField = subscribeField(this as any)
		// initialValue is immutiable and only set once.
		const { name, initialValue } = this.props
		setFieldsValue({ [name]: initialValue })
	}

	componentWillUnmount(): void {
		this.unsubscribeField()
	}

	public onStoreChange = (): void => {
		this.forceUpdate()
	}

	private getControlProps = (): FieldControlProps => {
		const { getFieldValue, setFieldsValue, validateFields }: FormInstance = this.context
		const { name } = this.props
		return {
			value: getFieldValue(name),
			onValueChange: (value: unknown) => {
				setFieldsValue({ [name]: value })
				validateFields(name)
			}
		}
	}

	render(): JSX.Element {
		const { children } = this.props
		return (
			<div>
				{React.isValidElement(children)
					? React.cloneElement(children, this.getControlProps())
					: console.warn(`${children} is not valid element!`)}
				<Explains explains={this.explains} />
			</div>
		)
	}
}
