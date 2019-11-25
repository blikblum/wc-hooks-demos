import { useContext, html, component } from 'haunted'
import { AppContext } from '../AppContext'

const Menu = () => {
  const context = useContext(AppContext)
  return html`
    <ul>
      <li class="link">
        <stencil-route-link exact active-class="active" url="/">
          Home
        </stencil-route-link>
      </li>
      <li class="link">
        <stencil-route-link active-class="active" url="/todos">
          Todos
        </stencil-route-link>
      </li>
      <li class="link">
        <a href="https://github.com/httpJunkie/react-todo">Source Code</a>
      </li>
      <li class="menu">
        <fa-icon
          icon="bars"
          class="hoverable"
          @click=${() => {
            context.toggleSidenav(!context.navOpen)
          }}
        ></fa-icon>
      </li>
    </ul>
  `
}

customElements.define('main-menu', component(Menu, { useShadowDOM: false }))
