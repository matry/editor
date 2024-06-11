

type NodePosition = {
  parentId: string
  index: number
}

type NodeMetadata = {
  root: boolean
  attributes: {}
  styles: {}
}

type TreeNode = {
  id: string
  children: string[]
  meta: NodeMetadata
}

type Artifact = Map<string, TreeNode>

const channel = new BroadcastChannel('artifact')

const randomId = (prefix = 'id', postfix = '', length = 8) => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('')

  if (!length) {
    length = Math.floor(Math.random() * chars.length)
  }

  let str = ''
  for (let i = 0; i < length; i++) {
    str += chars[Math.floor(Math.random() * chars.length)]
  }

  const pre = prefix ? `${prefix}_` : ''
  const post = postfix ? `_${postfix}` : ''

  return `${pre}${str}${post}`
}

export function move_node(artifact: Artifact, from: NodePosition, to: NodePosition, node: TreeNode) {
  const oldParent = artifact.get(from.parentId)
  if (oldParent && from.index >= 0) {
    oldParent.children.splice(from.index)
  }

  const newParent = artifact.get(to.parentId)
  if (newParent && to.index >= 0) {
    newParent.children.splice(to.index, 0, node.id)
  }

  artifact.set(node.id, node)
}

export function initArtifact() {
  console.log(1)
  const artifact: Artifact = new Map()

  const rootNode: TreeNode = {
    id: randomId(),
    children: [],
    meta: {
      root: true,
      attributes: {},
      styles: {},
    },
  }

  move_node(
    artifact,
    {
      parentId: '',
      index: -1,
    },
    {
      parentId: '',
      index: -1,
    },
    rootNode,
  )

  const childNode: TreeNode = {
    id: randomId(),
    children: [],
    meta: {
      root: false,
      attributes: {},
      styles: {},
    }
  }

  move_node(
    artifact,
    {
      parentId: '_',
      index: -1,
    },
    {
      parentId: rootNode.id,
      index: 0,
    },
    childNode,
  )

  const tertiaryNode: TreeNode = {
    id: randomId(),
    children: [],
    meta: {
      root: false,
      attributes: {},
      styles: {},
    },
  }

  move_node(
    artifact,
    {
      parentId: '_',
      index: -1,
    },
    {
      parentId: childNode.id,
      index: 0,
    },
    tertiaryNode,
  )

  console.log(2)
  console.log(artifact)
}

// move_node(artifact, { parentId: '_', index: -1 }, { parentId: null, index: 0 })

channel.onmessage = (e) => {
  const message = e.data

  console.log(message)
}
