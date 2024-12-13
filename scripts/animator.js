if (globalThis.Animation && !globalThis.Animation.prototype._patched) {
  let oldFunc = globalThis.Animation.prototype.addEventListener

  globalThis.Animation.prototype.addEventListener = function () {
    console.log('BRO', arguments)
    oldFunc.call(this, ...arguments)
  }
  globalThis.Animation.prototype._patched = true
}
