import { useState, useEffect, useRef, useReducer, useCallback, useContext } from 'react'
import { Context } from './Form'

export function useForm() {
	const values = useContext(Context)
	const submit = () => {}
	const getFieldValue = () => {}
	const setFieldsValue = () => {}
	const form = { submit, getFieldValue, setFieldsValue }
	return [form]
}
