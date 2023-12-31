export function ListOfMovies({movies}){
return(
    <ul className="Movies">
      {
       movies.map(movie=>(
        <li className="movie" key={movie.id}>
          <h3>{movie.title}</h3>
          <p><strong>Year:</strong> {movie.year}</p>
          <img src={movie.poster}  alt={movie.Title}/>

        </li>
       ))
      }
    </ul>
  )
}

export function withoutMoviesResults(params) {
    return (
        <p>Movie not found!</p>
     )
}

export function Movies({movies}) {
    const hasMovies = movies ?.length > 0

    return (
        hasMovies
        ? <ListOfMovies movies={movies}/>
        :  <withoutMoviesResults/>

    )
    
}
        
