import {
  HashRouter as Router,
  Routes,
  Route
} from "react-router-dom"

import {
  App,
  HomePage,
  Discover,
  GenresPage,
  Charts,
  PodcastPage,
  Favourites,
  PlaylistsPage,
  PlaylistDetailsPage
} from "./pages"

import { LoginForm,RegisterForm } from "./components/Forms/"
 

interface RouteConfig {
  path: string
  element: React.ReactNode
  isIndex?: boolean
}

const routes: RouteConfig[] = [
  {
    path: "",
    element: <HomePage />,
    isIndex: true
  },
  {
    path: "register",
    element: <RegisterForm />
  },
  {
    path: "login",
    element: <LoginForm />
  },
  {
    path: "discover",
    element: <Discover />
  },
  {
    path: "genre",
    element: <GenresPage />
  },
  {
    path: "charts",
    element: <Charts />
  },
  {
    path: "podcast",
    element: <PodcastPage />
  },
  {
    path: "favourites",
    element: <Favourites />
  },
  {
    path: "playlists",
    element: <PlaylistsPage />
  },
  {
    path: "playlists/:id",
    element: <PlaylistDetailsPage />
  }
]

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          {routes.map((route) => {
            if (route.isIndex) {
              return (
                <Route
                  key={route.path}
                  index
                  element={route.element}
                />
              )
            }

            return (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            )
          })}
        </Route>
      </Routes>
    </Router>
  )
}