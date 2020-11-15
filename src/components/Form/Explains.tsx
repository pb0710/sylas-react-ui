import { createStyles, WithStyles, withStyles } from '@material-ui/styles'
import * as React from 'react'

const styles = createStyles({
	explain: {
		color: '#ff4d4f',
		margin: 8
	}
})

interface ExplainsProps extends WithStyles<typeof styles> {
	explains: string[]
}

const Explains: React.FC<ExplainsProps> = (props) => {
	const { classes, explains = [] } = props
	return (
		// can not use jsx shorthand of <></> with typescript: https://github.com/preactjs/preact-www/issues/480
		<React.Fragment>
			{explains.map((explain) => (
				<p key={explain} className={classes.explain}>
					{explain}
				</p>
			))}
		</React.Fragment>
	)
}

export const InternalExplains = withStyles(styles, { name: 'Explains' })(Explains)
InternalExplains.displayName = 'Explains'
