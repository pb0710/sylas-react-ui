import React from 'react'
import { StylesProvider, withStyles, createStyles } from '@material-ui/styles'
import 'normalize.css'

export const html = {
	WebkitFontSmoothing: 'antialiased', // Antialiasing.
	MozOsxFontSmoothing: 'grayscale', // Antialiasing.
	// Change from `box-sizing: content-box` so that `width`
	// is not affected by `padding` or `border`.
	boxSizing: 'border-box'
}

export const body = {
	fontSize: 14,
	color: '#303133'
}

export const styles = createStyles({
	'@global': {
		html,
		'*, *::before, *::after': {
			boxSizing: 'inherit'
		},
		body: {
			margin: 0, // Remove the margin in all browsers.
			...body
		}
	}
})

// JSS 样式优先级较高，若要使用自定义样式覆盖，需将 style 前置插入
const JssBaseline: React.FC = (props) => <StylesProvider injectFirst>{props.children}</StylesProvider>

export default withStyles(styles, { name: 'JSSBaseline' })(JssBaseline)
