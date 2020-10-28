import React from 'react'
import _Button, { ButtonProps } from './Button'
import IconButton from './IconButton'

interface ButtonExports
	extends React.MemoExoticComponent<React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLElement>>> {
	Icon: typeof IconButton
}

const Button = _Button as ButtonExports
Button.Icon = IconButton

export default Button
