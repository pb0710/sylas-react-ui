import * as React from 'react'

export interface Ids {
	[key: string]: boolean
}

export interface IdEffect {
	(id: string): void
}

export interface Menu {
	ids: Ids
	syncMenuId: IdEffect
	setCurrentKey: IdEffect
	getCurrentKey(): string | undefined
}

export function useMenu(): Menu {
	// 所有 MenuItem id 集中存放
	const [ids, setIds] = React.useState<Ids>({})

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
		setIds((prev) => {
			const result = {}
			for (const key in prev) {
				if (Object.prototype.hasOwnProperty.call(prev, key)) {
					result[key] = key === id
				}
			}
			return result
		})
	}

	const syncMenuId: IdEffect = (id: string) => {
		setIds((prev) => ({ ...prev, [id]: false }))
	}

	return { ids, syncMenuId, getCurrentKey, setCurrentKey }
}
