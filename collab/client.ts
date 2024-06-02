import { Reflect } from '@rocicorp/reflect/client'
import { mutators } from './mutators'

const r = new Reflect({
  server: 'http://localhost:8080',
  roomID: 'my_room',
  userID: 'my_user',
  mutators,
})

const button = document.getElementById('button')!
button.onclick = () => {
  void r.mutate.increment(1)
}

r.subscribe(
  (tx) => {
    return tx.get<number>('count')
  },
  (count) => {
    return button.textContent = `${count}`
  },
)
