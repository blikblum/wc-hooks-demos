import { useContext, component, html } from 'haunted'
import './Sidenav.css'

import './main-menu'

/* We need context in this component to show/hide sidenav */
import { AppContext } from '../AppContext'

const SideNav = () => {
  const context = useContext(AppContext)
  return html`
    <div class=${'sidenav ' + (context.navOpen ? 'show' : 'hide')}>
      <main-menu></main-menu>
    </div>
  `
}

customElements.define(
  'main-sidenav',
  component(SideNav, { useShadowDOM: false })
)
