import { useCallback, useEffect, useState } from "react"
import { NavLink } from "react-router"
import ApiClient from "../../utils/ApiClient"

interface Movie {
    _id : string,
    judul : string,
    tahunRilis : string,
    sutradara : string,
    createdAT : string,
    updateAt : string
}

function Movies(){
    const [Movies, setMovies] = useState<Movie[]>([])

    const fetchMovies = useCallback(async() => {
        const response = await ApiClient.get("/movie")

        if(response.status == 200){
            setMovies(response.data.data)
        }

    }, [])

    useEffect(() => {
        fetchMovies()
    }, [fetchMovies])

    return <div className="container mx-auto">
        <div className="d-flex justify-content-between mb-3">
            <h2>Movie Page</h2>
            <NavLink to="/add-movie" className= "btn btn-primary">add-movie</NavLink>
        </div>
    </div>
}

export default Movies