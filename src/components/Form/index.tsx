import InternalForm, { FormProps } from './Form'
import FormItem from './FormItem'
import { useForm } from './hooks'

interface FormType extends React.FC<FormProps> {
	useForm: typeof useForm
	Item: typeof FormItem
}

const Form = InternalForm as FormType
Form.useForm = useForm
Form.Item = FormItem

export default Form
