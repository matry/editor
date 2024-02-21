
export class Channel {
  constructor(topic) {
    this.bc = new BroadcastChannel(topic)
  }

  post(message) {
    this.bc.postMessage(message)
  }

  listen(callback) {
    this.bc.onmessage = callback
  }

  close() {
    this.bc.close()
  }
}
