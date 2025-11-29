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
    const [movies, setMovies] = useState<Movie[]>([])
    const [loading, setLoading] = useState<boolean>(true) // consitional rendering

    const fetchMovies = useCallback(async() => {
        setLoading(true) // redering loading
        const response = await ApiClient.get("/movies")
        console.log(response.data.data);
        
        if(response.status == 200){
            setMovies(response.data.data)
            setLoading(false) // selesai loading
        }

    }, [])

    useEffect(() => {
        fetchMovies()
    }, [fetchMovies])

    const handledelete = async(movieId : String) => {
        const response = await ApiClient.delete(`/movies/${movieId}`)

        if(response.status == 201){
            fetchMovies()
        }
    }


    return <div className="container mx-auto">
        <div className="d-flex justify-content-between mb-3">
            <h2>Movie Page</h2>
            <NavLink to="/list-movies/add-movie" className= "btn btn-primary">add-movie</NavLink>
            
        </div>
        <div>
            <table className="table table-dark">
                <thead className="bg-dark">
                    <th>No</th>
                    <th>judul</th>
                    <th>Tahun Rilis</th>
                    <th>Sutradara</th>
                    <th>aksi</th>
                </thead>
                <tbody>
                    {
                        loading && <tr>
                            <td colSpan={5} className="text-center">Loading...</td>
                        </tr>
                    }
                    {
                        movies.length > 0 && movies.map((movie, index) => {
                            return <tr key={movie._id}>
                                <td>{index + 1}</td>
                                <td>{movie.judul}</td>
                                <td>{movie.tahunRilis}</td>
                                <td>{movie.sutradara}</td>
                                <td><button className="btn btn-danger" onClick={() => handledelete(movie._id)}>delete</button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    </div>
}

export default Movies