export const clone = function (data) {
  if (!data || typeof data === 'string') {
    return data
  }
  return JSON.parse(JSON.stringify(data))
}

export let setStorage = function (key, value) {
  try {
    if (typeof value === 'string') {
      localStorage.setItem(key, value)
    } else {
      let data = getStorage(key) || {}
      localStorage.setItem(key, JSON.stringify(Object.assign({v: new Date().getTime()}, data, clone(value))))
    }
  } catch (err) {
    console.log(err)
  }
}
export let getStorage = function (key) {
  try {
    let value
    try {
      value = JSON.parse(localStorage.getItem(key))
    } catch (err) {
      value = localStorage.getItem(key)
    }
    return value
  } catch (err) {
    console.log(err)
  }
}
