import * as React from 'react'
import { FieldProps, RuleConfig } from './Field'

export interface FieldElement extends React.ReactElement<FieldProps> {
	explains: string[]
	onStoreChange(): void
}
export type Store = Record<string, unknown>
export type Errors = Record<string, string[]>
export type Callback = Record<string, (...args: unknown[]) => void>
export interface FormInstance {
	setCallback(newCallback: Callback): void
	subscribeField(field: FieldElement): () => void
	getFormInstance(): FormInstance
	getFieldValue(name: string): unknown
	setFieldsValue(newStore: Store): void
	validateFields(...names: string[]): Promise<Errors | void>
	submit(): void
}

export class FormStore {
	private _store: Store
	public get store(): Store {
		return this._store
	}
	public set store(store: Store) {
		this._store = store
	}
	private _fields: FieldElement[]
	public get fields(): FieldElement[] {
		return this._fields
	}
	public set fields(fields: FieldElement[]) {
		this._fields = fields
	}
	private _errors: Errors
	public get errors(): Errors {
		return this._errors
	}
	public set errors(errors: Errors) {
		this._errors = errors
	}
	private _callback: Callback
	public get callback(): Callback {
		return this._callback
	}
	public set callback(value: Callback) {
		this._callback = value
	}

	constructor() {
		this.fields = []
		this.store = {}
		this.errors = {}
		this.callback = {}
	}

	public setCallback = (newCallback: Callback): void => {
		this.callback = { ...this.callback, ...newCallback }
	}

	public subscribeField = (field: FieldElement): (() => void) => {
		this.fields.push(field)
		return () => {
			delete this.store[field.props.name]
			this.fields = this.fields.filter((item) => item.props.name !== field.props.name)
		}
	}

	public getFieldValue = (name: string): unknown => {
		return this.store[name]
	}

	public setFieldsValue = (newStore: Store): void => {
		this.store = {
			...this.store,
			...newStore
		}
		this.fields.forEach((field) => {
			const { name } = field.props
			Object.keys(newStore).forEach((key) => {
				if (key === name) {
					field.onStoreChange()
				}
			})
		})
	}

	private setErrors = (newErrors: Errors): void => {
		this.errors = { ...this.errors, ...newErrors }
	}

	private getRules = (field: FieldElement): RuleConfig[] => {
		const { rules = [] } = field.props
		const result = rules.map((rule) =>
			typeof rule === 'function' ? rule(this.getFormInstance()) : rule
		)
		return result
	}

	public validate = async (field: FieldElement): Promise<void> => {
		const { name } = field.props
		const value = this.getFieldValue(name)
		const ruleEntities = this.getRules(field)
		const results = await Promise.allSettled(
			ruleEntities.map((ruleEntity) => ruleEntity.validator(value))
		)
		const explains: string[] = results
			.map((result) => result.status === 'rejected' && result.reason)
			.filter(Boolean)
		this.setErrors({ [name]: explains })
		field.explains = explains
		field.onStoreChange()
	}

	public validateFields = async (...names: string[]): Promise<Errors | void> => {
		// if params empty then validate all fields.
		if (!names.length) {
			names = Object.keys(this.store)
		}

		await Promise.all(
			names.map(async (name) => {
				const field = this.fields.find((field) => field.props.name === name)
				if (field) {
					await this.validate(field)
				}
			})
		)
		const hasErrors = Object.values(this.errors).some((explain) => explain.length)
		if (hasErrors) {
			return this.errors
		}
	}

	public submit = async (): Promise<void> => {
		const hasErrors = Boolean(await this.validateFields())
		hasErrors ? this.callback?.onFail(this.errors) : this.callback?.onFinsh(this.store)
	}

	public getFormInstance = (): FormInstance => {
		return {
			setCallback: this.setCallback,
			subscribeField: this.subscribeField,
			getFormInstance: this.getFormInstance,
			getFieldValue: this.getFieldValue,
			setFieldsValue: this.setFieldsValue,
			validateFields: this.validateFields,
			submit: this.submit
		}
	}
}

export function useForm(form?: FormInstance): FormInstance[] {
	const formRef = React.useRef<FormInstance>()
	if (!formRef.current) {
		formRef.current = form || new FormStore().getFormInstance()
	}
	return [formRef.current]
}
