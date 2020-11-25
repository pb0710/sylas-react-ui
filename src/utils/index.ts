import * as React from 'react'

/**
 * 颜色格式转换-16进制Hex转Rgba
 * @param {string} hex 16进制色值
 * @param {number} opacity 透明度
 */
export function hex2Rgba(hex: string, opacity: number): string {
	const convert = (a: number, b: number) => parseInt(`0x${hex.slice(a, b)}`)
	return `rgba(
		${convert(1, 3)},
		${convert(3, 5)},
		${convert(5, 7)},
		${opacity}
	)`
}

// 判断两个dom是否为包含关系 => 参数1是否包含参数2（相等也算）
export const judgeElementContains = <T extends EventTarget & HTMLElement>(
	element: T,
	targetElement: T
): boolean => targetElement === element || element.contains(targetElement)

/**
 * 延迟
 * @param timeout 延时时间
 */
export function delay(timeout: number): Promise<number> {
	return new Promise((res) => {
		setTimeout(() => {
			res(timeout)
		}, timeout)
	})
}

/**
 * 读取二进制文件为base64
 * @param file 二进制
 */
export function readFile(file: File): Promise<string | ArrayBuffer | null> {
	return new Promise((resolve, reject) => {
		const fileReader = new FileReader()
		fileReader.readAsDataURL(file)
		fileReader.onload = () => {
			const base64 = fileReader.result
			resolve(base64)
		}
		fileReader.onerror = (err) => {
			reject(err)
		}
	})
}

/**
 * 递归子组件树
 * @param children 子节点
 * @param fn 回调
 */
export function recursiveMap(
	children: React.ReactNode,
	fn: (child: React.ReactNode) => React.ReactNode
): React.ReactNode {
	return React.Children.map(children, (child) => {
		if (!React.isValidElement(child)) return child

		if (child.props.children) {
			child = React.cloneElement(child, {
				children: recursiveMap(child.props.children, fn)
			})
		}

		return fn(child)
	})
}

export function capitalize(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1)
}
