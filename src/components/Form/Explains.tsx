import * as React from 'react'

interface ExplainsProps {
	explains: string[]
}

export const Explains: React.FC<ExplainsProps> = (props) => {
	const { explains = [] } = props
	return (
		<React.Fragment>
			{explains.map((explain) => (
				<p key={explain}>{explain}</p>
			))}
		</React.Fragment>
	)
}
