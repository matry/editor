import React from 'react'
import CanvasNodeList from './CanvasNodeList'

interface AppProps {
  nodes: MatryNode[]
}
export default function App({ nodes }: AppProps) {
  return (
    <CanvasNodeList nodes={nodes} />
  )
}
