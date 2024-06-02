import React from 'react'
import ReactDOM from 'react-dom/client'
import { Reflect } from '@rocicorp/reflect/client'
import { mutators } from './mutators'
import App from './App'
import { randomId } from './utils'

const r = new Reflect({
  server: 'http://localhost:8080',
  roomID: 'room-1',
  userID: 'my_user',
  mutators,
})

const reactRoot = ReactDOM.createRoot(document.getElementById('app')!)

function render(nodes: MatryNode[]) {
  reactRoot.render(
    <App nodes={nodes} />
  )
}

function init() {
  r.subscribe(
    (tx) => {
      return tx.get<MatryNode[]>('nodes')
    },
    (nodes) => {
      if (nodes) {
        render(JSON.parse(JSON.stringify(nodes)))
      }
    },
  )

  window.addEventListener('keydown', (e) => {
    e.stopPropagation()

    switch (e.key) {
      case 'ArrowUp':
        r.mutate.addNode({
          id: randomId(),
          type: 'shape',
          text_content: '',
          children: [],
        })
        break
      default:
        console.log(`pressed ${e.key} key`)
        break
    }
  })
}

init()
