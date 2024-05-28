import produce from 'immer'

export class State {
  model = {}

  constructor(model, onChange) {
    this.model = model
    this.onChange = onChange
  }

  get current() {
    return this.model
  }

  set current(update) {
    this.model = {
      ...this.model,
      ...update,
    }

    const model = produce(this.model, (draft) => {
      const keys = Object.keys(update)

      keys.forEach((key) => {
        draft[key] = update[key]
      })
    })

    this.model = model

    this.onChange(model, update)
  }
}
