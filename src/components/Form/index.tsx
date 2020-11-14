import { Form as InternalForm } from './Form'
import { Field } from './Field'
import { useForm } from './hooks'

type InternalFormType = typeof InternalForm
interface FormType extends InternalFormType {
	useForm: typeof useForm
	Field: typeof Field
}

const Form = InternalForm as FormType
Form.useForm = useForm
Form.Field = Field

export default Form
