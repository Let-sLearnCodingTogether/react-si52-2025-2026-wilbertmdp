import { useState, type FormEvent } from "react";
import { Button, Form} from "react-bootstrap";
import ApiClient from "../../../../utils/ApiClient";
import { NavLink } from "react-router";



interface SignUPForm{
    username : string, // harus sama dengan name di form
    email : string,
    password : string
}

function SignUp(){
    const [form, setForm]= useState<SignUPForm>({
        username : "",
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
            const response = await ApiClient.post("/signup", form)
            console.log(response);
        }catch(error){
            console.log(error);
        }
    }

    return<div className="container d-flex flex-column align-items-center justify-content-center vh-100">
            <h2>Sign Up</h2>
            <div className="d-flex justify-content-between mb-3">
            <div>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formusername" className="mb-3">
                        <Form.Label>Enter Username</Form.Label>
                        <Form.Control value={form.username} onChange={handleInputChange} name="username" type="text" placeholder="Username"/>
                    </Form.Group>

                    <Form.Group controlId="formEmail" className="mb-3">
                        <Form.Label>Enter Email Address</Form.Label>
                        <Form.Control value={form.email} onChange={handleInputChange} name="email" type="text" placeholder="Email"/>
                    </Form.Group>

                    <Form.Group controlId="formPassword" className="mb-3">
                        <Form.Label>Enter Password</Form.Label>
                        <Form.Control value={form.password} onChange={handleInputChange} name="password" type="password" placeholder="Password"/>
                    </Form.Group>
                    <Button type="submit" variant="primary">
                        Sign Up
                    </Button>
                    <Form.Group>
                        <NavLink to={"/signin"}>sign in</NavLink>
                    </Form.Group>
                </Form>
            </div>
        </div>
    </div>

}
export default SignUp;