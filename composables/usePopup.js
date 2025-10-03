const win = shallowRef(null)
let interval = null
let timeout = null
export function usePopup() {
  const target = 'toggle-window'
  const api = {
    win,
    target,
    open: (url = 'about:blank') => {
      win.value = window.open('about:blank', target, 'width=600,height=800')
      clearTimeout(timeout)

      timeout = setTimeout(() => {
        window.open(url, target, 'width=600,height=800')
      }, 200)
    },
    bindings: {
      target,
      rel: 'noopener',
      external: true,
      onclick: (event) => {
        event.preventDefault()
        api.open(event.currentTarget.href)
        clearInterval(interval)

        interval = setInterval(() => {
          if (win.value.closed) {
            clearInterval(interval)
            win.value = null
            console.log('closed')
          }
        }, 100)
      },
    },
  }

  return api
}
