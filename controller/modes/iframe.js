import { channel } from "../listener"

export class ExtensionManager {
  isOpeningExtension = false

  sourceMap = {
    css: 'extensions/css/index.html',
  }

  constructor() {
    channel.listen((e) => {
      const message = e.data

      switch (message.action) {
        case 'open_extension':
          this.openExtension(message.data)
          break
        case 'extension_did_open':
          this.extensionDidOpen(message.data)
          break
        default:
          break
      }
    })
  }

  openExtension() {
    this.isOpeningExtension = true
  }

  extensionDidOpen() {
    this.isOpeningExtension = false
  }
}
