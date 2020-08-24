class ElementWrapper {
  constructor(type) {
    this.root = document.createElement(type)
  }

  setAttribute(name, value) {
    this.root.setAttribute(name, value)
  }

  appendChild(component) {
    this.root.appendChild(component.root)
  }
}

class TextWrapper {
  constructor(type) {
    this.root = document.createTextNode(type)
  }
}

export class Component {
  constructor(type) {
    this.props = Object.create(null)
    this.children = []
    this._root = null
  }

  setAttribute(name, value) {
    this.props[name] = value
  }

  appendChild(component) {
    this.children.push(component)
  }

  get root() {
    if (!this._root) {
      this._root = this.render().root
    }

    return this._root
  }
}

export function createElement(type, attributes, ...children) {
  let elem

  if (typeof type === 'string') {
    elem = new ElementWrapper(type)
  } else {
    elem = new type()
  }

  for (const attrName in attributes) {
    elem.setAttribute(attrName, attributes[attrName])
  }

  const insertChildren = (children) => {
    for (let child of children) {
      if (typeof child === 'string') {
        child = new TextWrapper(child)
      }

      if (typeof child === 'object' && child instanceof Array) {
        insertChildren(child)
      } else {
        elem.appendChild(child)
      }
    }
  }

  insertChildren(children)

  return elem
}

export function render(component, parentElement) {
  parentElement.appendChild(component.root)
}
