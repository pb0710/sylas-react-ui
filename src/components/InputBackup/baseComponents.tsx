import { styled } from '@material-ui/styles'

const inputStyles = {
	minHeight: 32
}

const textareaStyles = {
	minHeight: 42,
	padding: '4px 8px'
}

const baseStyles: any = {
	boxSizing: 'border-box',
	width: '100%',
	height: '100%',
	fontSize: 14,
	color: '#303133',
	backgroundColor: 'inherit',
	paddingLeft: 8,
	paddingRight: 8,
	borderRadius: 4,
	outline: 0,
	border: `1px solid #d9d9d9`,
	transition: 'box-shadow 250ms ease-out, border 250ms ease-out',
	'&::placeholder': {
		color: '#909399'
	}
}

export const InputBase = styled('input')({ ...baseStyles, ...inputStyles })

export const TextAreaBase = styled('textarea')({ ...baseStyles, ...textareaStyles })
