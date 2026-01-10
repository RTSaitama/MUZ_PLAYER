import {
  HashRouter as Router,
  Routes, Route
} from "react-router-dom"
import App from "./pages/App"
import { HomePage } from "./pages/HomePage"
 import { Discover } from "./pages/Discover"
import { Genre } from "./pages/Genre"
import { Charts } from "./pages/Charts"
import { Podcast } from "./pages/Podcast"
import { Favourites } from "./pages/Favourites"
import { PlaylistsPage } from "./pages/PlaylistsPage"
import { PlaylistDetailsPage } from "./pages/PlaylistDetailsPage"
import { LoginForm } from "./components/Forms/LoginForm/LoginForm"
import { RegisterForm } from "./components/Forms/RegisterForm/RegisterForm"
export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element ={<HomePage/>} />
        <Route path="register" element={<RegisterForm />}></Route>
        <Route path="login" element={<LoginForm />}></Route>
        <Route path="discover" element={<Discover />}></Route>
        <Route path="genre" element={<Genre/>}></Route>
        <Route path="charts" element={<Charts />}></Route>
        <Route path="podcast" element={<Podcast/>}></Route>
        <Route path="favourites" element={<Favourites/>}></Route>
        <Route path="playlists" element={<PlaylistsPage/>}></Route>
        <Route path="playlists/:id" element={<PlaylistDetailsPage/>}></Route>
      </Route>
    </Routes>

  </Router>

)