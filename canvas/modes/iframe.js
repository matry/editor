
export class ExtensionManager {
  isOpeningExtension = false
  sourceMap = {
    'css': 'extensions/css/index.html',
  }

  constructor() {
    window.addEventListener('message', ({ data }) => {
      if (!data.action) {
        return
      }

      switch (data.action) {
        case 'open_extension':
          this.openExtension(data.data)
          break
        case 'extension_did_open':
          this.extensionDidOpen(data.data)
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
