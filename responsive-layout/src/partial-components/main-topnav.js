import { component, html } from 'haunted'
import './main-menu'
import './Topnav.css'

const TopNav = () => {
  return html`
    <div class="topnav">
      <main-menu></main-menu>
    </div>
  `
}

customElements.define('main-topnav', component(TopNav, { useShadowDOM: false }))
