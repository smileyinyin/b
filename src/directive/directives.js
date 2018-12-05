import store from '@/store'
import { on } from '@/libs/tools'
let listenAction

const directives = {
  draggable: {
    inserted: (el, binding, vnode) => {
      let triggerDom = document.querySelector(binding.value.trigger)
      triggerDom.style.cursor = 'move'
      let bodyDom = document.querySelector(binding.value.body)
      let pageX = 0
      let pageY = 0
      let transformX = 0
      let transformY = 0
      let canMove = false
      const handleMousedown = e => {
        let transform = /\(.*\)/.exec(bodyDom.style.transform)
        if (transform) {
          transform = transform[0].slice(1, transform[0].length - 1)
          let splitxy = transform.split('px, ')
          transformX = parseFloat(splitxy[0])
          transformY = parseFloat(splitxy[1].split('px')[0])
        }
        pageX = e.pageX
        pageY = e.pageY
        canMove = true
      }
      const handleMousemove = e => {
        let xOffset = e.pageX - pageX + transformX
        let yOffset = e.pageY - pageY + transformY
        if (canMove) bodyDom.style.transform = `translate(${xOffset}px, ${yOffset}px)`
      }
      const handleMouseup = e => {
        canMove = false
      }
      on(triggerDom, 'mousedown', handleMousedown)
      on(document, 'mousemove', handleMousemove)
      on(document, 'mouseup', handleMouseup)
    },
    update: (el, binding, vnode) => {
      if (!binding.value.recover) return
      let bodyDom = document.querySelector(binding.value.body)
      bodyDom.style.transform = ''
    }
  },

  // 图片大图预览
  preview: {
    inserted: function(el) {
      el.style.cursor = 'zoom-in'
      const wrapperStyle = 'position:fixed;left:0;top:0;right:0;bottom:0;background-color:rgba(0,0,0,.4);transition:all .2s ease-in-out;z-index:10000;'
      const imgStyle = 'position:absolute;cursor:zoom-out;transition:all .2s ease-in-out;transform: translateZ(0);'
      el.addEventListener('click', function(e) {
        let body = document.body
        let winHeight = window.innerHeight
        let winWidth = window.innerWidth
        let sourceImg = e.target
        let rect = sourceImg.getBoundingClientRect()

        // show wrapper
        let wrapper = document.createElement('div')
        wrapper.style = wrapperStyle
        wrapper.addEventListener('click', removeWrapper)
        setTimeout(() => {
          window.addEventListener('scroll', removeWrapper)
        }, 16.67)

        // show img
        let img = new Image()
        let top = 0
        let left = 0
        let width = sourceImg.naturalWidth
        let height = sourceImg.naturalHeight
        let isWider = width / height > winWidth / winHeight
        img.src = sourceImg.src

        // 判断 img 宽高
        if (isWider && width > winWidth) { // 宽高比大于窗口 且比窗口宽
          height = height * winWidth / width
          width = winWidth
        } else if (!isWider && height > winHeight) {
          width = width * winHeight / height
          height = winHeight
        }

        // 判断左/上距离
        if (width < winWidth) {
          left = (winWidth - width) / 2
        }
        if (height < winHeight) {
          top = (winHeight - height) / 2
        }
        img.style = `${imgStyle}left:${rect.left}px;top:${rect.top}px;width:${rect.width}px;height:${rect.height}px;opacity:.2;`
        wrapper.appendChild(img)
        body.appendChild(wrapper)

        setTimeout(() => {
          wrapper.style.backgroundColor = 'rgba(0,0,0,.8)'
          img.style = `${imgStyle}left:${left}px;top:${top}px;width:${width}px;height:${height}px;`
        }, 16.67)

        function removeWrapper(e) {
          e.stopPropagation()
          wrapper.removeEventListener('click', removeWrapper)
          window.removeEventListener('scroll', removeWrapper)
          body.removeChild(wrapper)
        }
      })
    }
  },

  // 页面滚动固定dom
  sticky: {
    inserted(el, binding) {
      const params = binding.value || {}
      const stickyTop = params.stickyTop || 0
      const zIndex = params.zIndex || 1000
      const elStyle = el.style

      elStyle.position = '-webkit-sticky'
      elStyle.position = 'sticky'
      // if the browser support css sticky（Currently Safari, Firefox and Chrome Canary）
      // if (~elStyle.position.indexOf('sticky')) {
      //     elStyle.top = `${stickyTop}px`;
      //     elStyle.zIndex = zIndex;
      //     return
      // }
      const elHeight = el.getBoundingClientRect().height
      const elWidth = el.getBoundingClientRect().width
      elStyle.cssText = `top: ${stickyTop}px; z-index: ${zIndex}`

      const parentElm = el.parentNode || document.documentElement
      const placeholder = document.createElement('div')
      placeholder.style.display = 'none'
      placeholder.style.width = `${elWidth}px`
      placeholder.style.height = `${elHeight}px`
      parentElm.insertBefore(placeholder, el)

      let active = false

      const getScroll = (target, top) => {
        const prop = top ? 'pageYOffset' : 'pageXOffset'
        const method = top ? 'scrollTop' : 'scrollLeft'
        let ret = target[prop]
        if (typeof ret !== 'number') {
          ret = window.document.documentElement[method]
        }
        return ret
      }

      const sticky = () => {
        if (active) {
          return
        }
        if (!elStyle.height) {
          elStyle.height = `${el.offsetHeight}px`
        }

        elStyle.position = 'fixed'
        elStyle.width = `${elWidth}px`
        placeholder.style.display = 'inline-block'
        active = true
      }

      const reset = () => {
        if (!active) {
          return
        }

        elStyle.position = ''
        placeholder.style.display = 'none'
        active = false
      }

      const check = () => {
        const scrollTop = getScroll(window, true)
        const offsetTop = el.getBoundingClientRect().top
        if (offsetTop < stickyTop) {
          sticky()
        } else {
          if (scrollTop < elHeight + stickyTop) {
            reset()
          }
        }
      }
      listenAction = () => {
        check()
      }

      window.addEventListener('scroll', listenAction)
    },

    unbind() {
      window.removeEventListener('scroll', listenAction)
    }
  },

  // 按钮级 权限控制
  'permission': {
    inserted(el, binding, vnode) {
      const { value } = binding
      const role = store.getters && store.getters.getCurRole

      if (value && value instanceof Array && value.length > 0) {
        const hasPermission = role && value.indexOf(role) > -1

        if (!hasPermission) {
          el.parentNode && el.parentNode.removeChild(el)
        }
      } else {
        throw new Error(`need roles! Like v-permission="['admin','editor']"`)
      }
    }
  }
}

export default directives
