export type ColorType = 'primary' | 'success' | 'warning' | 'error'

export const theme = {
	palette: {
		default: {
			main: '#f4f4f5',
			bright: '#fcfcfe',
			dim: '#e8e8e8',
			text: '#303133',
			ripple: '#606266'
		},
		primary: {
			main: '#409eff',
			bright: '#66b1ff',
			dim: '#3a8ee6',
			text: '#ffffff',
			ripple: '#ecf5ff'
		},
		success: {
			main: '#67c23a',
			bright: '#85ce61',
			dim: '#5daf34',
			text: '#ffffff',
			ripple: '#f0f9eb'
		},
		warning: {
			main: '#e6a23c',
			bright: '#ebb563',
			dim: '#cf9236',
			text: '#ffffff',
			ripple: '#fdf6ec'
		},
		error: {
			main: '#f56c6c',
			bright: '#f78989',
			dim: '#dd6161',
			text: '#ffffff',
			ripple: '#fef0f0'
		},
		transparent: {
			main: 'rgba(120,120,120,.2)',
			bright: 'rgba(240,240,240,.2)',
			dim: 'rgba(120,120,120,.1)',
			text: '#303133',
			ripple: 'rgba(0,0,0,.4)'
		}
	}
}

export type Theme = typeof theme
