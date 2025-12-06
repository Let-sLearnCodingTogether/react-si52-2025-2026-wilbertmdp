import { useState, type FormEvent } from "react"
import { Button, Form } from "react-bootstrap"
import { NavLink, useNavigate } from "react-router"
import ApiClient from "../../../../utils/ApiClient"

interface SignINForm{
    email : string, // harus sama dengan name di form
    password : string
}


function SignIn() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false)
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
        setIsLoading(true)
        try{
            const response = await ApiClient.post("/signin", form)
            console.log(response);

            if(response.status === 200){
                // redirect to movie page
                localStorage.setItem("AuthToken", response.data.data.token);
                navigate("/list-movies"), {replace : true}
            }
        }catch(error){
            console.log(error);
        }finally{
            setIsLoading(false)
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
                        <Button type="submit" variant="primary" disabled={isLoading}>
                            {isLoading ? "Loading..." : "Sign In"}
                        </Button>
                        <Form.Group><NavLink to={"/"}>sign up</NavLink></Form.Group>
                    </Form>
                </div>
        </div>
        </div>
}

export default SignIn