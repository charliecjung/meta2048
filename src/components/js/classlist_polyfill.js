const classlist_polyfill = () => {
  if (typeof window.Element === 'undefined' || 'classList' in document.documentElement) {
    return
  }

  class DOMTokenList extends Array {
    constructor (_el) {
      super()
      this.el = _el
      let classes = _el.className.replace(/^\s+|\s+$/g, '').split(/\s+/)
      for (var i = 0; i < classes.length; i++) {
        super.push.call(this, classes[i])
      }
    }

    add (token) {
      if (this.contains(token)) return
      super.push.call(this, token)
      this.el.className = this.toString()
    }

    contains (token) {
      return this.el.className.indexOf(token) !== -1
    }

    item (index) {
      return this[index] || null
    }

    remove (token) {
      if (!this.contains(token)) return
      for (var i = 0; i < this.length; i++) {
        if (this[i] === token) break
      }
      super.splice.call(this, i, 1)
      this.el.className = this.toString()
    }

    toString () {
      return super.join.call(this, ' ')
    }

    toggle (token) {
      if (!this.contains(token)) {
        this.add(token)
      } else {
        this.remove(token)
      }

      return this.contains(token)
    }
  }
  window.DOMTokenList = DOMTokenList

  function defineElementGetter (obj, prop, getter) {
    if (Object.defineProperty) {
      Object.defineProperty(obj, prop, {
        get: getter
      })
    } else {
      obj.__defineGetter__(prop, getter)
    }
  }

  defineElementGetter(HTMLElement.prototype, 'classList', function () {
    return new DOMTokenList(this)
  })
}

export { classlist_polyfill }
