import {
  HashRouter as Router,
  Routes, Route, Navigate
} from "react-router-dom"
import App from "./App/App"
import { HomePage } from "./pages/HomePage"
 
export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element ={<HomePage/>} />
      </Route>
    </Routes>

  </Router>

)