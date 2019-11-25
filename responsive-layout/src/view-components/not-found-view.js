class NotFound extends HTMLElement {
  connectedCallback() {
    this.innerHTML = '<h2>Page Not Found</h2>'
  }
}

customElements.define('not-found-view', NotFound)
