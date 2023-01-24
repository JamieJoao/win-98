import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Link,
} from 'react-router-dom'

import {
  Home,
  Desktop,
} from '../pages'

export const MainRoute = () => {

  return (
    <Router basename='/win-98'>
      <Routes>
        <Route path='/' element={<Desktop />} />
      </Routes>
    </Router>
  )
}
