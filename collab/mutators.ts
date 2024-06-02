import type { WriteTransaction } from '@rocicorp/reflect'

async function increment(tx: WriteTransaction, delta: number) {
  const value = (await tx.get<number>('count')) ?? 0
  await tx.set('count', value + delta)
}

async function addNode(tx: WriteTransaction, node: MatryNode) {
  const nodes = await tx.get<MatryNode[]>('nodes') ?? []

  const existingNodes: MatryNode[] = JSON.parse(JSON.stringify(nodes))

  existingNodes.push(node)

  await tx.set('nodes', existingNodes)
}

export const mutators = {
  increment,
  addNode,
}
