// examples
const customerData = [
  {
    ssn: '444-44-4444', name: 'Bill', age: 35, email: 'bill@company.com',
  },
  {
    ssn: '555-55-5555', name: 'Donna', age: 32, email: 'donna@home.org',
  },
]

const initializeDatabase = (db) => {
  const nameStore = db.createObjectStore('names', { autoIncrement: true })

  // create an objectStore to hold info about customers. SSN is key becasue it's unique
  const objectStore = db.createObjectStore('customers', { keyPath: 'ssn' })

  // create index to search customers by name
  objectStore.createIndex('name', 'name', { unique: false })

  // create index to search by email. email is unique
  objectStore.createIndex('email', 'email', { unique: true })

  objectStore.transaction.oncomplete = () => {
    const customerObjectStore = db.transaction('customers', 'readwrite').objectStore('customers')

    customerData.forEach((customer) => {
      customerObjectStore.add(customer)
    })
  }

  nameStore.transaction.oncomplete = () => {
    customerData.forEach((customer) => {
      nameStore.add(customer.name)
    })
  }
}

const addData = (db) => {
  const transaction = db.transaction(['customers'], 'readwrite')
}

const request = window.indexedDB.open('StrideDatabase', 1)

request.onerror = (event) => {
  console.error('request failed')
}

request.onsuccess = (event) => {
  // db = event.target.result
}

request.onupgradeneeded = (event) => {
  initializeDatabase(event.target.result)
}
