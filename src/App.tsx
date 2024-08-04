import AboutPage from "./pages/About"
import HomePage from "./pages/Home"
import SearchPage from "./pages/Search"
import { Route } from "./Route"
import { Router } from "./Router"

function App() {


  return (
    <Router>
      <Route path="/" Component={HomePage} />
      <Route path="/about" Component={AboutPage} />
      <Route path="/search/:query" Component={SearchPage} />
    </Router>
  )
}

export default App
