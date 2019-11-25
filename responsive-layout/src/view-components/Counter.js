import { useState, useEffect, virtual, html } from 'haunted'

export const Counter = virtual(() => {
  const [count, setCount] = useState(0)
  const incrementCount = () => setCount(count + 1)

  useEffect(() => {
    document.title = `You clicked ${count} times`
  })

  return html`
    <p>You clicked ${count} times</p>
    <button @click="${incrementCount}">Click Me</button>
  `
})
