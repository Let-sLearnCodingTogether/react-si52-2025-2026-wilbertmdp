import { useState, type ChangeEvent, type FormEvent } from "react"
import { Button, Form } from "react-bootstrap"
import { NavLink } from "react-router"
import ApiClient from "../../utils/ApiClient"

interface FormMovie{
    judul : string,
    tahunRilis : string,
    sutradara : string
}

function AddMovie(){
    const [form, setForm] = useState<FormMovie>({
        judul : "",
        tahunRilis : "",
        sutradara : ""
    }) 

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
            const response = await ApiClient.post("/movie", form)
            console.log(response);
        }catch(error){
            console.log(error);
        }
    }

    return <div className="container mx-auto">
        <div className="d-flex justify-content-between mb-3">
            <h2>Add Movie Page</h2>
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

export default AddMovie