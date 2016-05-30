class SAWPTEElement {
  constructor(selector) {
    this.selector = selector;
    this.dom = document.querySelector(selector);
    if (!this.dom) {
      console.error(`Failed create DOM object. selector="${selector}"`);
    }
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
  addClass(className) {
    this.dom.classList.add(className);
  }
  removeClass(className) {
    this.dom.classList.remove(className);
  }
}

module.exports = SAWPTEElement
