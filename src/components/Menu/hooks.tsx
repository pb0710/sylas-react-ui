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
	getCurrentKey(): string | undefined
}

export function useMenu(): IMenu {
	// 所有 MenuItem id 集中存放
	const [ids, setIds] = React.useState<IIds>({})

	const getCurrentKey = () => {
		for (const key in ids) {
			if (Object.prototype.hasOwnProperty.call(ids, key)) {
				const element = ids[key]
				if (element) {
					return key
				}
			}
		}
	}

	const setCurrentKey = (id: string) => {
		setIds(prev => {
			const result = {}
			for (const key in prev) {
				if (Object.prototype.hasOwnProperty.call(prev, key)) {
					result[key] = key === id
				}
			}
			return result
		})
	}

	const syncMenuId: IIdEffect = (id: string) => {
		setIds(prev => ({ ...prev, [id]: false }))
	}

	return { ids, syncMenuId, getCurrentKey, setCurrentKey }
}
