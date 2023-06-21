import './App.css'
import  {useMovies} from  "./Hooks/UseMovies"
import { Movies } from './Componets/Movies'
import  {useState, useEffect, useRef, useCallback } from 'react'
import debounce from 'just-debounce-it'

function useSearch() {
  const [Search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = Search === ''
      return
    }

    if (Search === '') {
      setError('No se puede buscar una película vacía')
      return
    }

    if (Search.match(/^\d+$/)) {
      setError('No se puede buscar una película con un número')
      return
    }

    if (Search.length < 3) {
      setError('La búsqueda debe tener al menos 3 caracteres')
      return
    }

    setError(null)
  }, [Search])

  return { Search, updateSearch, error }
}



function App() {
  const [sort, setSort] = useState(false)


  const { Search, updateSearch, error} = useSearch()
  const { movies, getMovies}= useMovies({Search ,sort})

  const debouncedGetMovies = useCallback(
    debounce(search => {
      console.log('search', search)
      getMovies({ search })
    }, 300)
    , [getMovies]
  )

  const handleSubmit = (event) => {
  event.preventDefault()
  getMovies(Search)
}


  const handleSort = () => {
    setSort(!sort)
  }

  const handleChange = (event) => {
  const newSearch = event.target.value
  updateSearch(newSearch)
  debouncedGetMovies(newSearch)
}

  return (  
  <div  className='page'>

    <header>
      <h1>Movie Maker</h1>
      <form className='form'  onSubmit={handleSubmit}>

     <input style={{
              border: '1px solid transparent',
              borderColor: error ? 'red' : 'transparent'
            }}  onChange={handleChange} value={Search} name='query' placeholder='Marvel, StarWars, DCcomics, Harry Potter...'/>
            <input type='checkbox' onChange={handleSort} checked={sort} />
        <button  type="submit">Search</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>
    
      </main>
   </div> 
  )
}



export default App
