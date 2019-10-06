import { createContext } from 'https://unpkg.com/haunted/haunted.js?module';

export const DbContext = createContext()

customElements.define('db-provider', DbContext.Provider)