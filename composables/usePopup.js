const win = shallowRef(null)
let interval = null

export function usePopup() {
  const target = 'toggle-window'
  return {
    win,
    target,
    open: (url = 'about:blank') => {
      window.open(url, target, 'width=600,height=800')
    },
    bindings: {
      target,
      rel: 'noopener',
      external: true,
      onclick: (event) => {
        event.preventDefault()
        win.value = window.open(
          event.currentTarget.href,
          target,
          'width=600,height=800',
        )

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
}
