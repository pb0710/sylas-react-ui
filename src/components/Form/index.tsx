import _Form, { IFormProps } from './Form'
import FormItem from './FormItem'
import { useForm } from './hooks'

interface IFormExports extends React.MemoExoticComponent<React.FC<IFormProps>> {
	Item: typeof FormItem
	useForm: typeof useForm
}

const Form = _Form as IFormExports

Form.Item = FormItem
Form.useForm = useForm

export default Form
