import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'

import { System } from 'views'

export const MainRoute = () => {

  return (
    <Router basename='/win-98'>
      <Routes>
        <Route path='/' element={<System />} />
      </Routes>
    </Router>
  )
}
