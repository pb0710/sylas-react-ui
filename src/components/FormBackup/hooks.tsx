import React from 'react'
import { Validator } from './FormItem'

enum validateState {
	FULFILLED = 'fulfilled',
	REJECTED = 'rejected'
}

export type Value = string | boolean | undefined

export interface Values {
	[key: string]: Value
}

export interface Error {
	name: string
	desc: string
	validator?: Validator
}

export type Errors = Error[]

interface Item {
	value?: string | boolean
	name: string
	validator?: Validator
}

export interface Callback {
	(desc: string): void
}

export interface OnFieldValueChange {
	(value?: string, name?: string): void
}

export interface Submit {
	(): Promise<Values | Errors> | any
}

export interface GetFieldValue {
	(name: string): Value | void
}

export interface SetFieldsValue {
	(nextValues: Values): void
}

export interface ValidateFields {
	(...names: string[]): Promise<string>
}

export interface SetFieldsError {
	(error: Error): void
}

export interface CleanFieldError {
	(...names: string[]): void
}

export interface SyncFormItem {
	(name?: string, validator?: Validator): void
}

export interface Form {
	values?: Values
	errors?: Errors
	submit: Submit
	onFieldValueChange: OnFieldValueChange
	syncFormItem: SyncFormItem
	getFieldValue: GetFieldValue
	setFieldsValue: SetFieldsValue
	validateFields: ValidateFields
}

export const useForm = (): Form => {
	const [values, setValues] = React.useState<Values>({} as Values)
	const [errors, setErrors] = React.useState<Errors>([])

	// 下级组件中 FormItem 的 props
	const [items, setItems] = React.useState<Item[]>([])

	// 触发表单值改变的 name
	const [origin, setOrigin] = React.useState<string | undefined>()

	const _setFieldError: SetFieldsError = error => {
		setErrors(prev => {
			if (prev.length) {
				// 数组去重，筛除 name 相同的 error
				const dedupePrev = prev.filter(item => item.name !== error.name)
				return [...dedupePrev, error]
			} else {
				return [error]
			}
		})
	}

	const _cleanFieldError: CleanFieldError = (...names) => {
		if (names.length) {
			names.forEach(name => {
				setErrors(prev => prev.filter(err => err.name !== name))
			})
		} else {
			setErrors([])
		}
	}

	const _validate = React.useCallback(
		async (item: Item): Promise<validateState> => {
			const { value, name, validator } = item
			let result = validateState.FULFILLED
			if (validator) {
				const callback: Callback = desc => {
					if (desc) {
						_setFieldError({ name, desc, validator })
						result = validateState.REJECTED
					} else {
						_cleanFieldError(name)
					}
				}
				await validator(value, callback, values)
			}
			return result
		},
		[_setFieldError, _cleanFieldError, values]
	)

	/**
	 * 批量校验表单项：
	 */
	const _validateItems = React.useCallback(
		async (items: Item[]): Promise<validateState> => {
			const validators = items.map(_validate)
			const results = await Promise.all(validators)

			return results.some(result => result === validateState.REJECTED)
				? validateState.REJECTED
				: validateState.FULFILLED
		},
		[_validate]
	)

	const _mergeItems = (name: string, value: Value) => {
		setItems(prev => prev.map(item => (item.name === name ? { ...item, value } : item)))
	}

	const onFieldValueChange: OnFieldValueChange = (value, name) => {
		setOrigin(undefined)
		if (name) {
			setValues(prev => ({
				...prev,
				[name]: value
			}))
			_mergeItems(name, value)
			setOrigin(name)
		}
	}

	// 函数传递给 FormItem 调用，将props同步到form
	const syncFormItem: SyncFormItem = (name, validator) => {
		if (name) {
			const newItem = { name, validator }
			setItems(prev => [...prev, newItem])
		}
	}
	const getFieldValue: GetFieldValue = name => values[name]

	const setFieldsValue: SetFieldsValue = nextValues => {
		setOrigin(undefined)
		setValues(prev => ({
			...prev,
			...nextValues
		}))
		for (const name in nextValues) {
			if (Object.prototype.hasOwnProperty.call(nextValues, name)) {
				const value = nextValues[name]
				_mergeItems(name, value)
				setOrigin(name)
			}
		}
	}

	const validateFields: ValidateFields = React.useCallback(
		(...names) =>
			new Promise((resolve, reject) => {
				const receiveResult = (res: validateState) => {
					res === validateState.REJECTED ? reject(res) : resolve(res)
				}

				// 区分参数，names不传即校验全部
				if (names.length) {
					const namesSet = new Set(names)
					const targets = items.filter(item => namesSet.has(item.name))
					_validateItems(targets).then(receiveResult)
				} else {
					_validateItems(items).then(receiveResult)
				}
			}),
		[items, _validateItems]
	)

	const submit: Submit = React.useCallback(
		() =>
			new Promise(async (resolve, reject) => {
				try {
					await validateFields()
					resolve(values)
				} catch (err) {
					reject(err)
				}
			}),
		[values, validateFields]
	)

	React.useEffect(
		() => {
			if (origin) {
				items.forEach(item => {
					// 只校验表单值变更项
					if (origin === item.name) {
						validateFields(origin).then(
							() => {},
							() => {}
						)
					}
				})
			}
		},
		// deps 不添加 validateFields，因为 validateFields deps 已经添加过 items
		[items, origin]
	)

	return {
		onFieldValueChange,
		values,
		errors,
		submit,
		getFieldValue,
		setFieldsValue,
		validateFields,
		syncFormItem
	}
}
