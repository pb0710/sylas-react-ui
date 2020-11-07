import * as React from 'react'
import { createStyles, makeStyles } from '@material-ui/styles'
import clsx from 'clsx'

const useStyles = makeStyles(
	createStyles({
		form: {}
	})
)

export interface FormProps {
	className?: string
	name?: string
	onFinsh?(values): void
	onFailed?(): void
	onValuesChange?(values): void
}

type State = {
	values: Record<string, any>
}

type Action =
	| {
			type: 'set_fields_value'
			payload: Record<string, any>
	  }
	| {
			type: 'submit'
	  }

const dispatch: React.DispatchWithoutAction | React.Dispatch<Action> = () => {}

const defaultContext = [
	{},
	{
		dispatch,
		name: ''
	}
]

export const Context = React.createContext(defaultContext)

const initState = {
	values: {}
}

const Form: React.FC<FormProps> = (props) => {
	const { children, className, name = '', onFinsh, onFailed, onValuesChange, ...rest } = props

	const submit = (values) => {
		try {
			onFinsh && onFinsh(values)
		} catch (error) {
			onFailed && onFailed()
		}
	}

	/**
	 * reducer but not pure
	 * @param state
	 * @param action
	 */
	function reducer(state: State = initState, action: Action) {
		switch (action.type) {
			case 'set_fields_value':
				return { ...state, values: { ...state.values, ...action.payload } }

			case 'submit':
				submit(state.values)
				return state

			default:
				return state
		}
	}

	const [states, dispatch] = React.useReducer<React.Reducer<State, Action>>(reducer, initState)
	const { values } = states

	React.useEffect(() => {
		onValuesChange && onValuesChange(values)
	}, [onValuesChange, values])

	const classes = useStyles()
	const formCls = clsx(classes.form, className)
	return (
		<Context.Provider value={[values, { dispatch, name }]}>
			<div className={formCls} {...rest}>
				{children}
			</div>
		</Context.Provider>
	)
}

const internalForm = Form
internalForm.displayName = 'Form'
export default internalForm
