import { useState } from "react";
import Home from "../homeComponent/home";
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('token'); // Bech tjib el token men localStorage

    const handleEmailChange = (event) => {
        const value = event.target.value;
        setEmail(value);

    };

    if(token){
        
    }

    const HandleLogin = async() => {
        const res = await fetch('http://localhost:3001/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password}),
        });

        const data = await res.json();
        if(data.success == true){
            localStorage.setItem('token' ,data.token ); // Bech t7ot el token fl localStorage
            localStorage.setItem('userid' ,data.userid ); // Bech t7ot el id fl localStorage
            navigate('/');
        }
    }

    const handlePasswordChange = (event) => {
        const value = event.target.value;
        setPassword(value);

    };
    const handleSubmit = (evt) => {
        evt.preventDefault()
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" name="email" onChange={handleEmailChange} />
                <input type="password" placeholder="Password" name="password" onChange={handlePasswordChange} />
                <button onClick={HandleLogin}>Login</button>
            </form>
        </div>
    )
}