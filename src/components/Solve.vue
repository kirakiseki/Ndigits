<script setup lang="ts">
import { Gfunc, Hfunc, digits, result, startStatus, targetStatus } from '~/global'
import type { Node } from '~/global'

Gfunc.value = (a: Node) => 0
Hfunc.value = (a: Node) => 0

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

function printNode(...a: Node[]): void {
  for (const e of a) {
    const side = digits.value === 8 ? 3 : 4
    console.log('st--------------')
    for (let i = 0; i < side; i++) {
      let str = ''
      for (let j = 0; j < side; j++)
        str += `${e.mat[i][j]} `
      console.log(str)
    }
    console.log(`end--------------layer${e.layer}`)
  }
}

function AStar(startNode: Node, targetNode: Node): Node[] {
  if (isEqual(startNode, targetNode)) // TODO 有解情况
    return []

  const open = new PriorityQueue((a, b) => a.fvalue! - b.fvalue!)
  const close: Node[] = []
  open.push(startNode)
  // const count = 0
  while (open.length) {
    // if (count > 50) {
    //   console.log(open.length)
    //   break
    // }

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
      return result
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
  return []
}

onMounted(() => { // TODO on mounted change
  const resultList = AStar({ mat: startStatus.value, fvalue: Infinity, layer: 0, parent: undefined }, { mat: targetStatus.value, fvalue: Infinity, layer: Infinity, parent: undefined }) // TODO fix init layer settings
  // printNode(...resultList)
  result.value = resultList
})
</script>

<template>
  test
</template>
