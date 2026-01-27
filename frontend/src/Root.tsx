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
  PodcastsPage,
  PodcastDetailsPage,
  Favourites,
  PlaylistsPage,
  PlaylistDetailsPage
} from "./pages"

import { RegistrationPage } from "./pages/RegistrationPage"
import { AuthPage } from "./pages/AuthPage"
 

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
    element: <RegistrationPage />
  },
  {
    path: "login",
    element: <AuthPage />
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
    element: <PodcastsPage />
  },
  {
    path:'podcast/:id',
    element:<PodcastDetailsPage/>
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