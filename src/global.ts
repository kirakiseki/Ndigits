export interface Node {
  mat: number[][]
  fvalue: number
  layer: number
  parent: Node | undefined
  color: string
}

export const digits = ref(8)
export const curveRate = ref(0.2)
export const lineWidth = ref(3)
export const baseFontSize = ref(16)
export const interval = ref()
export const scrollWidth = ref(0)
export const startStatus8 = [[1, 0, 3], [4, 5, 6], [7, 2, 8]]
export const targetStatus8 = [[1, 3, 6], [2, 5, 0], [4, 7, 8]]
export const startStatus15 = [[1, 0, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 2, 15]]
export const targetStatus15 = [[1, 6, 3, 4], [5, 10, 7, 8], [9, 14, 11, 12], [13, 0, 2, 15]]
export const startStatus = ref<number[][]>(reactive(startStatus8))
export const targetStatus = ref<number[][]>(reactive(targetStatus8))
export const result = ref<Node[]>(reactive([]))
export const close = ref<Node[]>(reactive([]))
export const nodes = ref<Node[]>(reactive([]))
export const nodesLayer = ref<Node[][]>(reactive([[]]))
export const flatten = ref<Function>((arr: number[][]) => arr.reduce((acc, val) => acc.concat(val), []))
export const unflatten = ref<Function>((arr: number[], side: number) => {
  const result = []
  for (let i = 0; i < arr.length; i += side)
    result.push(arr.slice(i, i + side))
  return result
})
export const Hfunc1 = ref<Function>((a: Node) => {
  const arr = flatten.value(a.mat)
  const target = flatten.value(targetStatus.value)
  let count = 0
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== target[i])
      count++
  }
  return count
})
export const Hfunc2 = ref<Function>((a: Node) => {
  const now: number[] = flatten.value(a.mat)
  const target: number[] = flatten.value(targetStatus.value)
  function getManhattanDis(a: number, nowPos: number): number {
    const targetPos = target.indexOf(a)
    const nowX = nowPos % digits.value
    const nowY = Math.floor(nowPos / digits.value)
    const targetX = targetPos % digits.value
    const targetY = Math.floor(targetPos / digits.value)
    return Math.abs(nowX - targetX) + Math.abs(nowY - targetY)
  }
  return now.reduce((sum, num, index) => sum + getManhattanDis(num, index), 0)
})
export const Hselect = ref(1)
export const Hfunc = ref<Function>(Hfunc1.value)
export const Gfunc = ref<Function>((a: Node) => a.layer)
export const groupByLayer = ref<Function>((nodes: Node[]) => {
  return nodes.reduce((acc: Node[][], node) => {
    acc[node.layer] = acc[node.layer] || []
    acc[node.layer].push(node)
    return acc
  }, [])
})

export const randomColor = ref<Function>(() => {
  let str = '#'
  for (let i = 0; i < 6; i++)
    str += Math.floor(Math.random() * 16).toString(16)
  return str
})

export const isSolved = ref(false)

export const solve = ref<Function>(
  () => {
    function isEqual(a: Node, b: Node): boolean {
      const side = digits.value === 8 ? 3 : 4
      for (let i = 0; i < side; i++) {
        for (let j = 0; j < side; j++) {
          if (a.mat[i][j] !== b.mat[i][j])
            return false
        }
      }
      return true
    }

    function getBlankPosition(a: Node): { i: number; j: number } {
      const side = digits.value === 8 ? 3 : 4
      for (let i = 0; i < side; i++) {
        for (let j = 0; j < side; j++) {
          if (a.mat[i][j] === 0)
            return { i, j }
        }
      }
      return { i: -1, j: -1 }
    }

    function copyNode(a: Node): Node {
      return {
        mat: a.mat.map(row => row.slice()),
        fvalue: a.fvalue,
        layer: a.layer,
        parent: a.parent,
        color: a.color,
      }
    }

    function getNextMoveList(a: Node): Node[] {
      const moveTarget: Node[] = []
      const blank = getBlankPosition(a)
      const border = digits.value === 8 ? 2 : 3
      if (blank.i > 0) {
        const up = copyNode(a)
        up.mat[blank.i][blank.j] = up.mat[blank.i - 1][blank.j]
        up.mat[blank.i - 1][blank.j] = 0
        up.fvalue = Gfunc.value(up) + Hfunc.value(up)
        up.parent = a
        up.layer = a.layer + 1
        up.color = randomColor.value()
        moveTarget.push(up)
      }
      if (blank.i < border) {
        const down = copyNode(a)
        down.mat[blank.i][blank.j] = down.mat[blank.i + 1][blank.j]
        down.mat[blank.i + 1][blank.j] = 0
        down.fvalue = Gfunc.value(down) + Hfunc.value(down)
        down.parent = a
        down.layer = a.layer + 1
        down.color = randomColor.value()
        moveTarget.push(down)
      }
      if (blank.j > 0) {
        const left = copyNode(a)
        left.mat[blank.i][blank.j] = left.mat[blank.i][blank.j - 1]
        left.mat[blank.i][blank.j - 1] = 0
        left.fvalue = Gfunc.value(left) + Hfunc.value(left)
        left.parent = a
        left.layer = a.layer + 1
        left.color = randomColor.value()
        moveTarget.push(left)
      }
      if (blank.j < border) {
        const right = copyNode(a)
        right.mat[blank.i][blank.j] = right.mat[blank.i][blank.j + 1]
        right.mat[blank.i][blank.j + 1] = 0
        right.fvalue = Gfunc.value(right) + Hfunc.value(right)
        right.parent = a
        right.layer = a.layer + 1
        right.color = randomColor.value()
        moveTarget.push(right)
      }
      return moveTarget
    }

    function AStar(startNode: Node, targetNode: Node): { result: Node[]; close: Node[] } {
      if (isEqual(startNode, targetNode))
        return { result: [startNode], close: [] }
      const open = new PriorityQueue((a, b) => a.fvalue! - b.fvalue!)
      const close: Node[] = []
      open.push(startNode)
      while (open.length) {
        const currentNode = open.pop()
        if (close.some(node => isEqual(node, currentNode!)))
          continue
        if (isEqual(currentNode!, targetNode)) {
          const result: Node[] = []
          let node = currentNode
          while (node) {
            result.push(node)
            node = node.parent
          }
          isSolved.value = true
          return { result, close }
        }

        const nextMoveList = getNextMoveList(currentNode!)
        close.push(currentNode!)
        open.push(...nextMoveList)
      }
      return { result: [], close: [] }
    }

    const resp = AStar({ mat: startStatus.value, fvalue: 0, layer: 0, parent: undefined, color: randomColor.value() }, { mat: targetStatus.value, fvalue: Infinity, layer: Infinity, parent: undefined, color: randomColor.value() }) // TODO fix init layer settings
    result.value = resp.result
    close.value = resp.close
  },
)

class PriorityQueue {
  private data: Node[] = []
  private compare: (a: Node, b: Node) => number

  constructor(compare: (a: Node, b: Node) => number) {
    this.compare = compare
  }

  push(...value: Node[]) {
    for (const e of value)
      this.data.push(e)
    this.data.sort(this.compare)
  }

  pop() {
    return this.data.shift()
  }

  get length() {
    return this.data.length
  }
}
