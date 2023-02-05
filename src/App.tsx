import { useEffect, useState } from "react"
import axios from 'axios'

type Repos = {
  name: string,
  id: string
}

function App() {

      const [respositories, setRepositories] = useState<Repos[]>([])
      const [search, setSearch] = useState('')

      // console.log('RENDERIZOU')

      useEffect(()=>{
        axios.get('https://api.github.com/users/MatheusMottaGit/repos')
          .then(response=>{
            setRepositories(response.data)})
      }, [])

      const filteredRepos = search.length != 0 
                ? respositories.filter(repo=>repo.name.includes(search))
                : []
  return (
    <>
      <input 
      type="text" 
      placeholder="digite um repositório..."
      onChange={(e)=>setSearch(e.target.value)}
      value={search}
      />
      <br /><br />
      <div>
        {
          filteredRepos.length != 0 ? filteredRepos.map(repo=>{
            return(
              <li key={repo.id}>{repo.name}</li>
            )
          }) : respositories.map(repo=>{
            return(
              <li key={repo.id}>{repo.name}</li>
            )
          })
        } 
      </div>
    </>
  )
}

export default App
