import {
  useState,
  useReducer,
  useRef,
  useEffect,
  html,
  component
} from 'haunted'

import './Todos.css'

import * as constants from './constants'
import { todoReducer } from './todoReducer'

const initialState = [...constants.TODO_SEED]

const Todo = () => {
  const [todos, dispatch] = useReducer(todoReducer, initialState)
  const [textInput, setTextInput] = useState('')
  const completedTodos = todos.filter(todo => todo.complete)

  useEffect(() => {
    document.title = `${completedTodos.length} completed todos`
  })

  function addTodo(event) {
    event.preventDefault()
    dispatch({
      type: 'ADD_TODO',
      name: textInput,
      complete: false
    })
    setTextInput('')
  }

  function toggleComplete(id) {
    dispatch({ type: 'TOGGLE_COMPLETE', id })
  }
  function deleteTodo(id) {
    dispatch({ type: 'DELETE_TODO', id })
  }
  function clearTodos() {
    dispatch({ type: 'CLEAR_TODOS' })
  }

  function rowStyle(todo) {
    const isEven = todo.id % 2 == 0
    const evenColor = "background-color: 'rgb(245, 245, 245, 0.99)';"
    const oddColor = "background-color: 'rgb(252, 252, 252, 0.99)';"
    return isEven ? evenColor : oddColor
  }

  function textInputOnChange(event) {
    const value = event.target.value
    if (textInput !== value) {
      setTextInput(value)
    }
  }

  return html`
    <div className="todo-form">
      <form @submit=${addTodo}>
        <input
          @change=${textInputOnChange}
          .value=${textInput}
          type="search"
          placeholder="Enter task..."
          autocomplete="off"
        />
        <button @click=${addTodo} type="submit">
          <fa-icon icon="plus"></fa-icon> Add
        </button>
      </form>
    </div>
    <div className="todo-container">
      <table style="width: '800px'; height: '400px';">
        <tbody>
          ${todos.map(todo => {
            return html`
              <tr style=${rowStyle(todo)}>
                <td width="40px">${todo.id}</td>
                <td width="250px">${todo.name}</td>
                <td>
                  <input
                    type="checkbox"
                    @click=${() => toggleComplete(todo.id)}
                    ?checked=${todo.complete}
                    .value=${todo}
                  />
                </td>
                <td width="120px">
                  <button @click=${() => deleteTodo(todo.id)}>
                    <fa-icon icon="trash"></fa-icon>
                  </button>
                </td>
              </tr>
            `
          })}
        </tbody>
      </table>
    </div>

    <button look="bare" icon="reset" @click=${() => clearTodos()}>
      Clear All Todos
    </button>
  `
}

customElements.define('todos-view', component(Todo, { useShadowDOM: false }))
