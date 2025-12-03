import { useState, type FormEvent } from "react"
import { Button, Form } from "react-bootstrap"
import { NavLink } from "react-router"
import ApiClient from "../../../../utils/ApiClient"

interface SignINForm{
    email : string, // harus sama dengan name di form
    password : string
}


function SignIn() {
    const [form, setForm]= useState<SignINForm>({
        email : "",
        password : ""
    })

    const handleInputChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target
        setForm({
            ...form,
            [name] : value
        })
    }

    const handleSubmit = async(event : FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try{
            const response = await ApiClient.post("/signin", form)
            console.log(response);
        }catch(error){
            console.log(error);
        }
    }
    return <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
        <div ><h2>Sign In</h2>
            <div className="d-flex justify-content-between mb-3">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formemail" className="mb-3">
                            <Form.Label>Enter Email</Form.Label>
                            <Form.Control value={form.email} onChange={handleInputChange} name="email" type="text" placeholder="Email"/>
                        </Form.Group>
                        <Form.Group controlId="formPassword" className="mb-3">
                            <Form.Label>Enter Password</Form.Label>
                            <Form.Control value={form.password} onChange={handleInputChange}name="password" type="password" placeholder="Password"/>
                        </Form.Group>
                        <Button type="submit" variant="primary">
                            Sign In
                        </Button>
                        <Form.Group><NavLink to={"/"}>sign up</NavLink></Form.Group>
                    </Form>
                </div>
        </div>
        </div>
}

export default SignIn