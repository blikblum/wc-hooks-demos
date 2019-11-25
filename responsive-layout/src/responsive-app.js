import { component, html, useState } from 'haunted'
import { useMediaPredicate } from 'react-media-hook'
import { getCurrentDate } from './utils/date'

import { AppContext } from './AppContext'

// webcomponents
import './partial-components/main-sidenav'
import './partial-components/main-topnav'
import './view-components/home-view'
import './view-components/todos/todos-view'
import './view-components/not-found-view'

import logo from './images/logo.png'

customElements.define('app-provider', AppContext.Provider)

function App() {
  let isMediumPlus = useMediaPredicate('(min-width: 600px)') ? false : true
  let currentDate = getCurrentDate('year', '')

  const defaultAppState = {
    navOpen: false,
    toggleSidenav: value => {
      setApp(data => ({ ...data, navOpen: value }))
    }
  }

  const [appData, setApp] = useState(defaultAppState)

  return html`
    <app-provider .value=${appData}>
      <div class=${`app-container ${!isMediumPlus ? 'medium' : 'small'}`}>
        <main>
          <header>
            <div class="logo">
              <img src="${logo}" alt="logo" />
            </div>
            <main-topnav></main-topnav>
          </header>

          <section>
            <stencil-router>
              <stencil-route-switch>
                <stencil-route
                  url="/"
                  component="home-view"
                  .exact=${true}
                ></stencil-route>
                <stencil-route
                  url="/todos"
                  component="todos-view"
                ></stencil-route>
                <stencil-route component="not-found-view"></stencil-route>
              </stencil-route-switch>
            </stencil-router>
          </section>

          <footer>
            <p>The Todo Company &copy; ${currentDate}</p>
          </footer>
        </main>
        <main-sidenav></main-sidenav>
      </div>
    </app-provider>
  `
}

customElements.define('responsive-app', component(App, { useShadowDOM: false }))
