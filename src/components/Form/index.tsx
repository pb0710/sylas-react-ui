import { Form as InternalForm } from './Form'
import { InternalFormItem } from './FormItem'
import { useForm } from './hooks'

type InternalFormType = typeof InternalForm
interface FormType extends InternalFormType {
	useForm: typeof useForm
	Item: typeof InternalFormItem
}

const Form = InternalForm as FormType
Form.useForm = useForm
Form.Item = InternalFormItem

export default Form
