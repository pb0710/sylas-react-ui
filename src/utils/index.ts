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
export const judgeElementContains = <T extends EventTarget & HTMLElement>(element: T, targetElement: T): boolean =>
	targetElement === element || element.contains(targetElement)
