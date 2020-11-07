import _Form, { FormProps } from './Form'
import FormItem from './FormItem'
import { useForm } from './hooks'

interface FormExports extends React.MemoExoticComponent<React.FC<FormProps>> {
	Item: typeof FormItem
	useForm: typeof useForm
}

const Form = _Form as FormExports

Form.Item = FormItem
Form.useForm = useForm

export default Form
