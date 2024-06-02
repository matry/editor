import React from 'react'

interface NodeListProps {
  nodes: MatryNode[]
}

export default function CanvasNodeList({ nodes }: NodeListProps) {
  return (
    <ul className="node-list">
      {nodes.map((node) => {
        return (
          <li
            key={node.id}
            tabIndex={0}
          >
            {node.id}
            {/* {node.text_content ?? null} */}
            {node.children.length > 0 && (
              <CanvasNodeList nodes={node.children} />
            )}
          </li>
        )
      })}
    </ul>
  )
}
