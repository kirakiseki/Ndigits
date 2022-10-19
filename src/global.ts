export interface Node {
  mat: number[][]
  fvalue: number
  layer: number
  parent: Node | undefined
}
export const digits = ref(8)
export const curveRate = ref(0.3)

export const startStatus8 = [[1, 0, 3], [4, 5, 6], [7, 2, 8]]
export const targetStatus8 = [[1, 5, 3], [4, 2, 6], [7, 8, 0]]
export const startStatus15 = [[1, 0, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 2, 15]]
export const targetStatus15 = [[1, 6, 3, 4], [5, 10, 7, 8], [9, 14, 11, 12], [13, 0, 2, 15]]
export const startStatus = ref<number[][]>(reactive(startStatus8))
export const targetStatus = ref<number[][]>(reactive(targetStatus8))
export const result = ref<Node[]>([])
export const Hfunc = ref<Function>(() => { })
export const Gfunc = ref<Function>(() => { })

