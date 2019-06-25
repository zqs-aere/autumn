import Vue from 'vue'
import VueMarkdown from 'vue-markdown'

import './components'
import './style/reset.scss'
import './style/global.scss'
import '../public/js/fast-click'

const attachFastClick = Origami.fastclick
attachFastClick(document.body || document.documentElement)

Vue.component('mark-down', VueMarkdown)
