import localforage from 'localforage'

export async function initDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open('matry', 1)

    req.onupgradeneeded = function(e) {
      window.db = e.target.result

      if (!window.db.objectStoreNames.contains('files')) {
        const store = window.db.createObjectStore('files', { keyPath: 'id', autoIncrement: true })
        store.createIndex('lastModified', 'lastModified', { unique: false })
        store.createIndex('pageId', 'pageId', { unique: false })
      }
    }

    req.onerror = function(e) {
      reject(`Database error: ${e.target.errorCode}`)
    }

    req.onsuccess = function(e) {
      window.db = e.target.result
      resolve()
    }
  })
}

export async function storeFile(fileContent, fileType) {
  await localforage.setItem(fileType, fileContent)
}

export async function getLastEditedFile() {
  return new Promise((resolve, reject) => {
    const transaction = window.db.transaction(['files'], 'readwrite')
    const store = transaction.objectStore('files')
    const index = store.index('lastModified')
  
    let lastEditedHTML = null
    let lastEditedCSS = null
  
    index.openCursor(null, 'prev').onsuccess = function(e) {
      const cursor = e.target.result

      if (cursor) {
        if (cursor.value.type === 'html') {
          lastEditedHTML = cursor.value.content
          cursor.continue()
        } else if (cursor.value.type === 'css') {
          lastEditedCSS = cursor.value.content
          cursor.continue()
        }
      } else {
        if (lastEditedHTML) {
          resolve({ lastEditedHTML, lastEditedCSS })
        } else {
          reject('no files found')
        }
      }
    }
  })
}

async function getCSSByPageId(pageId) {
  return new Promise((resolve, reject) => {
    const transaction = window.db.transaction(['files'], 'readonly')
    const store = transaction.objectStore('files')
    const index = store.index('pageId')
    const req = index.get(pageId)
  
    req.onsuccess = (e) => {
      const fileEntry = e.target.result
      if (fileEntry?.type === 'css') {
        resolve(fileEntry.content)
      } else {
        reject('no css file found')
      }
    }

    req.onerror = () => {
      reject('no css file found')
    }
  })
}

// window.onload = async () => {
//   try {
//     await initDB()
//     const lastHTML = await getLastEditedHTML()

//     // try {
//     //   const lastCSS = await getCSSByPageId(lastHTML.pageId)
//     // } catch (error) {
//     //   console.error(error)
//     // }

//   } catch (error) {
//     console.error(error)
//   }
// }
