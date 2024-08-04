import { useRoute } from "../useRoute"

export default function SearchPage() {
  const { params } = useRoute()

  return (
    <main>
      <h1>Search {params.query}</h1>
    </main>
  )
}