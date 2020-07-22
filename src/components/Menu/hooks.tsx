import React from 'react'

export interface IIds {
	[key: string]: boolean
}

export interface IIdEffect {
	(id: string): void
}

export interface IMenu {
	ids: IIds
	syncMenuId: IIdEffect
	setCurrentKey: IIdEffect
}

export function useMenu(): IMenu {
	// 所有 MenuItem id 集中存放
	const [ids, setIds] = React.useState<IIds>({})

	const setCurrentKey = (id: string) => {
		setIds(prev => {
			const result = {}
			for (const key in prev) {
				if (prev.hasOwnProperty(key)) {
					result[key] = key === id
				}
			}
			return result
		})
	}

	const syncMenuId: IIdEffect = (id: string) => {
		setIds(prev => ({ ...prev, [id]: false }))
	}

	return { ids, syncMenuId, setCurrentKey }
}
