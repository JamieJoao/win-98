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
    <Router>
      <Routes>
        <Route path='/' element={<Desktop />} />
      </Routes>
    </Router>
  )
}
