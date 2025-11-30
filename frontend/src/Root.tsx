import {
  HashRouter as Router,
  Routes, Route
} from "react-router-dom"
import App from "./App/App"
import { HomePage } from "./pages/HomePage"
 import { Discover } from "./pages/Discover"
import { Genre } from "./pages/Genre"
import { Charts } from "./pages/Charts"
import { Podcast } from "./pages/Podcast"
import { Favourites } from "./pages/Favourites"
import { Playlists } from "./pages/Playlists"

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element ={<HomePage/>} />
        <Route path="discover" element={<Discover />}></Route>
        <Route path="genre" element={<Genre/>}></Route>
        <Route path="charts" element={<Charts />}></Route>
        <Route path="podcast" element={<Podcast/>}></Route>
        <Route path="favourites" element={<Favourites/>}></Route>
        <Route path="playlists" element={<Playlists/>}></Route>
      </Route>
    </Routes>

  </Router>

)