import localforage from 'localforage'

const storageInstance = localforage.createInstance({
  name: process.env.VUE_APP_NAME,
  driver: localforage.LOCALSTORAGE
})

export default storageInstance
