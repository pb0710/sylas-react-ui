import * as React from 'react'

export function useVisible(defaultValue: boolean): [visible: boolean, toggle: () => void] {
	const [visible, setVisible] = React.useState<boolean>(defaultValue)
	const toggle = React.useCallback((): void => {
		setVisible((oldVisible) => !oldVisible)
	}, [])
	return [visible, toggle]
}
