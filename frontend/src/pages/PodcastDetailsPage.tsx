import { useParams } from "react-router-dom"

export const PodcastDetailsPage = () => {
  const {id} = useParams<{id: string}> ()

  return (
      <div>{id}PodcastDetailsPage</div>
  )
}