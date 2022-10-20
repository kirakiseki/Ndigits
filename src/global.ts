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
export const result = ref<Node[]>(reactive([]))
export const close = ref<Node[]>(reactive([]))
export const Hfunc = ref<Function>(() => { })
export const Gfunc = ref<Function>(() => { })
export const flatten = ref<Function>((arr: number[][]) => arr.reduce((acc, val) => acc.concat(val), []))
export const unflatten = ref<Function>((arr: number[], side: number) => {
  const result = []
  for (let i = 0; i < arr.length; i += side)
    result.push(arr.slice(i, i + side))
  return result
})
export const groupBy = ref<Function>((nodes: Node[]) => {
  return nodes.reduce((acc: Node[][], node) => {
    acc[node.layer] = acc[node.layer] || []
    acc[node.layer].push(node)
    return acc
  }, [])
})
export const isSolved = ref(false)

export const solve = ref<Function>(
  () => {
    Gfunc.value = (a: Node) => a.layer
    Hfunc.value = (a: Node) => {
      const arr = flatten.value(a.mat)
      const target = flatten.value(targetStatus.value)
      let count = 0
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== target[i])
          count++
      }
      return count
    }

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
        moveTarget.push(up)
      }
      if (blank.i < border) {
        const down = copyNode(a)
        down.mat[blank.i][blank.j] = down.mat[blank.i + 1][blank.j]
        down.mat[blank.i + 1][blank.j] = 0
        down.fvalue = Gfunc.value(down) + Hfunc.value(down)
        down.parent = a
        down.layer = a.layer + 1
        moveTarget.push(down)
      }
      if (blank.j > 0) {
        const left = copyNode(a)
        left.mat[blank.i][blank.j] = left.mat[blank.i][blank.j - 1]
        left.mat[blank.i][blank.j - 1] = 0
        left.fvalue = Gfunc.value(left) + Hfunc.value(left)
        left.parent = a
        left.layer = a.layer + 1
        moveTarget.push(left)
      }
      if (blank.j < border) {
        const right = copyNode(a)
        right.mat[blank.i][blank.j] = right.mat[blank.i][blank.j + 1]
        right.mat[blank.i][blank.j + 1] = 0
        right.fvalue = Gfunc.value(right) + Hfunc.value(right)
        right.parent = a
        right.layer = a.layer + 1
        moveTarget.push(right)
      }
      return moveTarget
    }

    // function printNode(...a: Node[]): void {
    //   for (const e of a) {
    //     const side = digits.value === 8 ? 3 : 4
    //     console.log('st--------------')
    //     for (let i = 0; i < side; i++) {
    //       let str = ''
    //       for (let j = 0; j < side; j++)
    //         str += `${e.mat[i][j]} `
    //       console.log(str)
    //     }
    //     console.log(`end--------------layer${e.layer}`)
    //   }
    // }

    // function getReversedPairs(a: Node): number {
    //   const aMat = flatten.value(a.mat)
    //   let count = 0
    //   for (let i = 0; i < aMat.length; i++) {
    //     for (let j = i + 1; j < aMat.length; j++) {
    //       if (aMat[i] > aMat[j])
    //         count++
    //     }
    //   }
    //   return count
    // }

    function AStar(startNode: Node, targetNode: Node): { result: Node[]; close: Node[] } {
      // console.log('start')
      // TODO when start=target display
      if (isEqual(startNode, targetNode))
        return { result: [], close: [] }
      // if (getReversedPairs(startNode) % 2 !== getReversedPairs(targetNode) % 2) {
      //   console.log('no solution')
      //   return []
      // }// TODO
      const open = new PriorityQueue((a, b) => a.fvalue! - b.fvalue!)
      const close: Node[] = []
      open.push(startNode)
      while (open.length) {
        const currentNode = open.pop()
        // console.log('currentNode')
        // printNode(currentNode!)
        // console.log(`now/tar${isEqual(currentNode!, targetNode)}`)
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
        // for (const node of nextMoveList) {
        //   console.log(`next/tar${isEqual(node, targetNode)}`)
        //   printNode(node!)
        // }
        // console.log(`pushed${nextMoveList.length}`)
        // console.log(`---e---${count++}`)
      }
      return { result: [], close: [] }
    }

    const resp = AStar({ mat: startStatus.value, fvalue: Infinity, layer: 1, parent: undefined }, { mat: targetStatus.value, fvalue: Infinity, layer: Infinity, parent: undefined }) // TODO fix init layer settings
    result.value = resp.result
    close.value = resp.close
    // console.log(close.value)
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
