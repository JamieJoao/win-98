import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Link,
} from 'react-router-dom'

import {
  System,
} from '../pages'

export const MainRoute = () => {

  return (
    <Router basename='/win-98'>
      <Routes>
        {/* <Route path='/' element={<Desktop />} /> */}
        <Route path='/' element={<System />} />
      </Routes>
    </Router>
  )
}
