import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Signup = (props) => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials;
        const response = await fetch('http://localhost:5000/api/auth/createuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
            // save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            navigate("/");
            props.showAlert("Your account has been created", "success");
        }
        else {
            props.showAlert("Invalid Credentials", "danger")
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    let myStyle = {
        color: props.mode === 'dark' ? 'white' : '#48599a',
        backgroundColor: props.mode === 'dark' ? '#48599a' : 'dark'
    }
    return (
        <div style={myStyle}>
            <form onSubmit={handleSubmit}>
                <h3 className='mb-3'>Sign Up</h3>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" aria-describedby="emailHelp" onChange={onChange} name='name' />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' id="email" aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' id="password" onChange={onChange} required minLength={5} />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" name='cpassword' id="cpassword" onChange={onChange} required minLength={5} />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
