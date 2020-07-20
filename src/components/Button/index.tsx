import React from 'react'
import _Button, { IButtonProps } from './Button'
import IconButton from './IconButton'

interface IButtonExports
	extends React.MemoExoticComponent<
		React.ForwardRefExoticComponent<IButtonProps & React.RefAttributes<HTMLElement>>
	> {
	Icon: typeof IconButton
}

const Button = _Button as IButtonExports
Button.Icon = IconButton

export default Button
