import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import store from 'context/store'
import Win98App from './Win98App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <Win98App />
  </Provider>,
)
