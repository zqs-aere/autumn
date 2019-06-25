import './components'
import './style/reset.scss'
import './style/global.scss'
import '../public/js/fast-click'

const attachFastClick = Origami.fastclick
attachFastClick(document.body)
