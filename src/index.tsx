import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { App } from './App'

import './index.css'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement as HTMLElement)

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
