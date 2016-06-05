class SAWPTEElement {
  static querySelectorAll(selector) {
    let doms = document.querySelectorAll(selector);
    return Array.prototype.slice.call(doms).map(dom => new SAWPTEElement(selector, dom));
  }

  constructor(selector, dom) {
    this.selector = selector;
    this.dom = dom;
    if (!this.dom) {
      console.error(`Failed create DOM object. selector="${selector}"`);
    }
  }

  $(selector) {
    let doms = this.dom.querySelectorAll(selector);
    return Array.prototype.slice.call(doms).map(dom => new SAWPTEElement(selector, dom));
  }

  on(eventName, func) {
    if (this.dom) {
      this.dom.addEventListener(eventName, func);
    } else {
      console.error(`Failed add "${eventName}" event to ${this.selector} object.`);
    }
  }

  setHtml(contents) {
    this.dom.innerHTML = contents;
  }

  setValue(contents) {
    this.dom.value = contents;
  }

  addClass(className) {
    this.dom.classList.add(className);
  }

  removeClass(className) {
    this.dom.classList.remove(className);
  }
}

module.exports = SAWPTEElement
