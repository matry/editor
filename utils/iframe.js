export const messageParent = (data) => {
  window.parent.postMessage(data)
}

export const messageChild = (data) => {
  if (window.frames[0]) {
    window.frames[0].postMessage(data)
  }
}

export const listenToMessages = (callback) => {
  window.onmessage = ({ data }) => {
    callback(data)
  }
}
