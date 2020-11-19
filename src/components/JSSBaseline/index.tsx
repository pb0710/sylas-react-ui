import * as React from 'react'
import { StylesProvider, withStyles, createStyles, WithStyles } from '@material-ui/styles'
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

// JSS style has a higher priority. If you want to use custom style coverage, you need to insert style beforehand.
const JssBaseline: React.FC<WithStyles<typeof styles>> = (props) => {
	const { classes, ...rest } = props
	return (
		<StylesProvider injectFirst {...rest}>
			{props.children}
		</StylesProvider>
	)
}

export default withStyles(styles, { name: 'JSSBaseline' })(JssBaseline)
