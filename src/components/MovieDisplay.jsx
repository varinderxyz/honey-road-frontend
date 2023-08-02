import {Link} from 'react-router-dom'
import MovieCards from './MovieCards'

const MovieDisplay = (props) => {
    let { movie, pageid } = props
    if (isNaN(pageid) == true){
        pageid = 1
    }

    const listMovies = movie.map((MovieCard) =>
    <MovieCards key={MovieCard.id} MovieCard={MovieCard}/>
    );
    

    return (    
        <div className="popular-movies md:mx-24">
            <div className="flex flex-wrap overflow-hidden sm:-mx-2 pl-2 md:-mx-2 lg:-mx-2 xl:-mx-2" style={{display: "flex", flexWrap: "wrap", overflow: "hidden"}}>
                {listMovies}
            </div>
        </div>            
     );
}
 
export default MovieDisplay;