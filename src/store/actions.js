import * as types from './mutation_type'
import { getStorage, setStorage } from '../js/util'
import { themeList } from '../js/constant'

const setState = (commit, data) => {
  commit(types.SET_STATE, data)
}

const setHtmlTheme = (theme) => {
  setStorage('theme', theme)
  let html = document.documentElement || document.body
  html.setAttribute('data-theme', theme)
}

export default {
  setTheme ({ commit }, theme) {
    const defaltTheme = themeList[0]
    const localTheme = getStorage('theme')

    if (localTheme && !theme) {
      setState(commit, {
        key: 'theme',
        val: localTheme
      })
    } else if (!localTheme && !theme) {
      setState(commit, {
        key: 'theme',
        val: defaltTheme
      })
    } else {
      setState(commit, {
        key: 'theme',
        val: theme
      })
    }

    setHtmlTheme(theme || localTheme || defaltTheme)
  }
}