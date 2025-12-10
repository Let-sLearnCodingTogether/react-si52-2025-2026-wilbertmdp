import { use, useCallback, useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { Button, Form } from "react-bootstrap"
import { NavLink, useNavigate, useParams } from "react-router"
import ApiClient from "../../utils/ApiClient"

interface FormMovie{
    judul : string,
    tahunRilis : string,
    sutradara : string
}

interface ResponseData{
    data : {
        _id : string,
        judul : string,
        tahunRilis : string,
        sutradara : string,
        createdBy : string,
        createdAT : string,
        updateAt : string,
        __v : string
    },
    message : string
}

function EditMovie(){
    const params = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState<FormMovie>({
        judul : "",
        tahunRilis : "",
        sutradara : ""
    }) 

    const fetchMovie = useCallback(async() => {
        const response = await ApiClient.get<ResponseData>(`/movies/${params.id}`)

        if(response.status === 200){
            const responseData: ResponseData = response.data;
            setForm({
                judul : responseData.data.judul,
                tahunRilis : responseData.data.tahunRilis,
                sutradara : responseData.data.sutradara
            })
        }
    }, [params])

    const handleInputChange = (event : ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target
        setForm({
            ...form,
            [name] : value
        })
    }

    const handleSubmit = async (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try{
            const response = await ApiClient.put(`/movies/${params.id}`, form)
            console.log(response);
            navigate("/list-movies", {replace : true})
        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        fetchMovie()
    }, [fetchMovie])

    return <div className="container mx-auto">
        <div className="d-flex justify-content-between mb-3">
            <h2>Edit Movie Page</h2>
            <NavLink to="/list-movies" className= "btn btn-primary">movie</NavLink>
        </div>
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formJUdul" className="mb-3">
                    <Form.Label>Judul</Form.Label>
                    <Form.Control value={form.judul} onChange={handleInputChange} name="judul" type="text" placeholder="Judul Film"/>
                </Form.Group>

                <Form.Group controlId="formtahunRilis" className="mb-3">
                    <Form.Label>tahunRilis</Form.Label>
                    <Form.Control value={form.tahunRilis} onChange={handleInputChange} name="tahunRilis" type="text" placeholder="tahunRilis"/>
                </Form.Group>

                <Form.Group controlId="formsutradara" className="mb-3">
                    <Form.Label>sutradara</Form.Label>
                    <Form.Control value={form.sutradara} onChange={handleInputChange} name="sutradara" type="text" placeholder="sutradara"/>
                </Form.Group>

                <Button type="submit" variant="primary">
                    Simpan
                </Button>
            </Form>
        </div>
    </div>
}

export default EditMovie