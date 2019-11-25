import './Home.css'
import { Counter } from './Counter'
import { component, html } from 'haunted'

const Home = () => {
  document.title = `Todo App`
  return html`
    <div class="view-home">
      <h1>Project with routing, a clicker and todos.</h1>
      ${Counter()}
    </div>
  `
}

customElements.define('home-view', component(Home, { useShadowDOM: false }))
