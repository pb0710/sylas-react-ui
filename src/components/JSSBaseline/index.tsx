import * as React from 'react'
import {
	StylesProvider,
	withStyles,
	createStyles,
	WithStyles,
	ThemeProvider
} from '@material-ui/styles'
import 'normalize.css'
import { theme } from './theme'
import { omit } from 'lodash-es'

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
const JSSBaseline: React.FC<WithStyles<typeof styles>> = (props) => {
	const restProps = omit(props, ['classes'])
	return (
		<StylesProvider injectFirst {...restProps}>
			<ThemeProvider theme={theme}>{props.children}</ThemeProvider>
		</StylesProvider>
	)
}

export default withStyles(styles, { name: 'JSSBaseline' })(JSSBaseline)
